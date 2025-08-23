"use client";

// library components 
import React, { useState } from "react";
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
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

// icons
import { Eye, EyeClosed, EyeOff } from "lucide-react";

// schemas
import {
    SignUpFormSchema,
    SignUpFormSchemaType
} from "@/schemas/auth-schemas";



export default function SignUpForm({ onRegister }: { onRegister: Function }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    const signupForm = useForm<SignUpFormSchemaType>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    function onSubmit(values: SignUpFormSchemaType) {
        // TODO: supabase API call 

        onRegister(values);
        console.log(values);
    }

    return (
        <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField control={signupForm.control} name="email" render={({ field }) => (
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
                <FormField control={signupForm.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="relative flex flex-row">
                                <Input type={showPassword ? "text" : "password"} className="pr-10" {...field} />
                                <Button type="button" variant="ghost" size="icon" onClick={togglePasswordVisibility} className="absolute right-3 hover:">
                                    {showPassword ? (
                                        <Eye className="size-6" />
                                    ) : (
                                        <EyeOff className="size-6" />
                                    )}
                                </Button>
                            </div>
                        </FormControl>
                        <FormDescription>
                            Enter the password for your account profile.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                /><FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <div className="relative flex flex-row">
                                <Input type={showPassword ? "text" : "password"} className="pr-10" {...field} />
                                <Button type="button" variant="ghost" size="icon" onClick={togglePasswordVisibility} className="absolute right-3 hover:">
                                    {showPassword ? (
                                        <Eye className="size-6" />
                                    ) : (
                                        <EyeOff className="size-6" />
                                    )}
                                </Button>
                            </div>
                        </FormControl>
                        <FormDescription>
                            Confirm the password for your account profile.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-row justify-evenly pt-6 md:pt-4">
                    <Button type="submit" className="hover:bg-accent hover:text-accent-foreground">Register</Button>
                </div>
            </form>
        </Form>
    )
}