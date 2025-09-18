// library components
import Account from "@/components/ui/custom/profile/account";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "@/components/ui/shadcn/accordion";
import { redirect } from "next/navigation";

// supabase
import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) redirect("/error");

    return (
        <div className="flex flex-col pt-24 pb-20 md:pt-30 md:pb-10 px-4 md:px-8" >
            <Account user={user} />
        </div>
    );
}