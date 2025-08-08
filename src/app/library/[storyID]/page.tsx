"use client";

// library components
import React from "react";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import { Avatar } from "@radix-ui/react-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

// icons

export default function GameView() {



    return (
        <main className="story mx-auto bg-muted">
            {

            }
            <>
                {/* TODO: add challenge avatars panel */}
            </>
            <div className="flex flex-col h-screen gap-4 justify-center md:p-14">
                <Skeleton className="aspect-[calc(5/12))] md:aspect-square lg:aspect-video overflow-hidden rounded-4xl">
                    <img className="size-300  bg-primary"></img>
                </Skeleton>
            </div>
            <>
                {/* TODO: add character avatars panel */}
            </>
        </main >
    );
}