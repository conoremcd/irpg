"use client";

// library components 
import React, { useRef, useState, } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/shadcn/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import {
    Card,
    CardContent,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { Label } from "@/components/ui/shadcn/label";
import { Progress } from "@/components/ui/shadcn/progress";
import { Separator } from "@/components/ui/shadcn/separator";
import { 
    Tooltip, 
    TooltipContent, 
    TooltipTrigger 
} from "@/components/ui/shadcn/tooltip";

// icons
import { Ellipsis, BookOpen, } from "lucide-react";

// interfaces
import { Story, RoleTag } from "@/interfaces/story";

// schemas
import { StoryFormSchema, StoryFormSchemaType } from "@/schemas/library-schemas";
import EditStoryForm from "@/components/ui/custom/library/edit-story-form";

export function StoryAvatar({ storyID, avatar_url, isEditing }: { storyID: string, avatar_url?: string, isEditing: boolean }) {
    const storyPage = "/dashboard/library/" + storyID;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button className="-mt-10 md:-mt-14 md:-ml-10 size-40 shadow-lg shadow-white hover:border-4 hover:border-background rounded-full" variant="ghost" size="icon" asChild>
                    {isEditing ? (
                        <Avatar>
                            <AvatarImage className="" src={avatar_url}></AvatarImage>
                            <AvatarFallback className="bg-primary hover:border-none">
                                <BookOpen className="size-full text-primary-foreground" />
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar asChild>
                            <Link className="" href={storyPage}>
                                <AvatarImage className="" src={avatar_url}></AvatarImage>
                                <AvatarFallback className="bg-primary p-4">
                                    <BookOpen className="size-full text-primary-foreground" />
                                </AvatarFallback>
                            </Link>
                        </Avatar>
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>Launch Game</TooltipContent>
        </Tooltip>
    );
}

export default function StorySummary(
    {
        onUpdateStory,
        onDeleteStory,
        story,
    }: {
        onUpdateStory: Function,
        onDeleteStory: Function,
        story: Story,
    }
) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    const scrollToContent = () => {
        setTimeout(() => {
            if (story && targetRef.current!) {
                targetRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 200)
    };

    function onToggleEditMode() {
        setIsEditing(!isEditing);
    }

    function onDelete() {
        onDeleteStory(story);
        console.log(story);
    }

    return (
        <AccordionItem className="border-none snap-start snap-always" key={story.id} value={story.title}>
            <Card ref={targetRef} className="story-card">
                <CardContent className="flex flex-col gap-2 items-center">
                    {isEditing ? (
                        <>
                            <EditStoryForm
                                story={story}
                                isEditing={isEditing}
                                onToggleEditMode={onToggleEditMode}
                                onUpdateStory={onUpdateStory}
                            ></EditStoryForm>
                        </>

                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-xl">
                                <StoryAvatar storyID={story.id} avatar_url={story.avatar_url} isEditing={isEditing}></StoryAvatar>
                                <div className="grow-4 flex flex-col gap-2">
                                    <div className="flex flex-rows gap-2 md:gap-4">
                                        <div className="grow-2 text-2xl uppercase">{story.title}</div>
                                        <div className="h-6 w-12 md:w-20 px-1 md:px-2 rounded-md bg-accent self-end text-accent-foreground text-center">{story.userRole}</div>
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
                                                <DropdownMenuItem variant='default' onClick={onToggleEditMode}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem variant="destructive" onClick={onDelete}>Delete</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                                {story.overview && story.overview?.length > 0 &&
                                    <div className="col-span-4 p-4 flex flex-col items-start bg-background text-foreground rounded-lg">
                                        <Label className="text-lg">Summary</Label>
                                        {story.overview}
                                    </div>
                                }

                                {/* if story has progress value, display progress bar */}
                                {story.progress != undefined && story.progress > 0 &&
                                    <div className="flex flex-row gap-4 items-center justify-end rounded-2xl">
                                        <Progress className="" value={story.progress} />
                                        <span>{story.progress + "%"}</span>
                                    </div>
                                }
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
