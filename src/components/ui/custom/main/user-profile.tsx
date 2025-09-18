"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { cn } from "@/lib/utils";

// icons
import { UserRound } from "lucide-react";

export default function UserProfile({
    avatar_url,
    className,
}: {
    avatar_url?: string | Blob | undefined,
    className?: string,
}) {

    return (
        <Avatar className={cn(
            "size-18 rounded-full",
            className,
        )} >
            <AvatarImage className="size-full" src={avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground p-2">
                <UserRound className="size-full" />
            </AvatarFallback>
        </Avatar >
    );
}
