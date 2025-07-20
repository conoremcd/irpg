"use client";

// UI components 
import {
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { UserRound } from "lucide-react";

export default function FooterProfile({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {

    return (
        <Button variant="ghost" size="icon">
            <Avatar>
                {authUserId &&
                    <AvatarImage></AvatarImage>
                }
                <AvatarFallback>
                    <UserRound />
                </AvatarFallback>
            </Avatar>
        </Button>
    );
}
