"use client";

// UI components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { useSidebar } from "@/components/ui/shadcn/sidebar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";

// Icons
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
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Link href={profileLink.url}>
                <Avatar>
                    {authUserId &&
                        <AvatarImage />
                    }
                    <AvatarFallback>
                        <UserRound />
                    </AvatarFallback>
                </Avatar>
            </Link>
        </Button>
    );
}
