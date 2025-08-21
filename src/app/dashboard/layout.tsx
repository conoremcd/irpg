// library components
import { SidebarProvider } from "@/components/ui/shadcn/sidebar";
import MainMenu from "@/components/layouts/main-menu";
import Header from "@/components/layouts/header";

// database components
import { createClient } from '@/utils/supabase/server';

export default async function RootLayout({
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
          <Header userID={user?.id} ></Header>
          <MainMenu userID={user?.id} />
          <main>{children}</main>
        </>
      }
    </SidebarProvider>
  );
}
