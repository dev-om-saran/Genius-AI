import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button"
import { UserButton} from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsription";

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return (
        <div className = "flex items-center p-4">
            <MobileSidebar isPro = {isPro} apiLimitCount = {apiLimitCount}/>
            <div className="flex w-full justify-end">
            <UserButton 
                    afterSignOutUrl="/"  
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10", // Adjust the avatar size
                            userButtonTrigger: "px-2 py-2",   // Adjust padding (button size)
                        }
                    }} 
                />

            </div>
        </div>
    );
}

export default Navbar;