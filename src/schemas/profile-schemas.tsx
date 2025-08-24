import { z } from "zod";

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const AccountFormSchema = z.object({
    username: z.string().min(3, {
        message: "username must be at least 3 characters."
    }).max(25, {
        message: "username must be no more than 25 characters."
    }).optional(),
    full_name: z.string().max(90, {
        message: "full name must be no more than 90 characters."
    }).optional(),
    avatar: z.instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 6MB")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg and .png formats are supported.")
        .optional(),
    updated_at: z.iso.datetime(),
});

export type AccountFormSchemaType = z.infer<typeof AccountFormSchema>;