import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="lift group relative block overflow-hidden rounded-3xl border border-tint/10 bg-card"
    >
      <div className="flex items-center gap-1.5 border-b border-tint/8 px-4 py-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-tint/15" />
        ))}
        <span className="ml-3 truncate text-[0.65rem] text-muted-foreground">{project.client}</span>
      </div>

      <div className={cn("overflow-hidden", wide ? "aspect-[16/9]" : "aspect-[4/3]")}>
        <img
          src={project.image}
          alt={`${project.name} — ${project.summary}`}
          loading="lazy"
          width={1600}
          height={1000}
          className="size-full object-cover object-left-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      {/* Glass caption over the lower edge of the screenshot */}
      <div className="border-t border-tint/10 bg-surface/90 p-5 backdrop-blur-xl transition-colors duration-500 group-hover:border-cobalt/40 sm:absolute sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:border sm:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="label">{project.category}</p>
            <h3
              className={cn(
                "mt-2 font-display font-medium text-ink",
                wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
              )}
            >
              {project.name}
            </h3>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-tint/10 bg-tint/5 text-muted-foreground transition-all duration-500 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <p className="mt-3 grid grid-rows-[0fr] text-sm font-medium text-cobalt opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 max-sm:grid-rows-[1fr] max-sm:opacity-100">
          <span className="overflow-hidden">View case study</span>
        </p>
      </div>
    </Link>
  );
}
