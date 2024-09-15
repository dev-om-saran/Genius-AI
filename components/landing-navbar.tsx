"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import {useAuth} from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Weight } from "lucide-react"
import { Button } from "./ui/button"

const font = Montserrat({
    weight : "600",
    subsets : ["latin"]
});

export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();
  return (
    <nav className="bg-transparent flex items-center justify-between w-full px-4 py-4">
        <Link href = "/" className="flex items-center">
            <div className="relative h-8 w-8 mr-4">
                <Image 
                    fill
                    alt = "Logo"
                    src = "/logo.png"
                />
            </div>
            <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                Genius
            </h1>
        </Link>

        <div className="flex items-center gap-x-2 justify-end">
            <Link href = {isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant = "outline" className="rounded-full">
                    Get Started
                </Button>
            </Link>
        </div>
    </nav>
  )
}

