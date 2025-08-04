"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { useSidebar } from "@/components/ui/shadcn/sidebar";

// icons
import { Hexagon } from "lucide-react";

// Logo button to open main menu navigation from root layout drawer
export default function HeaderLogo({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button className="size-18 absolute top-2 left-2 md:top-8 md:left-4" variant="ghost" size="icon" onClick={toggleSidebar} >
            <Avatar className="size-18">
                {authUserId &&
                    <AvatarImage className="size-18"></AvatarImage>
                }
                <AvatarFallback className="size-18 bg-primary text-primary-foreground">
                    <Hexagon className="size-12"></Hexagon>
                </AvatarFallback>
            </Avatar>
        </Button>

    );
}
