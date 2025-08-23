"use client";

// library components 
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

// Icons
import { Ellipsis, Plus, BookOpen } from "lucide-react";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";
import { StoryFormSchema, StoryFormSchemaType } from "@/schemas/library-schemas";
import { Separator } from "@radix-ui/react-separator";
import { StoryAvatar } from "@/components/ui/custom/library/story-summary";
import { Progress } from "@/components/ui/shadcn/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Slider } from "@/components/ui/shadcn/slider";
import { Textarea } from "@/components/ui/shadcn/textarea";

export default function EditStoryForm({
    story,
    onToggleEditMode,
    onUpdateStory

}: {
    story: Story,
    onToggleEditMode: Function,
    onUpdateStory: Function,
}

) {
    const form = useForm<StoryFormSchemaType>({
        resolver: zodResolver(StoryFormSchema),
        defaultValues: {
            title: story.title,
            userRole: story.userRole,
            overview: story.overview,
            progress: story.progress,
        },
    });

    function onSubmit(values: StoryFormSchemaType) {
        // TODO: supabase API call to update story in database
        story.title = values.title;
        story.userRole = values.userRole;
        story.overview = values.overview;
        story.progress = values.progress;
        story.lastUpdated = new Date().toISOString();

        onUpdateStory(story);
        console.log(story);
        console.log(values);
    }

    function onCancel() {
        onToggleEditMode(story);
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file

        if (file) {
            console.log("Selected file:", file);
            // You can now process the file, e.g., upload it, display a preview, etc.
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row w-full md:w-xl gap-4">
                    <div className="flex flex-col gap-4 items-end">
                        <StoryAvatar storyID={story.id} avatar={story.avatar} isEditing={story.isEditing}></StoryAvatar>
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem className="flex flex-col max-w-50">
                                    <FormLabel>Game Avatar</FormLabel>
                                    <FormControl>
                                        <Input type="file" onChange={handleFormChange} accept="image/*" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grow-4 flex flex-col self-end">
                        <div className="flex flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2 grow-2">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                onChange={field.onChange}
                                                defaultValue={story.title}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="userRole"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <div className="h-6 w-16 md:w-20 px-2 rounded-md bg-accent self-end text-accent-foreground text-center">{field.value}</div>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="are you the game magus or the player?" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={RoleTag.GM}>Game Magus</SelectItem>
                                                <SelectItem value={RoleTag.PLAYER}>Player</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <Separator className="p-0.25 bg-background" />
                <div>
                    <FormField
                        control={form.control}
                        name="overview"
                        render={({ field }) => (
                            <FormItem className="grow-2">
                                <FormLabel>Summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="once upon a time some players rolled some dice..."
                                        onChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="">
                    <FormField
                        control={form.control}
                        name="progress"
                        render={({ field }) => (
                            <FormItem className="grow-2 flex flex-col gap-4">
                                <FormLabel>Story Progress ({field.value}%)</FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[story.progress || 0]}
                                        max={100}
                                        step={5}
                                        onValueChange={(value) => field.onChange(value[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant="destructive" type="reset" value="Reset" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}