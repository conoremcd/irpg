import { z }from "zod";

export const AccountFormSchema = z.object({
    email: z.email(),
    username: z.string().min(3, {
        message: "username must be at least 3 characters."
    }).max(25, {
        message: "username must be no more than 25 characters."
    }).optional(),
    full_name: z.string().max(90, {
        message: "full name must be no more than 90 characters."
    }).optional(),
    avatar: z.file().mime(["image/png","image/jpeg","image/gif",]).optional(),
    updated_at: z.iso.datetime(),
}).required({ email: true, });

export type AccountFormSchemaType = z.infer<typeof AccountFormSchema>;