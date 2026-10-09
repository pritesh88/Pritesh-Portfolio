import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BrowserFrame } from "@/components/BrowserFrame";
import { PhoneFrame } from "@/components/PhoneFrame";
import { btnPrimary } from "@/components/Cta";
import { FinalCta } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return seo({
      title: `${project.name} — Case study · Growwise Studio`,
      description: project.summary,
      path: `/work/${project.slug}`,
    });
  },
  component: CaseStudy,
});

function Block({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="glass rounded-3xl p-6 sm:p-8">
      <p className="label">
        <span className="text-cobalt">{step}</span> · {title}
      </p>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </Reveal>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <PageShell>
      <div className="ambient px-4 pb-8 pt-28 sm:px-6 sm:pt-36">
        <article className="mx-auto max-w-5xl">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All case studies
          </Link>

          <header className="rise mt-8">
            <p className="label">
              {project.category} · {project.client}
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={btnPrimary}
                >
                  View live project
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground">
                  Live link available on request
                </span>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
                >
                  <Github className="size-4 text-cobalt" />
                  Source
                </a>
              )}
            </div>
          </header>

          <div className="relative mt-12">
            <div
              className="pointer-events-none absolute inset-x-[10%] inset-y-0 -z-10 rounded-full bg-[var(--halo)] blur-[100px]"
              aria-hidden
            />
            <BrowserFrame {...(project.liveUrl && { label: new URL(project.liveUrl).host })}>
              <img
                src={project.image}
                alt={`${project.name} interface preview`}
                width={1600}
                height={1000}
                className="w-full object-cover object-top"
              />
            </BrowserFrame>
            {project.mobileImage && (
              <PhoneFrame className="float-soft absolute -bottom-8 right-3 w-[24%] sm:-right-6 sm:w-[19%]">
                <img
                  src={project.mobileImage}
                  alt={`${project.name} on a phone`}
                  loading="lazy"
                  width={520}
                  height={1125}
                />
              </PhoneFrame>
            )}
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            <Block step="01" title="Business">
              <p>{project.business}</p>
            </Block>
            <Block step="02" title="Challenge">
              <p>{project.challenge}</p>
            </Block>
          </div>

          <div className="mt-4">
            <Block step="03" title="Approach">
              <p className="max-w-3xl">{project.approach}</p>
            </Block>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Block step="04" title="What we built">
              <ul className="space-y-3">
                {project.built.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-glass-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Block>
            <Block step="05" title="Outcome">
              <p className="font-display text-lg font-medium leading-snug text-ink">
                {project.outcome}
              </p>
              <p className="mt-6 text-sm">
                <span className="font-medium text-foreground">Our role:</span> {project.role}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Block>
          </div>

          <section className="mt-20">
            <h2 className="font-display text-2xl font-medium text-ink">More case studies</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="glass lift group flex items-center gap-4 rounded-2xl p-4"
                >
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={320}
                    height={200}
                    className="size-20 shrink-0 rounded-xl object-cover object-top"
                  />
                  <div className="min-w-0">
                    <p className="label">{p.category}</p>
                    <p className="mt-1 truncate font-display text-base font-medium text-ink">
                      {p.name}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-cobalt" />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
      <FinalCta title="Have a business that needs something like this?" />
    </PageShell>
  );
}
