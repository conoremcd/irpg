"use client";

// library components
import React from "react";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import { Avatar } from "@radix-ui/react-avatar";
import { useIsMobile } from "@/hooks/use-mobile";

// icons

export default function GameView() {
    

    let squares: number[] = Array(624).fill(0);

    if (useIsMobile() === true ) {
        
        squares = Array(74).fill(0);

    }

    return (
        <main className="story mx-auto bg-muted">
            {

            }
            <>
            {/* TODO: add challenge avatars panel */}
            </>
            <ScrollArea className="">
                <div className="w-svw h-svh md:p-8">
                    <div className="map grid grid-rows-15 grid-cols-5 md:grid-rows-10 md:grid-cols-10 lg:grid-rows-25 lg:grid-cols-25 border-2 border-background inset-shadow-lg bg-foreground w-full h-full lg:w-200 lg:h-200 md:rounded-4xl overflow-hidden">
                        <img></img>
                        {squares.length > 0 && squares.map((square, index) => (
                            
                            <div key={index} className="bg-transparent border-1 border-primary-foreground p-2"></div>
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