import { z }from "zod";

export const LoginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
}).required({ email: true, password: true });

export const SignUpFormSchema = z.object({
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
}).required({ email: true, password: true, confirmPassword: true, });

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
