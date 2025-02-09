"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

const steps = [
  { href: "/create/write-prompt", title: "Write Prompt", description: "Describe your vision" },
  { href: "/create/text-to-image", title: "Generate Image", description: "Create base image" },
  { href: "/create/image-to-image", title: "Refine Image", description: "Modify image" },
  { href: "/create/image-to-video", title: "Animate", description: "Create animation" },
  { href: "/create/extend-video", title: "Extend Video", description: "Add duration" },
  { href: "/create/video-to-audio", title: "Extract Audio", description: "Process audio" },
  { href: "/create/add-dialogue", title: "Add Dialogue", description: "Voice generation" },
  { href: "/create/add-music", title: "Add Music", description: "Background music" },
  { href: "/create/preview", title: "Preview", description: "Review creation" },
  { href: "/create/render", title: "Render", description: "Final export" }
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/(routes\/)?(\(auth\)\/)?/, '/');
  console.log('Normalized pathname:', normalizedPathname);
  useKeyboardNavigation();

  const currentStepIndex = steps.findIndex(step => step.href === normalizedPathname);
  console.log('Current step index:', currentStepIndex);
  const previousStep = steps[currentStepIndex - 1];
  const nextStep = steps[currentStepIndex + 1];

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)]">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <nav aria-label="Creation steps" className="flex items-center gap-2">
              {steps.slice(0, currentStepIndex + 1).map((step, index) => (
                <div key={step.href} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
                  <Link
                    href={step.href}
                    aria-current={normalizedPathname === step.href ? "step" : undefined}
                    className={cn(
                      "hover:text-foreground transition-colors flex items-center gap-2",
                      normalizedPathname === step.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-xs border rounded-full">
                      {index + 1}
                    </span>
                    {step.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ 
                width: `${((currentStepIndex + 1) / steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Previous Output */}
          {previousStep && (
            <div className="lg:col-span-3">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-sm font-medium mb-2">Previous: {previousStep.title}</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  {/* Previous output preview */}
                </div>
              </div>
            </div>
          )}

          {/* Current Step */}
          <div className={cn(
            "lg:col-span-6",
            !previousStep && !nextStep ? "lg:col-start-4" : "",
            !previousStep ? "lg:col-start-1" : "",
            !nextStep ? "lg:col-end-13" : ""
          )}>
            {children}
          </div>

          {/* Next Step Preview */}
          {nextStep && (
            <div className="lg:col-span-3">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-sm font-medium mb-2">Next: {nextStep.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{nextStep.description}</p>
                <Link
                  href={nextStep.href}
                  className="block w-full py-2 text-center text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90"
                >
                  Continue to {nextStep.title}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 