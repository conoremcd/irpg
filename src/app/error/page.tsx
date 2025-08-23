import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <main className="flex flex-col items-center md:justify-center h-svh">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Error</CardTitle>
                    <CardAction>
                        <Link href="/">back to home</Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="align-center">Sorry, something went wrong</p>
                </CardContent>
            </Card>
        </main>
    )
}