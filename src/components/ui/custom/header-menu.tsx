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
} from "@/components/ui/shadcn/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import {
    BookUser,
    House,
    Images,
    Library,
    UserRoundPen,
    Settings,
    SidebarClose,
} from "lucide-react";

// custom components
import FooterProfile from "@/components/ui/custom/footer-profile";
import HeaderLogo from "@/components/ui/custom/header-logo";

// menu items
const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: House,
    },
    {
        title: "Library",
        url: "/library",
        icon: Library,
    },
    {
        title: "Characters",
        url: "/characters",
        icon: BookUser,
    },
    {
        title: "Assets",
        url: "/assets",
        icon: Images,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserRoundPen,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export default function HeaderMenu({
    authUserId,
}: Readonly<{
    authUserId?: number;
}>) {

    const pathName = usePathname();
    return (
        <header className="header">
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader className="flex flex-row justify-end-safe bg-(--sidebar-primary)">
                    <HeaderLogo authUserId={authUserId}></HeaderLogo>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel>Improv RPG</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems && menuItems.length > 0 && menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathName === item.url}>
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
                <SidebarFooter className="flex flex-col bg-(--sidebar-accent)">
                    <FooterProfile></FooterProfile>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </header>
    );
}
