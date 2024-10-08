"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
    apiLimitCount : number
    isPro : boolean
};

const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false
} : FreeCounterProps) => {

    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted){
        return null;
    }

    console.log(isPro)

    if(isPro){
        console.log("Null return kr de ")
        return null;
    }

  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p>
                        {apiLimitCount} of {MAX_FREE_COUNTS} Free tokens used
                    </p>
                    <Progress
                        className="h-3"
                        value = {(apiLimitCount/ MAX_FREE_COUNTS) * 100}
                    />
                </div>
                <Button 
                    onClick={proModal.onOpen}
                    className="w-full" variant="premium">
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                </Button>
            </CardContent>
        </Card>

    </div>
    
  )
}

export default FreeCounter;