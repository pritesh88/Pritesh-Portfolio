import { useId } from "react";
import { studio } from "@/data/site";
import { cn } from "@/lib/utils";

// The sprout mark. Keep in step with public/favicon.svg.
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.55" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id})`} />
      <path d="M32 53V35" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 37C32 23 40 14 53 13C54 27 46 37 32 37Z" fill="#fff" />
      <path d="M32 45C32 36 26 29 14 28C13 38 20 45 32 45Z" fill="#fff" fillOpacity="0.82" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <LogoMark className="size-8 drop-shadow-[0_4px_14px_rgb(45_212_191/0.45)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
      <span className="truncate font-brand text-xl font-semibold leading-none tracking-tight text-ink sm:text-[1.4rem]">
        {studio.brand}
        <span className="ml-1.5 font-normal text-muted-foreground">{studio.brandSuffix}</span>
      </span>
    </span>
  );
}
