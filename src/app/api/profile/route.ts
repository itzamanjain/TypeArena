import { connectDb } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/ratelimit";

connectDb();
// send the user data except password


export async function GET(request:NextRequest){
    // Apply rate limiting
    if (!rateLimit(request)) {
        return NextResponse.json(
            { message: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }
    try {
        const reqUserId = getDataFromToken(request);
        if (!reqUserId) {
            return NextResponse.json(
                { message: "User not logged in" },
                { status: 401 }
            );
        }

        const user = await User.findById(reqUserId).select("-password");
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({message:"user found",user},{status:200})

    } catch (error:any) {
        return NextResponse.json({message:"failed to load user"},{status:500})
    }
}



// user profile by its username 
