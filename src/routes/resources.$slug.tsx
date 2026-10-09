import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CheckLink, PlanLink } from "@/components/Cta";
import { resources } from "@/data/resources";
import { studio } from "@/data/site";
import { jsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((r) => r.slug === params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { resource } = loaderData;
    return {
      ...seo({
        title: `${resource.title} · Growwise Studio`,
        description: resource.summary,
        path: `/resources/${resource.slug}`,
      }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: resource.title,
          description: resource.summary,
          author: { "@type": "Organization", name: studio.name, url: studio.url },
        }),
      ],
    };
  },
  component: ResourcePage,
});

function ResourcePage() {
  const { resource } = Route.useLoaderData();
  const more = resources.filter((r) => r.slug !== resource.slug).slice(0, 3);

  return (
    <PageShell>
      <div className="ambient px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <article className="mx-auto max-w-2xl">
          <Link
            to="/"
            hash="resources"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All resources
          </Link>

          <header className="rise mt-8">
            <p className="label">For business owners · {resource.minutes} min read</p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
              {resource.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground">{resource.intro}</p>
          </header>

          <div className="mt-10 space-y-10">
            {resource.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
                  {s.heading}
                </h2>
                {s.body && (
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.body}</p>
                )}
                {s.points && (
                  <ul className="mt-4 space-y-3">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="glass-strong mt-14 rounded-3xl p-6 sm:p-8">
            {resource.cta === "check" ? (
              <>
                <h2 className="font-display text-xl font-medium text-ink">
                  See how your own website does.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The Quick Growth Check reads your page for the basics in a few seconds.
                </p>
                <CheckLink from="resource" className="mt-5" />
              </>
            ) : (
              <>
                <h2 className="font-display text-xl font-medium text-ink">
                  Find out what your business needs.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Six quick questions, and you get a recommended starting point with a typical
                  investment.
                </p>
                <PlanLink from="resource" className="mt-5" />
              </>
            )}
          </aside>

          <section className="mt-14">
            <h2 className="label">Keep reading</h2>
            <ul className="mt-4 divide-y divide-glass-border border-y border-glass-border">
              {more.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/resources/$slug"
                    params={{ slug: r.slug }}
                    className="group flex items-center justify-between gap-4 py-4 text-base font-medium text-ink"
                  >
                    {r.title}
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-cobalt" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
