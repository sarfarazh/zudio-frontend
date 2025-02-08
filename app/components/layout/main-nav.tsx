"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { PowerIcon } from "lucide-react";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/create/write-prompt",
    label: "Create",
  },
  {
    href: "/library",
    label: "Media Library",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-8 font-semibold text-xl">
          <Link href="/">YourLogo</Link>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(route.href.split('/')[1])
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <ThemeToggle />
          </div>
          <button
            onClick={() => {/* Add your sign out logic here */}}
            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <PowerIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 