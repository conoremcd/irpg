import { Card } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import { Alert } from "@/components/ui/shadcn/alert";

export default function Home() {
  const showAlert: boolean = false;
  return (
    <main className="flex flex-col mx-auto content-center">
      <div className="flex flex-col gap-2">
        <span className="mt-8 mb-2 text-4xl">Improv RPG</span>
        <Separator className="border-(--border)" />
        <span>A virtual tabletop RPG</span>
      </div>
      {showAlert &&
        <Alert></Alert>
      }
    </main>
  );
}
