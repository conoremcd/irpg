"use client"

// library components
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";

// interfaces
import { Profile } from "@/interfaces/profile";

// schemas
import { AccountFormSchema, AccountFormSchemaType } from "@/schemas/profile-schemas";

// supabase
import { createClient } from "@/utils/supabase/client";
import { type User, } from "@supabase/supabase-js";

// ...

export default function AccountForm({
    user,
    username,
    avatar_url,
    isLoading,
    updateProfile,
    updateAvatar,
}: {
    user: User | null,
    username: string | undefined,
    avatar_url: string | undefined,
    isLoading: boolean,
    updateProfile: Function,
    updateAvatar: Function,
}) {
    const accountForm = useForm<AccountFormSchemaType>({
        resolver: zodResolver(AccountFormSchema),
        defaultValues: {
            username: username || "",
            avatar: undefined,
            updated_at: new Date().toISOString(),
        }
    });

    useEffect(() => {
        accountForm.reset({
            username: username,
            avatar: undefined,
            updated_at: new Date().toISOString(),
        });
    }, [user, username, avatar_url]);

    const onSubmit = (values: AccountFormSchemaType) => {

        updateProfile(values)
    }

    return (
        <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* ... */}

                <FormField control={accountForm.control} name="avatar" render={({ field: { onChange, } }) => (
                    <FormItem>
                        <FormLabel>Avatar Image</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                disabled={isLoading}
                                onChange={(e) => {
                                    onChange(e.target.files?.[0] ?? undefined);
                                    updateAvatar(e);
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            {isLoading &&
                                "uploading..."
                            }
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="text"
                        disabled
                        value={user?.email}
                    />
                </FormItem>
                <FormField control={accountForm.control} name="username" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button
                    className="primary hover:bg-accent hover:text-accent-foreground"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading ...' : 'Update'}
                </Button>
            </form>
        </Form>
    )
}