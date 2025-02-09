"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const steps = [
  "/create/write-prompt",
  "/create/text-to-image",
  "/create/image-to-image",
  "/create/image-to-video",
  "/create/extend-video",
  "/create/video-to-audio",
  "/create/add-dialogue",
  "/create/add-music",
  "/create/preview",
  "/create/render",
];

export function useKeyboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Only handle if we're in the create flow
      if (!pathname.startsWith("/create")) return;

      const currentIndex = steps.indexOf(pathname);
      if (currentIndex === -1) return;

      // Left arrow for previous step
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        router.push(steps[currentIndex - 1]);
      }
      
      // Right arrow for next step
      if (e.key === "ArrowRight" && currentIndex < steps.length - 1) {
        e.preventDefault();
        router.push(steps[currentIndex + 1]);
      }

      // Number keys 1-9 for direct navigation
      const num = parseInt(e.key);
      if (num >= 1 && num <= steps.length) {
        e.preventDefault();
        router.push(steps[num - 1]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname]);
} 