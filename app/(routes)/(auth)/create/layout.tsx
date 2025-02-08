"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

const steps = [
  {
    title: "Write Prompt",
    href: "/create/write-prompt",
    description: "Write and enhance your prompt",
    shortcut: "1",
  },
  {
    title: "Text to Image",
    href: "/create/text-to-image",
    description: "Generate images from text descriptions",
    shortcut: "2",
  },
  {
    title: "Image to Image",
    href: "/create/image-to-image",
    description: "Transform existing images",
    shortcut: "3",
  },
  {
    title: "Image to Video",
    href: "/create/image-to-video",
    description: "Create videos from still images",
    shortcut: "4",
  },
  {
    title: "Extend Video",
    href: "/create/extend-video",
    description: "Extend and enhance videos",
    shortcut: "5",
  },
  {
    title: "Video to Audio",
    href: "/create/video-to-audio",
    description: "Generate audio for your videos",
    shortcut: "6",
  },
  {
    title: "Add Dialogue",
    href: "/create/add-dialogue",
    description: "Add AI-generated dialogue to your video",
    shortcut: "7",
  },
  {
    title: "Add Music",
    href: "/create/add-music",
    description: "Add AI-generated background music",
    shortcut: "8",
  },
  {
    title: "Preview",
    href: "/create/preview",
    description: "Preview your complete video",
    shortcut: "9",
  },
  {
    title: "Render",
    href: "/create/render",
    description: "Render your final video",
    shortcut: "0",
  },
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useKeyboardNavigation();

  return (
    <>
      <div className="w-full border-b">
        <div className="flex space-x-2 overflow-x-auto pb-2 px-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {steps.map((step, index) => (
            <Link
              key={step.href}
              href={step.href}
              className={cn(
                "flex flex-col min-w-[140px] p-2 rounded-lg border transition-colors group relative",
                pathname === step.href
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-accent"
              )}
            >
              <span className="text-xs font-medium mb-0.5">Step {index + 1}</span>
              <span className="text-xs font-semibold">{step.title}</span>
              <span className="text-[10px] mt-0.5 opacity-80">
                {step.description}
              </span>
              <kbd className="absolute top-1.5 right-1.5 px-1 py-0.5 text-[10px] font-mono rounded bg-muted-foreground/10">
                {step.shortcut}
              </kbd>
            </Link>
          ))}
        </div>
      </div>
      <div className="container mx-auto py-4">
        <div className="step-transition">{children}</div>
      </div>
    </>
  );
} 