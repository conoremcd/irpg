// library components
import { Separator } from "@/components/ui/shadcn/separator";

export default async function Home() {

  return (
    <main className="flex flex-col mx-auto mt-12 content-center">
      <div className="flex flex-col gap-2 justify-items-center">
        <span className="mt-8 mb-2 text-4xl text-center">Improv RPG</span>
        <Separator className="border-(--border)" />
        <span className="text-center">A virtual tabletop RPG</span>
      </div>
    </main>
  );
}
