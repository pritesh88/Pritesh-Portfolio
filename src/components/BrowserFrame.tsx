import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Minimal browser chrome around a real project screenshot.
export function BrowserFrame({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("frame", className)}>
      <div className="flex items-center gap-3 border-b border-tint/8 px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-tint/15" />
          ))}
        </div>
        {label && (
          <span className="mx-auto max-w-[60%] truncate rounded-full bg-tint/5 px-3 py-0.5 text-[0.65rem] text-muted-foreground">
            {label}
          </span>
        )}
        <span className="w-9" aria-hidden />
      </div>
      {children}
    </div>
  );
}
