// library components
import { SidebarProvider } from "@/components/ui/shadcn/sidebar";
import MainMenu from "@/components/layouts/main-menu";
import Header from "@/components/layouts/header";

// database components
import { createClient } from '@/utils/supabase/server';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // returieve user data from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider className="flex flex-col" defaultOpen={false}>
      {user &&
        <>
          <Header />
          <MainMenu user={user} />
          <main className="flex flex-col pt-24 items-center h-svh bg-muted">{children}</main>
        </>
      }
    </SidebarProvider>
  );
}
