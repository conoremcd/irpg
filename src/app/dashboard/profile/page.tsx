import SignoutForm from "@/components/ui/custom/main/signout-form";
import UserProfile from "@/components/ui/custom/main/user-profile";
import AccountForm from "@/components/ui/custom/profile/account-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Profile() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) redirect("/error");

    return (
        <AccountForm user={user} />
    );
}