import { useEffect, useState, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
}

// Dark is the default. The saved choice is applied before paint by the inline script in __root.tsx.
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const commit = () => {
      apply(next);
      setTheme(next);
    };
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the choice simply lasts for this visit.
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return commit();

    // The new theme opens as a circle from the button.
    const r = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    document.startViewTransition(commit);
  };

  const icon = "absolute size-4 transition-all duration-500 ease-out";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-full border border-tint/10 bg-tint/[0.03] text-muted-foreground transition-colors duration-300 hover:border-cobalt/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Moon
        className={cn(
          icon,
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0 opacity-0",
        )}
      />
      <Sun
        className={cn(
          icon,
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}
