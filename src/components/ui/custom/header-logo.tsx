"use client";

// UI components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { Hexagon } from "lucide-react";
import { SidebarTrigger } from "../shadcn/sidebar";

export default function HeaderLogo({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {

    return (
        <div className="m-2">
            <Button className="fixed pointer-events-none" variant="ghost" size="icon">
                <Avatar className="z-0">
                    {authUserId &&
                        <AvatarImage></AvatarImage>
                    }
                    <AvatarFallback>
                        <Hexagon></Hexagon>
                    </AvatarFallback>
                </Avatar>
            </Button>
            <SidebarTrigger className="z-10 opacity-0"></SidebarTrigger>
        </div>

    );
}
