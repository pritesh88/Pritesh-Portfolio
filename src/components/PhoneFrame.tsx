import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Minimal phone body around a real mobile screenshot.
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[1.6rem] border border-tint/15 bg-card p-1.5 shadow-[var(--shadow-frame)]",
        className,
      )}
    >
      <span
        className="absolute left-1/2 top-3 z-10 h-1.5 w-[22%] -translate-x-1/2 rounded-full bg-black/70"
        aria-hidden
      />
      <div className="size-full overflow-hidden rounded-[1.25rem] [&>img]:size-full [&>img]:object-cover [&>img]:object-top">
        {children}
      </div>
    </div>
  );
}
