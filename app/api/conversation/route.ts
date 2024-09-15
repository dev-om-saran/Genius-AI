import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsription";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    let { prompt } = body;

    console.log({ body });
    console.log({ prompt });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_API_KEY) {
      return new NextResponse("Gemini API key not found", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!isPro && !freeTrial){
      return new NextResponse("free trial has expired", {status : 403});
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig :{
            maxOutputTokens: 150
        }
     });
    const response = await model.generateContent(prompt);
    const text = await response.response.text();

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json({ message: text });

  } catch (error) {
    console.error("[Conversational Error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}