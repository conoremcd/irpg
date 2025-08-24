"use client";

// library components 
import { useCallback, useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/shadcn/sidebar";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import UserProfile from "@/components/ui/custom/main/user-profile";

// supabase
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export default function MenuProfile({
    user,
}: Readonly<{
    user?: User | null;
}>) {
    const supabase = createClient()
    const [isLoading, setLoading] = useState(true)
    const [avatar_url, setAvatarUrl] = useState<string | undefined>(undefined)
    const profileLink = {
        url: "/dashboard/profile",
    }
    const { toggleSidebar } = useSidebar();

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

    return (
        <Button variant="ghost" onClick={toggleSidebar} asChild>
            <Link className="size-18 z-40 self-end" href={profileLink.url}>
                {!isLoading &&
                    <UserProfile className="hover:border-4 hover:border-background" avatar_url={avatar_url} isLoading={isLoading} />
                }
            </Link>
        </Button>
    );
}
