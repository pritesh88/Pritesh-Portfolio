import { ArrowRight } from "lucide-react";
import { profile, stats } from "@/data/site";

export function Hero() {
  return (
    <section className="ambient relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="rise">
          <p className="label">Freelance software engineer · Pune, India</p>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            I build digital products
            <br className="hidden sm:block" /> that feel{" "}
            <span className="text-primary">simple.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View selected work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center rounded-full px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              Let&apos;s work together
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-semibold text-ink">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          <div className="hero-orb mx-auto aspect-square w-full max-w-[30rem]">
            <div className="size-full overflow-hidden rounded-full">
              <img
                src={profile.portrait}
                alt="Pritesh Lad, freelance software engineer based in Pune, India"
                width={960}
                height={1280}
                className="size-full object-cover object-[58%_18%]"
              />
            </div>
          </div>



          <div className="glass-strong float-soft absolute -bottom-6 left-0 rounded-2xl px-4 py-3 sm:-left-6">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for freelance work
            </p>
            <p className="mt-1 text-xs text-muted-foreground">India · Working globally</p>
          </div>

          <div className="glass float-soft absolute -left-2 top-10 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="label">Focus</p>
            <p className="mt-1 text-sm font-medium">Web · Software · AI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
