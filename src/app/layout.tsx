import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";

config.autoAddCss = false; // Prevent Font Awesome from trying to inject CSS directly, as Next.js handles it.

const AUTH_USER_ID: number = 123456;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Drawer>
          <DrawerTrigger>
            <Avatar className="profile-pic">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>profile picture</AvatarFallback>
            </Avatar>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              {AUTH_USER_ID &&
                <>
                  <Avatar className="profile-pic">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>profile picture</AvatarFallback>
                  </Avatar>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Library</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Characters</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Assets</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </>

              }
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {children}
      </body>
    </html>
  );
}
