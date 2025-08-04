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
        <Button className="size-18" variant="ghost" size="icon" onClick={toggleSidebar}>
            <Link className="size-18" href={profileLink.url}>
                <Avatar className="size-18">
                    {authUserId &&
                        <AvatarImage className="size-18"/>
                    }
                    <AvatarFallback className="size-18">
                        <UserRound className="size-12"/>
                    </AvatarFallback>
                </Avatar>
            </Link>
        </Button>
    );
}
