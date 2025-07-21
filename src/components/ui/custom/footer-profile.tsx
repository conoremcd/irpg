"use client";

// UI components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import Link from "next/link";

// Icons
import { UserRound } from "lucide-react";

export default function FooterProfile({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {
    const profileLink = {
        url: "/profile",
    }
    return (
        <Avatar>
            {authUserId &&
                <AvatarImage>
                    <Link href={profileLink.url} />
                </AvatarImage>
            }
            <AvatarFallback>
                <Link href={profileLink.url}>
                    <UserRound />
                </Link>
            </AvatarFallback>
        </Avatar>
    );
}
