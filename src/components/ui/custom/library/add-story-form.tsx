"use client";

// library components 
import React, { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { Ellipsis, Plus, BookOpen } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// schemas
import {
    AddStoryFormSchema,
    AddStoryFormSchemaType
} from "@/schemas/library-schemas";



export default function AddStoryForm({ onAddStory }: { onAddStory: Function }) {
    const storyForm = useForm<AddStoryFormSchemaType>({
        resolver: zodResolver(AddStoryFormSchema),
        defaultValues: {
            title: "",
            createdOn: new Date().toISOString(),
        }
    });

    function onSubmit(values: z.infer<typeof AddStoryFormSchema>) {
        // TODO: supabase API call to add new story to database
        const newStory: Story = {
            id: uuidv4(),
            title: values.title,
            overview: "",
            avatar: undefined,
            players: [],
            npcs: [],
            userRole: RoleTag.GM,
            progress: undefined,
            createdOn: values.createdOn,
            lastUpdated: values.createdOn,
            isEditing: false
        }

        onAddStory(newStory);
        console.log(newStory);
    }

    return (
        <Form {...storyForm}>
            <form onSubmit={storyForm.handleSubmit(onSubmit)} className="">
                <DialogHeader className="pb-6 md:pb-4">
                    <DialogTitle>New Game Story</DialogTitle>
                    <DialogDescription className="text-left">
                        Add a new game story to your library.
                    </DialogDescription>
                </DialogHeader>
                <FormField control={storyForm.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Created By</FormLabel>
                        <FormControl>
                            <Input placeholder="a new story begins..." {...field} />
                        </FormControl>
                        <FormDescription>
                            Title of your game story.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter className="pt-6 md:pt-4">
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit">Add Story</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    )
}