// library components
import { SidebarProvider } from "@/components/ui/shadcn/sidebar";
import MainMenu from "@/components/layouts/main-menu";
import HeaderLogo from "@/components/ui/custom/header-logo";

// styling
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// constants
const AUTH_USER_ID: number = 123456;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata settings
export const metadata: Metadata = {
  title: "Improv RPG",
  description: "Collaborative storytelling tabletop rpg fun for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider className="flex flex-row" defaultOpen={false}>
          {AUTH_USER_ID &&
            <MainMenu authUserId={AUTH_USER_ID} />
          }
          <header className="fixed w-full p-2 bg-(--primary)">
            <HeaderLogo authUserId={AUTH_USER_ID} />
          </header>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
