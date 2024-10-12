import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDb();

export async function POST(request:NextRequest){
    try {
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

        const existingUser = await User.findOne({ email});
        if(existingUser){
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            username
        });

        const savedUser = await newUser.save();

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