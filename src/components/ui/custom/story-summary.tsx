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
import { Ellipsis, Plus, PenBox, BookOpen, ChevronsDownUp } from "lucide-react";

// interfaces
import Story from "@/interfaces/story";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/shadcn/accordion";



export function StoryAvatar({ id, avatar, }: Story) {
    const storyPage = "@/library/story/" + id + "";

    return (
        <Link href={storyPage}>
            <Avatar className="h-16 w-16">
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

export default function StorySummary({ ...story }: Story) {

    return (
        <AccordionItem className="flex flex-col md:flex-row gap-2 justify-center" key={story.id} value={story.title}>
            <AccordionTrigger>
                <StoryAvatar id={story.id} avatar={story.avatar} title={story.title}></StoryAvatar>
                <div>{story.title}</div>
            </AccordionTrigger>
            <AccordionContent>
                {story.overview}
            </AccordionContent>
        </AccordionItem>
    );
}
