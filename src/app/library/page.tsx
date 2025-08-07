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
import { Plus } from "lucide-react";

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
            <ScrollArea className="h-svh ">
                <Accordion className="flex flex-col py-40 md:py-30 px-4 md:px-8 gap-4" type="single" collapsible >
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
                        < AccordionItem className="flex flex-col md:flex-row gap-2 justify-center" value={""}>
                            <AccordionTrigger>
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <Skeleton className="h-8 w-84 p-2 rounded-full"></Skeleton>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Skeleton className="h-8 w-84 p-2 rounded-full"></Skeleton>
                            </AccordionContent>
                        </AccordionItem>
                    )}
                    <div className="flex flex-col md:flex-row justify-center order-first md:order-last pt-4 md:pt-0">
                        <Button variant="ghost" size="icon" className="shadow-lg shadow-white bg-primary hover:border-4 hover:border-background rounded-full" asChild>
                            <span className="size-fit"><Plus className="size-18 text-primary-foreground rounded-full"></Plus></span>
                        </Button>
                    </div>

                </Accordion>
            </ScrollArea>
        </main >
    );
}