"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { Skeleton } from "../shadcn/skeleton";

// Icons
import { Ellipsis, Plus, PenBox, BookOpen, ChevronsDownUp } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { Label } from "@radix-ui/react-menubar";



export function StoryAvatar({ id, avatar }: { id: number, avatar?: MediaImage }) {
    const storyPage = "@/library/story/" + id + "";

    return (
        <Link href={storyPage} className="self-start">
            <Avatar className="h-16 w-16">
                {avatar &&
                    <AvatarImage>{avatar.src}</AvatarImage>
                }
                <AvatarFallback className="bg-primary">
                    <BookOpen className="text-primary-foreground"/>
                </AvatarFallback>
            </Avatar>
        </Link>
    );
}

export default function StorySummary(story: Story) {

    return (
        <AccordionItem className="flex flex-col p-4 justify-center items-center bg-muted rounded-4xl" key={story.id} value={story.title}>
            <div className="flex flex-row gap-8 pt-4 items-center w-xl">
                <StoryAvatar id={story.id} avatar={story.avatar}></StoryAvatar>
                <div className="grow-2 text-2xl">{story.title}</div>
                <div className="h-6 w-20 px-2 rounded-md bg-accent text-accent-foreground text-center">{story.userRole}</div>
            </div>
            <AccordionTrigger className="size-8" />
            <AccordionContent className="flex flex-col gap-4 w-xl">
                <div className="flex flex-row gap-2 items-center justify-end rounded-2xl">
                    {story.progress &&
                        <div className="grow-2 h-6 bg-background rounded-full">
                            <div className="h-full bg-accent rounded-full text-center text-accent-foreground" style={{ width: story.progress + "%" }}>Game Progress {story.progress}%</div>
                        </div>
                    }
                    <Button className="launch-game bg-primary"></Button>
                    {story.userRole && story.userRole === RoleTag.GM &&
                        <>
                            <Button className="edit-game bg-secondary"></Button>
                            <Button className="delete-game bg-destructive"></Button>
                        </>
                    }
                </div>
                {story.overview &&
                    <div className="col-span-4 p-4 flex flex-col items-start bg-muted rounded-lg">
                        <Label className="text-lg">Game Overview</Label>
                        {story.overview}
                        </div>
                }
                <div className="grid grid-cols-5 grid-rows-3 gap-4">
                    <div className="col-span-3 row-span-3 p-2 rounded-2xl">
                        <Skeleton className="size-80 p-8 bg-secondary text-center text-secondary-foreground">Game Schedule</Skeleton>
                    </div>
                    <div className="col-span-2 row-span-3 p-2 rounded-2xl">
                        <Skeleton className="size-full p-8 bg-secondary text-center text-secondary-foreground">Player Characters</Skeleton>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
