import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDb } from "@/dbconfig/dbconfig";
import Order from "@/models/order.model";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(request:NextRequest) {
    // Apply rate limiting
    if (!rateLimit(request)) {
        return NextResponse.json(
            { success: false, message: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Generate the expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Compare the received signature with the generated signature
    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // If signature is valid, update payment status in the database
    await connectDb();

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
        paymentDate: new Date(),
      }
    );

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 });
  }
}
