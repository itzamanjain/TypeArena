'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
// Remove the incorrect import


export default function SubscriptionPage() {
    const [productId,setProductId ] = useState("subscription")
    const [varient,setVarient ] = useState("lifetime")
    // give checkout with razor pay call 

    const handleCheckOut = async () => {
        const res = await axios.post("/api/orders",{
            productId,
            varient
        })

        const { razorpayOrder, order } = res.data;

      // Step 2: Razorpay payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Replace with your Razorpay key ID
        amount: razorpayOrder.amount, // Amount in paisa (50000 = ₹500)
        currency: razorpayOrder.currency,
        name: "TypeArena",
        description: "Lifetime Subscription",
        order_id: razorpayOrder.id, // Razorpay Order ID
        handler: async (response: any) => {
            try {
                const verificationRes = await axios.post("/api/verify-payment", {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
          
                if (verificationRes.data.success) {
                  alert("Payment Successful! Subscription Activated.");
                  // Update UI or redirect user
                  window.location.reload();
                } else {
                  alert("Payment Verification Failed. Please contact support.");
                }
              } catch (error) {
                console.error("Verification Error:", error);
                alert("An error occurred during payment verification. Please contact support.");
              }
        },
        // can be retrive from the user data
        prefill: {
          name: "Aman Jain",
          email: "jainaman0744@gmail.com",
          contact: "9826747763",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 3: Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    }


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Join TypeArena</h1>
        <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-yellow-500">Lifetime Access</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Unlock all features forever
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-5xl font-bold text-gray-800 dark:text-gray-100">INR 9</span>
              <span className="text-gray-600 dark:text-gray-300"> / one-time</span>
            </div>
            <ul className="mt-6 space-y-2">
              {[
                "Unlimited typing tests",
                "Advanced statistics",
                "Custom test creation",
                "Ad-free experience",
                "Priority support",
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCheckOut} className="w-full rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4  transition duration-300">
              Get Lifetime Access
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

