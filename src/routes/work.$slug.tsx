import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/site";

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
    const t = `${loaderData.project.name} — Case study · Pritesh Lad`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.project.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.project.summary },
      ],
    };
  },
  component: CaseStudy,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="glass rounded-3xl p-6 sm:p-8">
      <p className="label">{title}</p>
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
    <div className="min-h-screen">
      <Navbar />
      <main className="ambient px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        <article className="mx-auto max-w-5xl">
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <header className="mt-8 rise">
            <p className="label">{project.category}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
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
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
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
                  <Github className="size-4 text-primary" />
                  Source
                </a>
              )}
            </div>
          </header>

          <div className="glass mt-12 overflow-hidden rounded-3xl p-2">
            <img
              src={project.image}
              alt={`${project.name} interface preview`}
              width={1600}
              height={1000}
              className="w-full rounded-2xl object-cover object-top"
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Block title="Overview">
              <p>{project.overview}</p>
            </Block>
            <Block title="Problem">
              <p>{project.problem}</p>
            </Block>
            <Block title="My role">
              <p>{project.role}</p>
            </Block>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Block title="What I built">
              <ul className="space-y-3">
                {project.built.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Key features">
              <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Block title="Technology">
              <div className="flex flex-wrap gap-2">
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
            <Block title="Outcome">
              <p>{project.outcome}</p>
            </Block>
          </div>

          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold text-ink">Next projects</h2>
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
                    alt={p.name}
                    loading="lazy"
                    width={320}
                    height={200}
                    className="size-20 shrink-0 rounded-xl object-cover object-top"
                  />
                  <div className="min-w-0">
                    <p className="label">{p.category}</p>
                    <p className="mt-1 truncate font-display text-base font-semibold text-ink">
                      {p.name}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
