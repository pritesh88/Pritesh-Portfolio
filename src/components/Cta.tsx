import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { callLink } from "@/data/site";

export const btnPrimary =
  "btn-cobalt group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
export const btnSecondary =
  "btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

type Variant = "primary" | "secondary";
const variants: Record<Variant, string> = { primary: btnPrimary, secondary: btnSecondary };

export function PlanLink({
  children = "Plan my website",
  need,
  business,
  site,
  variant = "primary",
  from,
  className,
}: {
  children?: ReactNode;
  need?: string;
  business?: string;
  site?: string;
  variant?: Variant;
  from: string;
  className?: string;
}) {
  return (
    <Link
      to="/plan"
      search={{ ...(need && { need }), ...(business && { business }), ...(site && { site }) }}
      onClick={() => track("cta_plan", { from })}
      className={cn(variants[variant], className)}
    >
      {children}
      {variant === "primary" && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function CheckLink({
  children = "Check my website",
  variant = "primary",
  from,
  className,
}: {
  children?: ReactNode;
  variant?: Variant;
  from: string;
  className?: string;
}) {
  return (
    <Link
      to="/check"
      onClick={() => track("cta_check", { from })}
      className={cn(variants[variant], className)}
    >
      {children}
      {variant === "primary" && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function CallLink({
  children = "Book a 15-minute call",
  from,
  className,
}: {
  children?: ReactNode;
  from: string;
  className?: string;
}) {
  return (
    <a
      href={callLink}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track("cta_call", { from })}
      className={cn(btnSecondary, className)}
    >
      {children}
    </a>
  );
}
