// custom components
import HeaderLogo from "@/components/ui/custom/header-logo";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/shadcn/alert";

//
export default function Header({
    authUserId,
}: {
    authUserId: number
}) {
    const alerts: boolean[] = [];
    const toggleAlertsBanner = () => {
        
    };

    return (
        <header className="fixed z-20 w-screen h-0 flex flex-row justify-center">
            <HeaderLogo authUserId={authUserId} />
            <div className="flex flex-col -z-10">
                {alerts.length != 0 &&
                    <Skeleton className="bg-transparent pt-10 md:pt-8 px-2 md:px-8">
                        <Alert className="alert text-center text-lg text-primary bg-background border-none shadow-2xl rounded-4xl" variant="default">
                            <AlertTitle>!!Alert!!</AlertTitle>
                            <AlertDescription>
                                This is a test alert. Thank you for your assistance with testing the test alert system.
                            </AlertDescription>
                        </Alert>
                    </Skeleton>
                }
            </div>
        </header>
    );
}