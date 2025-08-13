"use client";

// library components 
import React, { useRef } from "react";
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
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { Ellipsis, Plus, BookOpen } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import { DialogClose } from "@radix-ui/react-dialog";

const storyFormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters."
    }).max(25, {
        message: "Title must be no more than 25 characters."
    }),
    createdOn: z.iso.datetime(),

});

export default function EditStoryForm() {
    const storyForm = useForm<z.infer<typeof storyFormSchema>>({
        resolver: zodResolver(storyFormSchema),
        defaultValues: {
            title: "",
            createdOn: new Date().toISOString(),
        }
    });

    function onSubmit(values: z.infer<typeof storyFormSchema>) {
        // TODO: supabase API call to add new story to database
        console.log(values);
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
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}