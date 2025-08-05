"use client";

// library components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui//shadcn/skeleton";
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "../shadcn/dropdown-menu";
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
import { Label } from "@radix-ui/react-menubar";
import { Progress } from "@/components/ui/shadcn/progress";
import { Separator } from "@/components/ui//shadcn/separator";

// Icons
import { Ellipsis, Plus, PenBox, BookOpen, ChevronsDownUp } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

function StoryAvatar({ storyID, avatar, userRole }: { storyID: number, avatar?: MediaImage, userRole: RoleTag }) {
    const storyPage = "/library/" + storyID;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button className="-m-8" variant="ghost" size="icon" onClick={() => { }} asChild>
                    <Avatar className="size-24 hover:shadow-2xl hover:border-4 hover:border-background rounded-full">
                        {avatar &&
                            <AvatarImage>{avatar.src}</AvatarImage>
                        }
                        <AvatarFallback className="bg-primary p-4">
                            <BookOpen className="size-full text-primary-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:fixed md:-top-4">
                <DropdownMenuGroup>

                    {userRole === RoleTag.GM ?
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={storyPage} >launch</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>{"edit"}</DropdownMenuItem>
                            <DropdownMenuItem>{"delete"}</DropdownMenuItem>
                        </>
                        :
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={storyPage} >launch</Link>
                            </DropdownMenuItem>
                        </>
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function StorySummary(story: Story) {

    return (
        <AccordionItem className="border-none" key={story.id} value={story.title}>
            <Card className="border-none shadow-2xl rounded-4xl">
                <CardContent className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col md:flex-row gap-12 items-center w-full md:w-xl">
                        <StoryAvatar storyID={story.id} avatar={story.avatar} userRole={story.userRole}></StoryAvatar>
                        <div className="grow-2 flex flex-col gap-2">
                            <div className="flex flex-rows gap-4">
                                <div className="grow-2 text-2xl uppercase">{story.title}</div>
                                <div className="h-6 w-16 md:w-20 px-2 rounded-md bg-accent self-end text-accent-foreground text-center">{story.userRole}</div>
                            </div>
                            <Separator className="p-0.25 bg-background" />
                        </div>
                    </div>
                    <AccordionTrigger className="size-8" />
                    <AccordionContent className="flex flex-col gap-4 w-full md:w-xl">
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
                </CardContent>
            </Card>
        </AccordionItem>
    );
}
