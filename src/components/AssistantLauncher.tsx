import { Link, useRouterState } from "@tanstack/react-router";
import assistantImg from "@/assets/pito.webp";
import { assistantName } from "./Planner";
import { track } from "@/lib/analytics";

// Floating shortcut to the planner chat, on every page except the planner itself.
export function AssistantLauncher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/plan")) return null;

  return (
    <Link
      to="/plan"
      onClick={() => track("cta_plan", { from: "assistant-launcher" })}
      aria-label={`Ask ${assistantName}, the AI planner`}
      className="glass-strong group fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full p-1.5 transition-transform duration-500 hover:-translate-y-1 sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <span className="relative">
        <img
          src={assistantImg}
          alt=""
          width={400}
          height={400}
          className="size-16 rounded-full border border-glass-border bg-white object-cover"
        />
        <span
          className="absolute bottom-0.5 right-0.5 size-3.5 rounded-full border-2 border-card bg-emerald-400"
          aria-hidden
        />
      </span>
      <span className="hidden text-left sm:block">
        <span className="block font-display text-base font-medium leading-tight text-ink">
          {assistantName}
        </span>
        <span className="block text-xs text-muted-foreground">Ask AI</span>
      </span>
    </Link>
  );
}
