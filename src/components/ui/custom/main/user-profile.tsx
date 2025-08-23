"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { useSidebar } from "@/components/ui/shadcn/sidebar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";

// icons
import { UserRound } from "lucide-react";

export default function UserProfile({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {
    const profileLink = {
        url: "/profile",
    }
    const { toggleSidebar } = useSidebar();

    return (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} asChild>
            <Link className="size-18 z-40" href={profileLink.url}>
                <Avatar className="size-18 hover:border-4 hover:border-background rounded-full">
                    {authUserId &&
                        <AvatarImage className="size-18"/>
                    }
                    <AvatarFallback className="bg-primary text-primary-foreground p-2">
                        <UserRound className="size-full"/>
                    </AvatarFallback>
                </Avatar>
            </Link>
        </Button>
    );
}
