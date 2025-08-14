"use client";

// library components 
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "../../shadcn/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui//shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui//shadcn/skeleton";
import { Label } from "@radix-ui/react-menubar";
import { Progress } from "@/components/ui/shadcn/progress";
import { Separator } from "@/components/ui//shadcn/separator";

// icons
import { Ellipsis, Plus, PenBox, BookOpen, ChevronsDownUp } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// schemas
import { StoryFormSchema, StoryFormSchemaType } from "@/schemas/library-schemas";
import EditStoryForm from "./edit-story-form";

export function StoryAvatar({ storyID, avatar, isEditing }: { storyID: string, avatar?: MediaImage, isEditing: boolean }) {
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(avatar?.src);
    const storyPage = "/library/" + storyID;

    return (
        <Button className="-ml-8 -mt-10 size-24 shadow-lg shadow-white hover:border-4 hover:border-background rounded-full" variant="ghost" size="icon" asChild>
            {isEditing ? (
                <Avatar asChild>
                    {avatarSrc ?
                        <AvatarImage className="">{avatarSrc}</AvatarImage>
                        :
                        <AvatarFallback className="bg-primary p-4 hover:border-none">
                            <BookOpen className="size-full text-primary-foreground" />
                        </AvatarFallback>
                    }
                </Avatar>
            ) : (
                <Avatar asChild>
                    <Link href={storyPage}>
                        {avatarSrc ?
                            <AvatarImage className="">{avatarSrc}</AvatarImage>
                            :
                            <AvatarFallback className="bg-primary p-4">
                                <BookOpen className="size-full text-primary-foreground" />
                            </AvatarFallback>
                        }
                    </Link>
                </Avatar>
            )}
        </Button>
    );
}

export default function StorySummary(
    {
        onUpdateStory,
        onDeleteStory,
        onToggleEditMode,
        story,
    }: {
        onUpdateStory: Function,
        onDeleteStory: Function,
        onToggleEditMode: Function,
        story: Story,
    }
) {
    const targetRef = useRef<HTMLDivElement>(null);

    const scrollToContent = () => {
        setTimeout(() => {
            if (story && targetRef.current!) {
                targetRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 200)
    };

    function onEdit() {
        onToggleEditMode(story);
    }

    function onDelete() {
        onDeleteStory(story);
        console.log(story);
    }

    return (
        <AccordionItem className="border-none snap-start snap-always" key={story.id} value={story.title}>
            <Card ref={targetRef} className="story-card">
                <CardContent className="flex flex-col gap-2 items-center">
                    {story.isEditing ? (
                        <>
                            <EditStoryForm
                                story={story}
                                onToggleEditMode={onToggleEditMode}
                                onUpdateStory={onUpdateStory}
                            ></EditStoryForm>
                        </>

                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-xl">
                                <StoryAvatar storyID={story.id} avatar={story.avatar} isEditing={story.isEditing}></StoryAvatar>
                                <div className="grow-4 flex flex-col gap-2">
                                    <div className="flex flex-rows gap-4">
                                        <div className="grow-2 text-2xl uppercase">{story.title}</div>
                                        <div className="h-6 w-16 md:w-20 px-2 rounded-md bg-accent self-end text-accent-foreground text-center">{story.userRole}</div>

                                    </div>
                                    <Separator className="p-0.25 bg-background" />
                                </div>

                            </div>
                            <AccordionTrigger className="size-8 transition hover:scale-200 " onClick={scrollToContent} />
                            <AccordionContent className="flex flex-col gap-4 w-full md:w-xl snap-center snap-always">
                                {story.userRole === RoleTag.GM &&
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Ellipsis className="self-end"></Ellipsis>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem variant='default' onClick={onEdit}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem variant="destructive" onClick={onDelete}>Delete</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                                {story.overview &&
                                    <div className="col-span-4 p-4 flex flex-col items-start bg-background text-foreground rounded-lg">
                                        <Label className="text-lg">Summary</Label>
                                        {story.overview}
                                    </div>
                                }
                                <div className="flex flex-row gap-4 items-center justify-end rounded-2xl">
                                    {/* if story has progress value, display progress bar */}
                                    {story.progress &&
                                        <>
                                            <Progress className="" value={story.progress} />
                                            <span>{story.progress + "%"}</span>
                                        </>
                                    }
                                </div>
                                {/* TODO: add scheduler and player list components */}
                                <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-3 gap-4">
                                    <Skeleton className="md:col-span-3 row-span-3 p-2 rounded-2xl min-h-80 p-8 bg-background text-center text-primary">Game Schedule</Skeleton>
                                    <Skeleton className="md:col-span-2 row-span-3 p-2 rounded-2xl p-8 bg-background text-center text-primary">Player Characters</Skeleton>
                                </div>
                            </AccordionContent>
                        </>
                    )
                    }
                </CardContent>
            </Card>
        </AccordionItem >
    );
}
