"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";

// Icons
import { BookOpen } from "lucide-react";

// interfaces
import Story from "@/interfaces/story";



export default function StoryAvatar({ id, avatar, }: Story) {
    const storyPage = "@/library/story/" + id +"";

    return (
        <Link href={storyPage}>
            <Avatar>
                {avatar &&
                    <AvatarImage>{avatar.src}</AvatarImage>
                }
                <AvatarFallback>
                    <BookOpen />
                </AvatarFallback>
            </Avatar>
        </Link>
    );
}
