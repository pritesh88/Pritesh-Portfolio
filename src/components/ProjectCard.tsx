import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className={cn(
        "glass lift group flex flex-col overflow-hidden rounded-3xl",
        wide && "lg:col-span-2",
      )}
    >
      <div className="relative overflow-hidden border-b border-glass-border">
        <img
          src={project.image}
          alt={`${project.name} — ${project.summary}`}
          loading="lazy"
          width={1600}
          height={1000}
          className={cn(
            "w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]",
            wide ? "aspect-[16/9]" : "aspect-[4/3]",
          )}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="label">{project.category}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
              {project.name}
            </h3>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-glass-border px-2.5 py-1 text-[0.7rem] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
