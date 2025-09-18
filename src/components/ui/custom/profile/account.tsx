"use client"

// library components
import { useState } from "react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import UserProfile from "@/components/ui/custom/main/user-profile";
import AccountForm from "@/components/ui/custom/profile/account-form";
import { Label } from "@/components/ui/shadcn/label";
import { Pencil, Eraser } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

// schemas
import { AccountFormSchemaType } from "@/schemas/profile-schemas";

// supabase service
import { useProfile } from "@/hooks/use-profile";
import { type User, } from "@supabase/supabase-js";

// ...

export default function Account({ user }: { user: User | null }) {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }
    const { profile, loading, error, updateProfile, updateAvatar } = useProfile(user, [isEditing]);

    async function onUpdate(values: AccountFormSchemaType) {
        const formData = {
            username: values.username,
            avatar_url: profile?.avatar_url,
        };

        await updateProfile(formData)

        toggleEditMode();
    }

    return (
        <Card className="flex flex-col gap-4 p-4 border-background shadow-2xl shadow-primary">
            <CardHeader className="flex flex-col md:flex-row gap-4 justify-center items-center relative pt-30">
                <CardAction>
                    <UserProfile className="absolute md:-left-8 -top-12 size-40 shadow-background shadow-2xl" avatar_url={profile?.avatar_url} />
                    <Button className="absolute right-0 top-0" onClick={toggleEditMode} >
                        {isEditing ? (
                            <Eraser></Eraser>
                        ) : (

                            <Pencil></Pencil>
                        )}
                    </Button>
                </CardAction>
                <CardTitle className="text-2xl md:self-end">{profile?.username || "User Profile"}</CardTitle>
            </CardHeader>
            {isEditing ? (
                <AccountForm user={user} username={profile?.username} avatar_url={profile?.avatar_url} isLoading={loading} updateAvatar={updateAvatar} updateProfile={onUpdate}></AccountForm>
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