import React from "react";
import Link from "next/link";

const links = [
    { href: "/library", text: "library"},
    { href: "/characters", text: "characters"},
    { href: "/assets", text: "assets"},
    { href: "/profile", text: "profile"},
];

export default function Navbar() {
    const menuItems = links.map(link => 
        <Link href={link.href}>{link.text}</Link>
    )
    return (
        <nav className="navbar flex">
            {menuItems}
        </nav>
    );
}

