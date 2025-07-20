"use client";
// 
import MenuItem from "@/interfaces/menu-item";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar
} from "../shadcn/sidebar";
import { Separator } from "../shadcn/separator";
import {
    BookUser,
    House,
    Images,
    Library,
    UserRoundPen,
    Settings,
    SidebarClose,
} from "lucide-react";
import Link from "next/link";
import HeaderProfile from "@/components/ui/custom/header-logo";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../shadcn/breadcrumb";
import FooterProfile from "./footer-profile";
import HeaderLogo from "@/components/ui/custom/header-logo";

// Menu items.
const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        url: "/#",
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
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();
    return (
        <Sidebar className="p-0" variant="sidebar" collapsible="icon">
            <SidebarHeader>
                <HeaderLogo authUserId={authUserId}></HeaderLogo>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems && menuItems.length > 0 && menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100"></SidebarMenuAction>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="flex flex-col">
                <FooterProfile></FooterProfile>
            </SidebarFooter>
            <SidebarRail></SidebarRail>
        </Sidebar>
    );
}
