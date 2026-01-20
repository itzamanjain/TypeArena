import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDb } from "@/dbconfig/dbconfig";
import Order from "@/models/order.model";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(request:NextRequest){
    // Apply rate limiting (webhooks have high limits)
    if (!rateLimit(request)) {
        return NextResponse.json(
            { message: "Too many requests" },
            { status: 429 }
        );
    }
    try {
        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            return new Response("Invalid signature", { status: 400 });
        }

        const event = JSON.parse(body);

        await connectDb();

        // need to verify razorpayid is not in model 💹
        if(event.event === "payment.captured"){
            // update the order payment status
            const payment = event.payload.payment.entity;

            const order = await Order.findOneAndUpdate({ razorpayOrderId: payment.order_id }, {
                paymentStatus: "paid",
                paymentDate: new Date(),
            });
            
            if(order){
                // send email to user  
            }
        }

        return NextResponse.json({ message: "success" }, { status: 200 });

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ message: "failed to update order" }, { status: 500 });
    }
}