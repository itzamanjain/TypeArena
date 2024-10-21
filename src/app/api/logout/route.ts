import { NextRequest,NextResponse } from "next/server";


export async  function GET(request:NextRequest,response:NextResponse){

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