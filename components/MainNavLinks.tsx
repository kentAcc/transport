"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavLinks = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/truck", label: "Trucks" },
    { href: "/user", label: "Users" },
  ];
  const currentPath = usePathname();
  return (
    <div className="flex items-center gap-2 ">
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link ${
            currentPath == link.href &&
            "cursor-default text-primary/70 hover:text-primary/60"
          }`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
