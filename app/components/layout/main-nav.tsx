"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { PowerIcon, UserCircle2, User2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    protected: true,
  },
  {
    href: "/create/write-prompt",
    label: "Create",
    protected: true,
  },
  {
    href: "/library",
    label: "Media Library",
    protected: true,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-8 font-semibold text-xl">
          <Link href="/">ZenStudio</Link>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            (!route.protected || user) && (
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
            )
          ))}
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <ThemeToggle />
          </div>
          {user ? (
            <>
              <Link
                href="/profile"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                title="Profile"
              >
                <User2 className="h-4 w-4" />
              </Link>
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                title="Sign out"
              >
                <PowerIcon className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="h-9 px-4 flex items-center justify-center gap-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <UserCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 