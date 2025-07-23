"use client";

// library components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/shadcn/table";
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/shadcn/card";
import { Pagination } from "@/components/ui/shadcn/pagination";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import { Separator } from "@/components/ui/shadcn/separator";
import { Button } from "@/components/ui/shadcn/button";
import StoryAvatar from "@/components/ui/custom/story-avatar";


// interfaces
import Story from "@/interfaces/story";

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
            <Card className="mx-auto p-4">
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col content-center">
                            <span className="text-4xl text-center">Game Library</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <Separator className="border-(--border)" />
                <CardContent className="">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-left">Title</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stories && stories.length > 0 && stories.map((story: Story) => (
                                <Collapsible key={story.id} asChild>
                                    <>
                                        <TableRow>
                                            <TableCell>
                                                <StoryAvatar id={story.id} avatar={story.avatar} title={story.title} /></TableCell>
                                            <TableCell>
                                                <CollapsibleTrigger asChild>
                                                    <span>{story.title}</span>
                                                </CollapsibleTrigger>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon"></Button>
                                            </TableCell>
                                        </TableRow>
                                        <CollapsibleContent className="m-2" asChild>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>{story.overview}</TableCell>
                                                {/* toDo: <Link href={story.bookPath}></Link> */}
                                            </TableRow>
                                        </CollapsibleContent>
                                    </>
                                </Collapsible>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Pagination></Pagination>
                </CardFooter>
            </Card>
        </main>
    );
}