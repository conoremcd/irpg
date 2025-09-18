"use client";

// library components 
import { useState } from "react";
import { useSidebar } from "@/components/ui/shadcn/sidebar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import UserProfile from "@/components/ui/custom/main/user-profile";

// supabase service 
import { useProfile } from "@/hooks/use-profile";
import { User } from "@supabase/supabase-js";

export default function MenuProfile({
    user,
}: Readonly<{
    user?: User | null;
}>) {
    const profileLink = {
        url: "/dashboard/profile",
    }
    const { toggleSidebar, open } = useSidebar();
    const { profile } = useProfile(user ?? null, [open]);

    return (
        <Button variant="ghost" onClick={toggleSidebar} asChild>
            <Link className="size-18 z-40 self-end" href={profileLink.url}>
                <UserProfile className="hover:border-4 hover:border-background" avatar_url={profile?.avatar_url} />
            </Link>
        </Button>
    );
}
