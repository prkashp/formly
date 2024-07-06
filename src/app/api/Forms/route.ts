"use server";
import { getXataClient } from "@/xata";
import { NextResponse } from 'next/server'

// const xata = getXataClient();
import { XataClient } from '@/xata'
const xata = new XataClient({ apiKey: process.env.XATA_API_KEY })

export async function POST(request: Request) {
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