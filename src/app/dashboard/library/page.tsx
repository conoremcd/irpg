// library components
import React from "react";
import Library from "@/components/ui/custom/library/library";

// interfaces
import { Story, RoleTag } from "@/interfaces/story";

// supabase client
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

const todayDate: string = new Date().toISOString();
const empty: Story[] = [];

export default async function LibraryPage() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) redirect("/error");

    return (
        <Library user={user} />
    );
}