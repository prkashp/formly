"use server";
import { getXataClient } from "@/xata";
import { NextRequest, NextResponse } from 'next/server'

const xata = getXataClient();
// type ResponseData = {
//   message:string,
//   status:symbol
// }

export async function POST(request: Request) {
  // People on the internet can be mean, so let's make sure we don't allow
  // anyone to create images in the live demo
  // if (process.env.READ_ONLY === 'true') {
  //   return NextResponse.json({ message: 'Read only mode enabled' }, { status: 403 });
  // }
  if (request.method === "POST") {
    const formData = await request.json();
    // Get the form data
    const email = formData.email;
    const name = formData.name;
    const message = formData.message;

    if (!email || !name || !message) {
      return NextResponse.json({message: "Empty Request!"}, {status:204})
    }
    try {  
    // Create an empty image record with no base64 content
    const record = await xata.db.Forms.create({email:email, name:name, description:message});  
    return NextResponse.json({message: "Ok!"}, {status:200});
    }
    catch (error) {
    console.error('Error saving form data:', error);
    return NextResponse.json({message: "Server Error!"}, {status:500});
    }
  }
  else {
    return NextResponse.json({message: "Bad request!"}, {status:405});
  }
  

  
}