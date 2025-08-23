// library components
import React from "react";
import Library from "@/components/ui/custom/library/library";

// interfaces
import Story, { RoleTag } from "@/interfaces/story";

// supabase client
import { createClient } from '@/utils/supabase/client';
import { redirect } from "next/navigation";

const todayDate: string = new Date().toISOString();
const empty: Story[] = [];
const stories: Story[] = [
    {
        id: "1",
        title: "my first campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
        progress: 60.00,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "2",
        title: "a second campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.GM,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "3",
        title: "and another campaign",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "4",
        title: "and another one",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
    {
        id: "5",
        title: "and one more",
        overview: "once upon a time, some players rolled some dice... ...and they played happily ever-after",
        avatar: undefined,
        players: [],
        npcs: [],
        userRole: RoleTag.PLAYER,
        createdOn: todayDate,
        lastUpdated: todayDate,
        isEditing: false,
    },
];

export default async function LibraryPage() {
    const supabase = await createClient();
    const { data } = await supabase.from("library").select("*");

    if (!data) redirect("/error");

    const storyData: Story[] | undefined = data?.map((story) => {
        let record: Story = {
            id: story.id,
            title: story.game_title,
            userRole: RoleTag.GM,
            overview: story.game_overview,
            avatar: story.game_avatar_img ? undefined : undefined,
            progress: story.game_progress,
            schedule: [],
            players: [],
            npcs: [],
            createdOn: story.created_at,
            lastUpdated: story.last_updated,
            isEditing: false,
        }

        return record;
    });

    return (
        <Library stories={storyData} />
    );
}