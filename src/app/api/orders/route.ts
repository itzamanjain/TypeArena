import { connectDb } from '@/dbconfig/dbconfig';
import { getDataFromToken } from '@/lib/getDataFromToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request:NextRequest,response:NextResponse ){
    try {
        const reqUserId = getDataFromToken(request);
        if (!reqUserId) {
            return NextResponse.json(
                { message: "User not logged in" },
                { status: 401 }
            );
        }

        const {productId , varient} = await request.json();
        if (!productId || !varient) {
            return NextResponse.json(
                { message: "productId and varient is required" },
                { status: 400 }
            );
        }

        await connectDb();

        //create razorpay order
        const order = await razorpay.orders.create({
            amount: 900,
            currency: 'INR',
            receipt: `receipt-${Date.now()}`,
            notes: {
                productId: productId.toString(),
                varient,
            },
            
        })

        const newOrder = await Order.create({
            userId: reqUserId,
            items: [{
                productId,
                quantity: 1,
            }],
            orderDate: new Date(),
            status: 'pending',
            amount: 9,
            paymentMethod: 'razorpay',
            paymentStatus: 'pending',
            paymentDate: new Date(),
            razorpayOrderId: order.id,
        })

        return  NextResponse.json({message:"order created",order:newOrder,razorpayOrder:order},{status:200})
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({message:"failed to load user"},{status:500})
        
    }
}