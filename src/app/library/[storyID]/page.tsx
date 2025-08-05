"use client";

// library components
import React from "react";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import { Avatar } from "@radix-ui/react-avatar";

// icons

export default function GameView() {
    const squares: number[] = Array(624).fill(0);

    return (
        <main className="story mx-auto bg-muted">
            <>
            {/* TODO: add challenge avatars panel */}
            </>
            <ScrollArea className="absolute m-auto">
                <div className="w-svw h-svh md:p-8">
                    <div className="map grid grid-rows-25 grid-cols-25 border-2 border-background inset-shadow-lg bg-foreground w-full h-full lg:w-200 lg:h-200 md:rounded-4xl overflow-hidden">
                        <img></img>
                        {squares.length > 0 && squares.map((square, index) => (
                            <div key={index} className="bg-transparent border-1 border-primary-foreground p-4"></div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
            <>
            {/* TODO: add character avatars panel */}
            </>
        </main >
    );
}