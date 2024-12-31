import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { rateLimit } from "@/lib/ratelimit";




export async function POST(request:NextRequest){
    try {
        console.log("connection making-----------------------");
        
        await connectDb();
        // 5 signup requests per day 
        // if(!rateLimit(request)){
        //     return NextResponse.json(
        //         { message: "Rate limit exceeded" },
        //         { status: 429 }
        //     );
        // }

        const reqBody = await request.json();
        console.log("requsest received",reqBody);
        
        const { fullname,email,password,username } = reqBody;
        console.log(reqBody);
        

        if (!fullname || !email || !password || !username) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            return NextResponse.json(
                { message: "Please enter a valid email address" },
                { status: 400 }
            );
        }
        console.log("come till here");
        
        const existingUser = await User.findOne({ email});
        if(existingUser){
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }
        console.log("hashing pass")
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log("cret user");
        
        const newUser = new User({ username, password: hashedPassword,email, fullname });

        const savedUser =  newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        }, { status: 201 });


    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 }
        );
    }
}