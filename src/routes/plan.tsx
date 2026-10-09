import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Planner } from "@/components/Planner";
import { seo } from "@/lib/seo";

type PlanSearch = { need?: string; business?: string; site?: string };

const str = (v: unknown) => (typeof v === "string" && v.length < 300 ? v : undefined);

export const Route = createFileRoute("/plan")({
  validateSearch: (s: Record<string, unknown>): PlanSearch => {
    const need = str(s["need"]);
    const business = str(s["business"]);
    const site = str(s["site"]);
    return { ...(need && { need }), ...(business && { business }), ...(site && { site }) };
  },
  head: () =>
    seo({
      title: "Plan My Website — a recommendation in under a minute · Growwise Studio",
      description:
        "Answer six quick questions and get a recommended starting point for your business website, with what it should include, typical investment and timeline. No account needed.",
      path: "/plan",
    }),
  component: PlanPage,
});

function PlanPage() {
  const search = Route.useSearch();

  return (
    <PageShell>
      <section className="ambient px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <header className="rise mb-8 max-w-2xl">
            <p className="label">Plan My Website</p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
              Plan your website with Pito.
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Six quick questions, mostly taps, about 30–45 seconds. No account, no password.
            </p>
          </header>
          <Planner initial={search} />
        </div>
      </section>
    </PageShell>
  );
}
