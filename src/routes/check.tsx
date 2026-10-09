import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { GrowthCheck } from "@/components/GrowthCheck";
import { seo } from "@/lib/seo";

type CheckSearch = { url?: string };

export const Route = createFileRoute("/check")({
  validateSearch: (s: Record<string, unknown>): CheckSearch => {
    const url = s["url"];
    return typeof url === "string" && url.length < 300 ? { url } : {};
  },
  head: () =>
    seo({
      title: "Quick Growth Check — is your website losing customers? · Growwise Studio",
      description:
        "Enter your website address for a quick, honest check of the basics: mobile setup, clarity, calls to action, contact options, structure, performance and local visibility.",
      path: "/check",
    }),
  component: CheckPage,
});

function CheckPage() {
  const { url } = Route.useSearch();

  return (
    <PageShell>
      <section className="ambient px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          <header className="rise mb-8 max-w-2xl">
            <p className="label">Quick Growth Check</p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
              Your website might look fine and still lose customers.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Enter your address and we&apos;ll read the page for a handful of basics that affect
              whether visitors find you, understand you and get in touch. It takes a few seconds and
              reports only what it can actually see.
            </p>
          </header>
          <GrowthCheck {...(url && { initialUrl: url })} />
        </div>
      </section>
    </PageShell>
  );
}
