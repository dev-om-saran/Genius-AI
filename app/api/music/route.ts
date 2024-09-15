import Replicate from "replicate";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsription";

const replicate = new Replicate({
  auth: process.env.NEXT_REPLICATE_API_TOKEN
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const input = {
      prompt : body.prompt,
      duration : parseInt(body.duration, 10)
    }

    console.log(input)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.NEXT_REPLICATE_API_TOKEN) {
      return NextResponse.json({ message: "Replicate API key not found" }, { status: 500 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!isPro && !freeTrial){
      return new NextResponse("free trial has expired", {status : 403});
    }

    const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input });
    console.log(output);

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json(output);
  } catch (error) {
    //console.log(replicate)
    console.error("[Conversational Error]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
