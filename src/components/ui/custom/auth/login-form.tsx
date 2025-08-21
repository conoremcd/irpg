"use client";

// library components 
import React from "react";
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

// schemas
import {
    LoginFormSchema,
    LoginFormSchemaType
} from "@/schemas/auth-schemas";



export default function LoginForm({ onLogin }: { onLogin: Function }) {
    const loginForm = useForm<LoginFormSchemaType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        // TODO: supabase API call 

        onLogin(values);
        console.log(values);
    }

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <DialogHeader className="pb-6 md:pb-4">
                    <DialogTitle className="">Login to your account</DialogTitle>
                </DialogHeader>
                <FormField control={loginForm.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="user@email.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            Enter the email for your account profile.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField control={loginForm.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>
                            Enter the password for your account profile.
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
                        <Button type="submit" className="">Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    )
}