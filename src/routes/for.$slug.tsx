import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CallLink, PlanLink } from "@/components/Cta";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { businessTypes, projects } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/for/$slug")({
  loader: ({ params }) => {
    const type = businessTypes.find((b) => b.slug === params.slug);
    if (!type) throw notFound();
    return { type };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    }
    const { type } = loaderData;
    return seo({
      title: `${type.name} website development in Pune · Growwise Studio`,
      description: type.problem,
      path: `/for/${type.slug}`,
    });
  },
  component: BusinessTypePage,
});

function BusinessTypePage() {
  const { type } = Route.useLoaderData();
  const others = businessTypes.filter((b) => b.slug !== type.slug);

  return (
    <PageShell>
      <div className="ambient px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            hash="business-types"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All business types
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <header className="rise max-w-3xl">
              <p className="label">Websites for · {type.name}</p>
              <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
                {type.problem}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {type.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PlanLink business={type.plannerId} from={`for-${type.slug}`} />
                <CallLink from={`for-${type.slug}`} />
              </div>
            </header>
            <div
              className="rise relative overflow-hidden rounded-3xl border border-tint/10 shadow-[var(--shadow-frame)]"
              style={{ animationDelay: "160ms" }}
            >
              <img
                src={type.photo}
                alt=""
                width={960}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            <Reveal className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="label">What the website should do</h2>
              <ul className="mt-5 space-y-3.5">
                {type.shouldDo.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-base text-foreground">
                    <Check className="mt-1 size-4 shrink-0 text-cobalt" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="label">What we typically build</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {type.typicalBuild.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-cobalt/40 bg-primary/30 px-3.5 py-2 text-sm text-ink"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                What you actually need depends on your business. Plan My Website gives you a
                recommended starting point and a typical investment in under a minute.
              </p>
            </Reveal>
          </div>

          <section className="mt-20">
            <h2 className="font-display text-2xl font-medium text-ink">Recent work</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>

          <section className="mt-20">
            <h2 className="label">Other business types</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((b) => (
                <li key={b.slug}>
                  <Link
                    to="/for/$slug"
                    params={{ slug: b.slug }}
                    className="inline-block rounded-full border border-glass-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-cobalt/40 hover:text-foreground"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
