"use client"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button";

const LandingHero = () => {
    const {isSignedIn} = useAuth();
  return (

    <div className="text-white font-bold py-20 text-center space-y-5">
        <div className="text-4xl sm:text-5-xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>
                The Best AI Tool for
            </h1>
            <div className="text-3xl sm:text-4-xl md:text-5xl lg:text-6xl space-y-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-5">
                <TypewriterComponent
                    options = {{
                        strings : [
                            "Chatbot",
                            "Photo Generation",
                            "Music Generation",
                            "Code Generation",
                            "Video Generation"
                        ],
                        autoStart: true,
                        loop : true,
                        delay : 15,
                        deleteSpeed : 15

                    }}
                />
            </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
                AI Content at your fingertips
        </div>
        <div>
            <Link 
                href = {isSignedIn ? "/dashboard": "/sign-up"}>
                    <Button variant = "premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating for free
                    </Button>
            </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
            No credit card required
        </div>
    </div>
  )
}

export default LandingHero