import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { PlanLink } from "./Cta";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { nav, studio } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-3 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 sm:pl-6",
          scrolled || open
            ? "border-tint/10 bg-surface/70 shadow-[var(--shadow-glass)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-tint/[0.02] backdrop-blur-md",
        )}
      >
        <Link
          to="/"
          aria-label={`${studio.name}, home`}
          className="group flex min-w-0 items-center"
        >
          <Logo />
        </Link>

        <div className="ml-auto hidden items-center lg:flex">
          {nav.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:bg-tint/5 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <ThemeToggle />
          <PlanLink from="nav" className="hidden px-4 py-2 sm:inline-flex [&>svg]:hidden">
            Ask AI
          </PlanLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full border border-tint/10 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="glass-strong rise mx-auto mt-2 max-w-6xl rounded-3xl p-2 [animation-duration:0.35s] lg:hidden"
          onClick={() => setOpen(false)}
        >
          {nav.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="block rounded-2xl px-4 py-3.5 text-base text-foreground transition-colors hover:bg-tint/5"
            >
              {l.label}
            </Link>
          ))}
          <div className="grid gap-2 p-2 pt-3">
            <PlanLink from="mobile-menu">Ask AI</PlanLink>
            <Link
              to="/check"
              className="btn-ghost rounded-full px-6 py-3.5 text-center text-sm font-medium"
            >
              Check my website
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
