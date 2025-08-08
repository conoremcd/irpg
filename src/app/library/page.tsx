"use client";

// library components
import React from "react";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/shadcn/accordion";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Button } from "@/components/ui/shadcn/button";
import StorySummary from "@/components/ui/custom/story-summary";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// icons
import { BookOpen, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Separator } from "@/components/ui/shadcn/separator";

const empty: Story[] = [];
const stories: Story[] = [
    {
        id: 1,
        title: "my first campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
        progress: 60.00,
    },
    {
        id: 2,
        title: "a second campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
    },
    {
        id: 3,
        title: "and another campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
    },
    {
        id: 4,
        title: "and another one",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
    },
    {
        id: 5,
        title: "and one more",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
    },
];

export default function Library() {

    return (
        <main className="library mx-auto bg-muted">
            <ScrollArea className="h-screen snap-y snap-mandatory overflow-y-scroll">
                <Accordion className="flex flex-col py-40 md:py-30 px-4 md:px-8 gap-8" type="single" collapsible >
                    {stories && stories.length > 0 ? stories.map((story: Story) => (
                        <StorySummary
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            avatar={story.avatar}
                            overview={story.overview}
                            userRole={story.userRole}
                            progress={story.progress}
                        />
                    )) : (
                        <Skeleton className="border-none bg-none rounded-4xl">
                            <AccordionItem className="border-none snap-center snap-always" value="story title">
                                <Card className="transition border-none shadow-2xl rounded-4xl hover:transition-transform hover:scale-106 hover:ease-in-out hover:duration-400 hover:delay-150">
                                    <CardContent className="flex flex-col gap-2 items-center">
                                        <div className="flex flex-col md:flex-row gap-12 items-center w-full md:w-xl">
                                            <Avatar className="size-24 shadow-lg shadow-white hover:border-4 hover:border-background rounded-full">
                                                <AvatarFallback className="bg-primary p-4">
                                                    <BookOpen className="size-full text-primary-foreground" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grow-2 flex flex-col gap-2">
                                                <div className="flex flex-rows gap-4">
                                                    <div className="grow-2 text-2xl uppercase"></div>
                                                    <div className="h-6 w-16 md:w-20 px-2 rounded-md bg-accent self-end text-accent-foreground text-center"></div>
                                                </div>
                                                <Separator className="p-0.25 bg-background" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AccordionItem>
                        </Skeleton>
                    )}
                    <div className="flex flex-col md:flex-row justify-center order-first md:order-last pt-4 md:pt-0">
                        <Button variant="ghost" size="icon" className="add-button shadow-lg shadow-white bg-primary hover:border-4 hover:border-background rounded-full" asChild>
                            <span className="size-fit"><Plus className="size-18 text-primary-foreground rounded-full"></Plus></span>
                        </Button>
                    </div>

                </Accordion>
            </ScrollArea>
        </main >
    );
}