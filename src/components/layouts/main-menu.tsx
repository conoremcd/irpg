"use client";

// interfaces
import MenuItem from "@/interfaces/menu-item";

// library components
import {
    Sidebar,
    SidebarContent,
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
import UserProfile from "@/components/ui/custom/user-profile";
import HeaderLogo from "@/components/ui/custom/header-logo";
import { useIsMobile } from "@/hooks/use-mobile";

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

export default function MainMenu({
    authUserId,
}: Readonly<{
    authUserId?: number;
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
                    <UserProfile></UserProfile>
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
                <SidebarRail />
            </Sidebar>
        </div>
    );
}
