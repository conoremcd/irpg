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

export default function HeaderLogo({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button className="" variant="ghost" size="icon" onClick={toggleSidebar}>
            <Avatar>
                {authUserId &&
                    <AvatarImage></AvatarImage>
                }
                <AvatarFallback>
                    <Hexagon></Hexagon>
                </AvatarFallback>
            </Avatar>
        </Button>
    );
}
