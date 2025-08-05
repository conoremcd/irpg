"use client";

// library components
import React from "react";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// icons

export default function GameView() {

    return (
        <main className="story mx-auto bg-muted">
            <ScrollArea className="absolute m-auto">
                <div className="w-svw h-svh md:p-8">
                    <div className="map grid grid-rows-25 grid-cols-25 grid-border-2 bg-foreground w-full h-full lg:w-200 lg:h-200 md:rounded-4xl">
                        <img></img>
                    </div>
                </div>
            </ScrollArea>
        </main >
    );
}