"use client"

// library components
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import UserProfile from "@/components/ui/custom/main/user-profile";

// interfaces
import { Profile } from "@/interfaces/profile";

// schemas
import { AccountFormSchema, AccountFormSchemaType } from "@/schemas/profile-schemas";

// supabase
import { createClient } from "@/utils/supabase/client";
import { type User, } from "@supabase/supabase-js";
import AccountForm from "@/components/ui/custom/profile/account-form";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Pencil, Eraser } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

// ...

export default function Account({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [avatar_url, setAvatarUrl] = useState<string | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

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
                throw error;

            } else if (data) {
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
                console.log(data);

            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, isEditing, getProfile]);

    async function updateProfile(values: AccountFormSchemaType) {
        try {
            setLoading(true);

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                email: user?.email,
                username: values.username,
                avatar_url: avatar_url,
                updated_at: new Date().toISOString(),
            });

            if (error) throw error;

            alert('Profile updated!');
        } catch (error) {
            alert('Error updating the data!');
        } finally {
            setLoading(false);
            toggleEditMode();
        }
    };

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setLoading(true);

            if (event.target.files && event.target.files.length > 0) {
                const file: File = event.target.files[0];
                const bucketID: string = 'profile-avatars';
                const filePath: string = `${user?.id}/${file.name}`;
                const { data: upload, error: uploadError } = await supabase.storage
                    .from(bucketID)
                    .upload(filePath, file, {
                        upsert: true,
                    });
                const { data: url } = supabase.storage
                    .from(bucketID)
                    .getPublicUrl(filePath);

                if (uploadError) {
                    throw uploadError;
                } else {
                    console.log(upload);
                    console.log(url.publicUrl);

                    setAvatarUrl(url.publicUrl);
                }
            }
        } catch {
            alert('Error uploading avatar image!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="flex flex-col gap-4 p-4 border-background shadow-2xl shadow-primary">
            <CardHeader className="flex flex-col md:flex-row gap-4 justify-center items-center relative pt-16">
                <CardAction>
                    <UserProfile className="absolute md:-left-8 -top-12 size-28" avatar_url={avatar_url} isLoading={loading} />
                    <Button className="absolute right-0 top-0" onClick={toggleEditMode} >
                        {isEditing ? (
                            <Eraser></Eraser>
                        ) : (

                            <Pencil></Pencil>
                        )}
                    </Button>
                </CardAction>
                <CardTitle className="text-2xl md:self-end">{username || "User Profile"}</CardTitle>

            </CardHeader>
            {isEditing ? (
                <AccountForm user={user} username={username} avatar_url={avatar_url} isLoading={loading} updateAvatar={uploadAvatar} updateProfile={updateProfile}></AccountForm>
            ) : (
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <span>{user?.email}</span>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}