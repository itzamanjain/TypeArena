import { NextRequest,NextResponse } from "next/server";
import { rateLimit } from "@/lib/ratelimit";

export async  function GET(request:NextRequest,response:NextResponse){
    // Apply rate limiting
    if (!rateLimit(request)) {
        return NextResponse.json(
            { message: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    try {
      const response =  NextResponse.json({message:'Logout successful',success:true}) 

      response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0)
    })

    return response

    } catch (error:any) {
        return NextResponse.json(error.message, {status: 500})
    }
}