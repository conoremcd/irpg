import { z }from "zod";
import { RoleTag } from "@/interfaces/story";

export const AddStoryFormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters."
    }).max(25, {
        message: "Title must be no more than 25 characters."
    }),
    createdOn: z.iso.datetime(),

});

export const StoryFormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters."
    }).max(25, {
        message: "Title must be no more than 15 characters."
    }),
    userRole: z.enum(RoleTag),
    overview: z.string().max(2400, {
        message: "Summary must be no more than 2400 characters."
    }).optional(),
    avatar: z.file().mime(["image/png", "image/jpeg", "image/gif"]).optional(),
    progress: z.number().optional(),
    schedule: z.array(z.object({
        dates: z.iso.datetime(),
    })).optional(),
    players: z.array(z.object({
        id: z.uuidv4(),
        name: z.string(),
        level: z.number(),
    })).optional(),
    npcs: z.array(z.object({
        id: z.uuidv4(),
        name: z.string(),
        level: z.number(),
    })).optional(),
}).required({ title: true, userRole: true });

export type AddStoryFormSchemaType = z.infer<typeof AddStoryFormSchema>;
export type StoryFormSchemaType = z.infer<typeof StoryFormSchema>;
