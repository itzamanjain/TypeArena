import exp from "constants";
import mongoose, { Model } from "mongoose";


// subscription model for 

export interface IOrder extends mongoose.Document {
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    orderDate: Date;
    status: "pending" | "completed" | "failed";
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: String,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    orderDate: {
        type: Date,
        default: Date.now,
    },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
    },

});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;