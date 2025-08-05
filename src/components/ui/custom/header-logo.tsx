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
        <Button variant="ghost" size="icon" onClick={toggleSidebar} asChild>
            <Avatar className="size-18 absolute top-2 left-2 md:top-8 md:left-4 hover:shadow-2xl hover:border-4 hover:border-background rounded-full">
                {authUserId &&
                    <AvatarImage className="size-full"></AvatarImage>
                }
                <AvatarFallback className="bg-primary text-primary-foreground p-2">
                    <Hexagon className="size-full"></Hexagon>
                </AvatarFallback>
            </Avatar>
        </Button>

    );
}
