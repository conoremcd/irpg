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
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import UserProfile from "@/components/ui/custom/main/user-profile";

// schemas
import { AccountFormSchema, AccountFormSchemaType } from "@/schemas/profile-schemas";

// supabase
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

// ...

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [full_name, setFullname] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [avatar_url, setAvatarUrl] = useState<string | undefined>(undefined);

    const accountForm = useForm<AccountFormSchemaType>({
        resolver: zodResolver(AccountFormSchema),
        defaultValues: {
            username: username,
            full_name: full_name,
            updated_at: new Date().toISOString(),
        }
    });

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, avatar_url`)
                .eq('id', user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile()
    }, [user, getProfile]);

    async function updateProfile({
        username,
        full_name,
        avatar_url,
    }: {
        username?: string | undefined
        full_name?: string | undefined
        avatar_url?: string | undefined
    }) {
        try {
            setLoading(true);

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                email: user?.email,
                full_name,
                username,
                avatar_url,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error
            alert('Profile updated!');
        } catch (error) {
            alert('Error updating the data!');
        } finally {
            setLoading(false);
        }
    }

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true);

            if (event.target.files && event.target.files.length > 0) {

                const file = event.target.files[0]
                const fileExt = file.name.split('.').pop()
                const filePath = `${user?.id}-${Math.random()}.${fileExt}`
                const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
                if (uploadError) {
                    throw uploadError
                }

                setAvatarUrl(filePath);
            }
        } catch {
            alert('Error uploading avatar image!');
        } finally {
            setUploading(false);
        }
    }

    return (
        <Card className="flex flex-col gap-4 p-4 border-background shadow-2xl shadow-primary">
            <CardHeader className="flex flex-col md:flex-row gap-4 justify-center items-center relative pt-16">
                <UserProfile className="absolute md:-left-8 -top-14 size-28" avatar_url={avatar_url} isLoading={loading} />
                <CardTitle className="text-2xl md:self-end">{username || "User Profile"}</CardTitle>
            </CardHeader>
            <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(() => updateProfile({ username, full_name, avatar_url }))} className="flex flex-col gap-4">

                    {/* ... */}

                    <FormField control={accountForm.control} name="avatar" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        uploadAvatar(e);
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            value={user?.email}
                            disabled />
                    </div>
                    <FormField control={accountForm.control} name="username" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField control={accountForm.control} name="full_name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button
                        className="primary hover:bg-accent hover:text-accent-foreground"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </Button>
                </form>
            </Form>
        </Card>
    )
}