import { useEffect, type ReactNode } from "react";
import { AssistantLauncher } from "./AssistantLauncher";
import { Navbar } from "./Navbar";
import { Footer } from "./Sections";

export function PageShell({ children }: { children: ReactNode }) {
  // Feeds the pointer position to whichever .lift card is under it, for its moving highlight.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".lift");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative isolate min-h-screen">
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <AssistantLauncher />
    </div>
  );
}
