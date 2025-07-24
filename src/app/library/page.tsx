"use client";

// library components
import React from "react";
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/shadcn/card";
import { Pagination } from "@/components/ui/shadcn/pagination";
import { Separator } from "@/components/ui/shadcn/separator";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/shadcn/accordion";
import StorySummary from "@/components/ui/custom/story-summary";

// interfaces
import Story from "@/interfaces/story";

// icons

const empty: Story[] = [];
const stories: Story[] = [
    {
        id: 1,
        title: "my first campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
    },
    {
        id: 2,
        title: "a second campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
    },
    {
        id: 3,
        title: "and another campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
    },
    {
        id: 4,
        title: "and another one",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
    },
    {
        id: 5,
        title: "and one more",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
    },
];

export default function Library() {

    return (
        <main className="library flex flex-col mx-auto mt-18 md:mt-20 content-center">
            <Card className="mx-auto p-10">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col content-center">
                            <span className="text-4xl text-center">Game Library</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <Separator className="border-(--border)" />
                <CardContent className="">
                    <Accordion type="single" collapsible>
                        {stories && stories.length > 0 ? stories.map((story: Story) => (
                            <StorySummary key={story.id} id={story.id} title={story.title}></StorySummary>

                        )) : (
                            <AccordionItem className="flex flex-col md:flex-row gap-2 justify-center" value={""}>
                                <AccordionTrigger>
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    <Skeleton className="h-8 w-84 p-2 rounded-full"></Skeleton>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Skeleton className="h-8 w-84 p-2 rounded-full"></Skeleton>
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                </CardContent>
                <CardFooter>
                    <Pagination></Pagination>
                </CardFooter>
            </Card>
        </main >
    );
}