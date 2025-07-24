// library components
import { Card } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import { Alert } from "@/components/ui/shadcn/alert";

export default function Home() {
  const showAlert: boolean = false;
  return (
    <main className="flex flex-col mx-auto mt-12 content-center">
      <div className="flex flex-col gap-2 justify-items-center">
        <span className="mt-8 mb-2 text-4xl text-center">Improv RPG</span>
        <Separator className="border-(--border)" />
        <span className="text-center">A virtual tabletop RPG</span>
      </div>
      {showAlert &&
        <Alert></Alert>
      }
    </main>
  );
}
