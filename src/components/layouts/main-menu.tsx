"use client";

// interfaces
import MenuItem from "@/interfaces/menu-item";

// library components
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar
} from "@/components/ui/shadcn/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@supabase/supabase-js";

// icons
import {
    BookUser,
    House,
    Images,
    Library,
    UserRoundPen,
    Settings,
} from "lucide-react";

// custom components
import HeaderLogo from "@/components/ui/custom/main/header-logo";
import SignoutForm from "@/components/ui/custom/main/signout-form";
import MenuProfile from "@/components/ui/custom/main/menu-profile";

// menu items
const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: House,
    },
    {
        title: "Library",
        url: "/dashboard/library",
        icon: Library,
    },
    {
        title: "Characters",
        url: "/dashboard/characters",
        icon: BookUser,
    },
    {
        title: "Assets",
        url: "/dashboard/assets",
        icon: Images,
    },
    {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserRoundPen,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export default function MainMenu({
    user,
}: Readonly<{
    user?: User | null;
}>) {

    const pathName = usePathname();
    const { toggleSidebar } = useSidebar();

    return (
        <div className="main-menu bg-sidebar z-10">
            <Sidebar variant="sidebar" collapsible="offcanvas">
                <SidebarHeader className="flex flex-row h-24 md:h-30 md:px-4 md:py-8 justify-end">
                    {/* TODO: repeated code with the header-logo here, should find better way */}
                    {useIsMobile() &&
                        <HeaderLogo></HeaderLogo>
                    }
                    <MenuProfile user={user}></MenuProfile>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel>Improv RPG</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems && menuItems.length > 0 && menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathName === item.url} onClick={toggleSidebar}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="flex flex-row justify-end">
                    <SignoutForm />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </div>
    );
}
