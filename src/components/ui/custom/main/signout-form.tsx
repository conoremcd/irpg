import { Button } from "@/components/ui/shadcn/button";
import { LogOut } from "lucide-react";

export default function SignoutForm() {

    return (
        <form action="/auth/signout" method="post">
            <Button className="Button flex flex-row text-background" type="submit" variant="link">
                Sign Out <LogOut/>
            </Button>
        </form>

    )
}