// custom components
import HeaderLogo from "@/components/ui/custom/header-logo";

//
export default function Header({
    authUserId,
}: {
    authUserId: number
}) {

    return (
        <header className="fixed z-50 w-full h-0">
            <HeaderLogo authUserId={authUserId} />
        </header>
    );
}