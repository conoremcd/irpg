// library components
import { SidebarProvider } from "@/components/ui/shadcn/sidebar";
import HeaderMenu from "@/components/ui/custom/header-menu";

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
        <SidebarProvider defaultOpen={true}>
          {AUTH_USER_ID &&
            <HeaderMenu authUserId={AUTH_USER_ID} />
          }
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
