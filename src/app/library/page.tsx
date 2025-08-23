"use client";

// library components
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/shadcn/accordion";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/shadcn/dialog";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Button } from "@/components/ui/shadcn/button";
import StorySummary from "@/components/ui/custom/library/story-summary";
import AddStoryForm from "@/components/ui/custom/library/add-story-form";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// icons
import { BookOpen, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Separator } from "@/components/ui/shadcn/separator";

const todayDate: string = new Date().toISOString();
const empty: Story[] = [];
const stories: Story[] = [
    {
        id: "1",
        title: "my first campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
        progress: 60.00,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "2",
        title: "a second campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "3",
        title: "and another campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "4",
        title: "and another one",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "5",
        title: "and one more",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
];

export default function Library() {
    // CRUD functions
    const [storyList, setStoryList] = useState(empty);
    const addStory = (story: Story) => {
        setStoryList([...storyList, story]);
    }
    const updateStory = (edited: Story) => {
        setStoryList(storyList.map((story) => story.id === edited?.id ? { ...edited, isEditing: false } : story));
    }
    const deleteStory = (deleted: Story) => {
        setStoryList(storyList.filter((story) => story.id != deleted?.id));
    }
    const toggleEditMode = (editing: Story) => {
        setStoryList(storyList.map((story) => story.id === editing?.id ? { ...story, isEditing: !story.isEditing } : story ));
    }

    return (
        <main className="library mx-auto bg-muted">
            <Dialog>
                <DialogContent>
                    <AddStoryForm onAddStory={addStory}></AddStoryForm>
                </DialogContent>
                <ScrollArea className="h-screen snap-y snap-mandatory overflow-y-scroll">
                    <Accordion className="flex flex-col pt-40 pb-20 md:pt-30 md:pb-10 px-4 md:px-8 gap-8" type="single" collapsible >
                        {storyList && storyList.length > 0 ? storyList.map((story: Story) => (
                            <StorySummary
                                key={story.id}
                                onUpdateStory={updateStory}
                                onDeleteStory={deleteStory}
                                onToggleEditMode={toggleEditMode}
                                story={story}
                            />
                        )) : (
                            <Skeleton className="border-none bg-none rounded-4xl">
                                <AccordionItem className="border-none snap-center snap-always" value="story title">
                                    <Card className="transition border-none shadow-2xl rounded-4xl hover:transition-transform hover:scale-106 hover:ease-in-out hover:duration-400 hover:delay-150">
                                        <CardContent className="flex flex-col gap-2 items-center">
                                            <div className="flex flex-col md:flex-row gap-8 items-center w-full md:w-xl">
                                                <Avatar className="-ml-8 -mt-10 size-24 shadow-lg shadow-white rounded-full">
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
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="add-button shadow-lg shadow-white bg-primary hover:border-4 hover:border-background rounded-full" asChild>
                                    <span className="size-fit">
                                        <Plus className="size-10 text-primary-foreground rounded-full"></Plus>
                                    </span>
                                </Button>
                            </DialogTrigger>
                        </div>
                    </Accordion>
                </ScrollArea>
            </Dialog>
        </main >
    );
}