import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Briefcase,
  Building2,
  Check,
  Code2,
  Factory,
  Github,
  LayoutDashboard,
  Linkedin,
  Mail,
  Map,
  MessageCircle,
  PenTool,
  RefreshCw,
  Rocket,
  Search,
  ShoppingBag,
  Stethoscope,
  Store,
  TrendingUp,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import founderImg from "@/assets/pritesh-founder.webp";
import planningImg from "@/assets/stock/planning.webp";
import serviceWebsitesImg from "@/assets/stock/service-websites.webp";
import serviceRedesignImg from "@/assets/stock/service-redesign.webp";
import serviceEcommerceImg from "@/assets/stock/service-ecommerce.webp";
import serviceRestaurantImg from "@/assets/stock/service-restaurant.webp";
import serviceWebappImg from "@/assets/stock/service-webapp.webp";
import serviceGrowthImg from "@/assets/stock/service-growth.webp";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { ProjectCard } from "./ProjectCard";
import { btnPrimary, CallLink, CheckLink, PlanLink } from "./Cta";
import {
  achievement,
  businessTypes,
  clientNames,
  considerations,
  faqs,
  founder,
  founderSkills,
  growthPlans,
  nav,
  ourFlow,
  process,
  projects,
  proof,
  redesignAreas,
  services,
  stack,
  studio,
  testimonials,
  tiers,
  traditionalFlow,
  whatsappLink,
} from "@/data/site";
import { resources } from "@/data/resources";
import { needOptions } from "@/lib/planner";
import { cn } from "@/lib/utils";

const sectionClass = "scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28";

export function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-16">
      <p className="label flex items-center gap-3">
        <span className="h-px w-8 bg-cobalt/60" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-[1.08] text-ink sm:text-5xl">
        {title}
      </h2>
      {note && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {note}
        </p>
      )}
    </Reveal>
  );
}

function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm text-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Proof ---------- */

export function ProofStrip() {
  // Doubled so the marquee can loop seamlessly; the second copy is hidden from assistive tech.
  const names = [...clientNames, ...clientNames, ...clientNames, ...clientNames];
  return (
    <section aria-label="At a glance" className="px-4 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {proof.slice(0, 4).map((p, i) => (
            <Reveal key={p.label} delay={i * 80} className="border-l border-tint/10 pl-5">
              <dt className="bg-gradient-to-b from-ink to-cobalt bg-clip-text font-display text-4xl font-medium tracking-tight text-transparent sm:text-5xl">
                {p.value}
              </dt>
              <dd className="mt-3 text-sm leading-snug text-muted-foreground">{p.label}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-14 sm:mt-20">
          <p className="label text-center">Real client work, including</p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <ul className="marquee flex w-max items-center">
              {names.map((n, i) => (
                <li
                  key={i}
                  aria-hidden={i >= clientNames.length}
                  className="flex items-center whitespace-nowrap font-display text-xl font-medium tracking-tight text-foreground/55 sm:text-2xl"
                >
                  <span className="px-7 sm:px-10">{n}</span>
                  <span className="size-1 rounded-full bg-cobalt/70" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {proof.slice(4).map((p) => (
            <span
              key={p.label}
              className="rounded-full border border-tint/10 bg-tint/[0.03] px-4 py-2 text-xs text-muted-foreground"
            >
              <span className="text-foreground">{p.value}</span> · {p.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Differentiation ---------- */

function Flow({ steps, active }: { steps: string[]; active?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
      {steps.map((s, i) => (
        <Fragment key={s}>
          <li
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm",
              active
                ? "border-cobalt/40 bg-primary/30 font-medium text-ink"
                : "border-glass-border text-muted-foreground",
            )}
          >
            {s}
          </li>
          {i < steps.length - 1 && (
            <li aria-hidden className="text-muted-foreground/60">
              <ArrowRight className="size-3.5" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className={cn(sectionClass, "band")}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Why us"
          title="We don't start with pages. We start with the business."
          note="Before we talk about design or features, we work out what the website has to do for you. That decides everything that follows."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Reveal className="glass overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="relative -mx-6 -mt-6 mb-7 aspect-[16/7] overflow-hidden sm:-mx-8 sm:-mt-8">
              <img
                src={planningImg}
                alt=""
                loading="lazy"
                width={960}
                height={600}
                className="size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-primary/30"
                aria-hidden
              />
            </div>
            <p className="label">What we look at first</p>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {considerations.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="glass rounded-3xl p-6 sm:p-8">
            <p className="label">The usual way</p>
            <div className="mt-4">
              <Flow steps={traditionalFlow} />
            </div>
            <p className="label mt-8">Our approach</p>
            <div className="mt-4">
              <Flow steps={ourFlow} active />
            </div>
            <p className="mt-8 border-t border-glass-border pt-6 font-display text-lg font-medium leading-snug text-ink">
              A website is not the destination. It&apos;s infrastructure for growth.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const serviceIcons: LucideIcon[] = [
  Building2,
  RefreshCw,
  ShoppingBag,
  UtensilsCrossed,
  LayoutDashboard,
  TrendingUp,
];

// Bento layout: column spans per card, each with a stock photo for the service.
// Wide cards carry the image down the right side; narrow ones along the bottom.
const serviceLayout: { span: string; wide: boolean; image: string }[] = [
  { span: "lg:col-span-4", wide: true, image: serviceWebsitesImg },
  { span: "lg:col-span-2", wide: false, image: serviceRedesignImg },
  { span: "lg:col-span-3", wide: true, image: serviceEcommerceImg },
  { span: "lg:col-span-3", wide: true, image: serviceRestaurantImg },
  { span: "lg:col-span-4", wide: true, image: serviceWebappImg },
  { span: "lg:col-span-2", wide: false, image: serviceGrowthImg },
];

export function Services() {
  return (
    <section id="services" className={cn(sectionClass, "ambient")}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Services"
          title="What we build, and what it's for."
          note="Six kinds of work, each planned around what your customers need to do."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length]!;
            const layout = serviceLayout[i % serviceLayout.length]!;
            const linkClass =
              "relative z-10 mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground";
            return (
              <Reveal
                key={s.title}
                delay={(i % 3) * 90}
                className={cn(
                  "glass lift group relative flex min-h-[17rem] flex-col overflow-hidden rounded-3xl p-6 sm:p-8 lg:min-h-[21rem]",
                  !layout.wide && "lg:pb-52",
                  layout.span,
                )}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-tint/10 bg-tint/5 text-cobalt transition-all duration-500 group-hover:border-tint/20 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-display text-sm tracking-[0.2em] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={cn("relative z-10", layout.wide && "lg:max-w-[48%]")}>
                  <h3 className="mt-7 font-display text-2xl font-medium text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                {s.need ? (
                  <Link to="/plan" search={{ need: s.need }} className={linkClass}>
                    Plan this
                    <ArrowRight className="size-4 text-cobalt transition-transform duration-500 group-hover:translate-x-1.5" />
                  </Link>
                ) : (
                  <Link to="/" hash="growth-plans" className={linkClass}>
                    See monthly plans
                    <ArrowRight className="size-4 text-cobalt transition-transform duration-500 group-hover:translate-x-1.5" />
                  </Link>
                )}
                <img
                  src={layout.image}
                  alt=""
                  loading="lazy"
                  width={1100}
                  height={760}
                  className={cn(
                    "pointer-events-none mt-6 h-44 w-full rounded-2xl object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05] lg:absolute lg:mt-0",
                    layout.wide
                      ? "lg:inset-y-0 lg:right-0 lg:h-full lg:rounded-none lg:w-[54%] lg:[mask-image:linear-gradient(to_right,transparent,black_42%)]"
                      : "lg:inset-x-4 lg:bottom-4 lg:h-44 lg:w-auto",
                  )}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Business types ---------- */

const businessIcons: Record<string, LucideIcon> = {
  "local-business": Store,
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  "professional-service": Briefcase,
  manufacturer: Factory,
  "e-commerce": ShoppingBag,
  startup: Rocket,
  hospitality: BedDouble,
};

export function BusinessTypes() {
  return (
    <section id="business-types" className={cn(sectionClass, "band")}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Built around your business"
          title="Different businesses need different websites."
          note="The right website depends on how your customers find you and what they need before they get in touch."
        />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-glass-border bg-glass-border sm:grid-cols-2 lg:grid-cols-4">
          {businessTypes.map((b) => {
            const Icon = businessIcons[b.slug] ?? Building2;
            return (
              <Link
                key={b.slug}
                to="/for/$slug"
                params={{ slug: b.slug }}
                className="step-card group flex flex-col bg-card/80 p-6"
              >
                <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden">
                  <img
                    src={b.photo}
                    alt=""
                    loading="lazy"
                    width={960}
                    height={600}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-primary/25"
                    aria-hidden
                  />
                  <span className="step-icon absolute bottom-3 left-6 grid size-10 place-items-center rounded-xl border border-glass-border bg-card/80 text-cobalt backdrop-blur-md">
                    <Icon className="size-5" />
                  </span>
                </div>
                <h3 className="font-display text-base font-medium text-ink">{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.problem}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-medium text-foreground">
                  What it should do
                  <ArrowRight className="size-3.5 text-cobalt transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */

export function Work() {
  return (
    <section id="work" className={sectionClass}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Case studies"
          title="Real work for real businesses."
          note="Websites and platforms for a publishing body, a research journal, a food manufacturer, an insurance advisor, a jewellery brand and a college placement cell."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => {
            // The lead project runs full width; so does the last one when it would otherwise sit alone.
            const wide = i === 0 || (projects.length % 2 === 0 && i === projects.length - 1);
            return (
              <Reveal key={p.slug} delay={(i % 2) * 80} className={wide ? "lg:col-span-2" : ""}>
                <ProjectCard project={p} wide={wide} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Planner teaser ---------- */

export function PlannerTeaser() {
  return (
    <section id="plan" className={cn(sectionClass, "ambient")}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="glass-strong rounded-[2rem] p-6 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="label">Plan My Website</p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                Not sure what you need? Find out in under a minute.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Six quick questions, mostly taps. You get a recommended starting point, what it
                should include, and a typical investment and timeline.
              </p>
              <CheckList
                className="mt-6"
                items={[
                  "No account or password",
                  "About 30–45 seconds",
                  "A recommendation, not a sales pitch",
                ]}
              />
            </div>

            <div>
              <p className="font-display text-lg font-medium text-ink">What do you need?</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {needOptions.map((o) => (
                  <Link
                    key={o.id}
                    to="/plan"
                    search={{ need: o.id }}
                    className="choice group flex items-center justify-between gap-3 rounded-2xl px-5 py-4"
                  >
                    <span>
                      <span className="block text-sm font-medium text-ink">{o.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-cobalt" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Redesign + Growth Check ---------- */

export function Redesign() {
  return (
    <section id="redesign" className={cn(sectionClass, "band")}>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="label">Website redesign</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            You don&apos;t always need a new website. You might need a better one.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            If the foundation is sound, we improve what&apos;s there instead of starting again.
            It&apos;s usually quicker, and it keeps what already works.
          </p>
          <ul className="mt-7 flex max-w-xl flex-wrap gap-2">
            {redesignAreas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-glass-border px-3.5 py-2 text-xs text-muted-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CheckLink from="redesign">Show me what could improve</CheckLink>
          </div>
        </Reveal>

        <Reveal delay={80} className="glass-strong self-start rounded-3xl p-6 sm:p-8">
          <p className="label">Quick Growth Check</p>
          <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-ink">
            Your website might look fine and still lose customers.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Enter your address and we&apos;ll check the basics: mobile setup, clarity, calls to
            action, contact options, structure, performance and local visibility.
          </p>
          {/* Plain GET form: works without JavaScript and lands on /check?url=... */}
          <form action="/check" method="get" className="mt-6 grid gap-3">
            <label htmlFor="home-check-url" className="sr-only">
              Your website address
            </label>
            <input
              id="home-check-url"
              name="url"
              required
              inputMode="url"
              autoCapitalize="none"
              placeholder="yourbusiness.com"
              className="w-full rounded-full border border-input bg-card/70 px-5 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-cobalt"
            />
            <button type="submit" className={btnPrimary}>
              Check my website
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            A quick, honest check of what can be read from your page. It isn&apos;t a full audit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const processIcons: LucideIcon[] = [Search, Map, PenTool, Code2, Rocket, TrendingUp];

export function Process() {
  return (
    <section id="how-we-work" className={sectionClass}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="How we work"
          title="Six steps, and you always know which one you're in."
        />

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-glass-border bg-glass-border sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => {
            const Icon = processIcons[i % processIcons.length]!;
            return (
              <Reveal
                key={p.no}
                as="li"
                delay={(i % 3) * 60}
                className="glass step-card group rounded-none p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="step-icon grid size-10 shrink-0 place-items-center rounded-xl border border-glass-border bg-secondary/60 text-cobalt">
                    <Icon className="size-5" />
                  </span>
                  <p className="step-no font-display text-xs tracking-[0.2em] text-cobalt">
                    {p.no}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

export function Pricing() {
  return (
    <section id="pricing" className={cn(sectionClass, "sm:px-4")}>
      <div className="mesh mesh-cool mx-auto max-w-7xl rounded-[2.5rem] px-4 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="Pricing"
            title="Three project levels, based on what the website needs to do."
            note="These are typical investment ranges, not fixed packages. The final scope depends on your requirements."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 70}
                className={cn(
                  "lift relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
                  t.recommended
                    ? "glass-strong glow-border border-cobalt/50 shadow-[var(--shadow-lift)] lg:-my-4 lg:py-12"
                    : "glass",
                )}
              >
                {t.recommended && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(70%_100%_at_50%_0%,var(--glow-strong),transparent)]"
                  />
                )}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-medium text-ink">{t.name}</h3>
                  {t.recommended && (
                    <span className="rounded-full border border-tint/15 bg-tint/10 px-3 py-1 text-[0.7rem] font-medium text-foreground backdrop-blur">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="label mt-6">Typical investment</p>
                <p className="mt-2 font-display text-4xl font-medium tracking-tight text-ink">
                  {t.investment}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.forWho}</p>

                <div className="mt-6 border-t border-glass-border pt-6">
                  {t.includesFrom && (
                    <p className="mb-3 text-sm font-medium text-foreground">{t.includesFrom}</p>
                  )}
                  <CheckList items={t.items} />
                </div>
                <p className="mt-auto pt-6 text-xs text-muted-foreground">
                  Typical timeline: {t.timeline}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="glass mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="font-display text-lg font-medium text-ink">
                Not sure which level fits?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Answer six quick questions and we&apos;ll recommend one, with reasons.
              </p>
            </div>
            <PlanLink from="pricing" className="shrink-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function GrowthPlans() {
  return (
    <section id="growth-plans" className={cn(sectionClass, "pt-0 sm:px-4 sm:pt-0")}>
      <div className="mesh mesh-warm mx-auto max-w-7xl rounded-[2.5rem] px-4 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="After launch"
            title="Keep improving after launch."
            note="A website earns more when someone keeps looking after it. Monthly plans with a defined scope, so you know what you're getting."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {growthPlans.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 70}
                className="glass flex flex-col rounded-3xl p-6 sm:p-8"
              >
                <h3 className="font-display text-xl font-medium text-ink">{p.name}</h3>
                <p className="mt-4 font-display text-2xl font-medium text-ink">
                  {p.price}
                  <span className="text-sm font-normal text-muted-foreground"> / month</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.forWho}</p>
                <div className="mt-6 border-t border-glass-border pt-6">
                  {p.includesFrom && (
                    <p className="mb-3 text-sm font-medium text-foreground">{p.includesFrom}</p>
                  )}
                  <CheckList items={p.items} />
                </div>
                <p className="mt-auto pt-6 text-xs text-muted-foreground">{p.scope}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5">
            <p className="text-sm text-muted-foreground">
              Work beyond a plan&apos;s monthly scope is quoted separately, before it starts.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust ---------- */

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className={sectionClass}>
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Client words" title="What clients say." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 70} className="glass rounded-3xl p-6 sm:p-8">
              <figure>
                <blockquote className="text-base leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section id="founder" className={cn(sectionClass, "band")}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="glass grid gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="flex items-center gap-4 lg:block">
            <img
              src={founderImg}
              alt="Pritesh Lad, founder of Growwise Studio"
              loading="lazy"
              width={640}
              height={800}
              className="h-24 w-20 rounded-2xl border border-glass-border object-cover object-top lg:h-56 lg:w-44"
            />
            <div className="lg:mt-4">
              <p className="font-display text-base font-medium text-ink">{founder.name}</p>
              <p className="text-sm text-muted-foreground">{founder.role}</p>
              <div className="mt-3 flex gap-2">
                {[
                  { href: studio.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: studio.github, Icon: Github, label: "GitHub" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid size-8 place-items-center rounded-full border border-glass-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="label">Who you work with</p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
              Built by a developer who understands the whole system.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              You work directly with the person planning and building your project. Pritesh has 2+
              years of professional software development experience and handles the full stack, so
              nothing gets lost between a designer, a developer and a hosting company.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {founderSkills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-cobalt/40 bg-primary/30 px-3.5 py-1.5 text-xs font-medium text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Also the author of{" "}
              <a
                href={achievement.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-foreground underline underline-offset-4"
              >
                {achievement.title}
              </a>
              , a {achievement.subtitle}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Resources ---------- */

export function Resources() {
  return (
    <section id="resources" className={sectionClass}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Resources"
          title="Resources for business owners."
          note="Short, practical reads on what a website should do for a business, written without jargon."
        />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-glass-border bg-glass-border md:grid-cols-2">
          {resources.map((r) => (
            <Link
              key={r.slug}
              to="/resources/$slug"
              params={{ slug: r.slug }}
              className="step-card group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 bg-card/80 p-6"
            >
              <div>
                <h3 className="font-display text-base font-medium leading-snug text-ink">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                <p className="label mt-3">{r.minutes} min read</p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function Faq() {
  return (
    <section id="faq" className={cn(sectionClass, "band")}>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHead
          eyebrow="FAQ"
          title="Questions we're asked most."
          note="Straight answers. If yours isn't here, ask us on WhatsApp."
        />
        <Reveal className="divide-y divide-glass-border overflow-hidden rounded-3xl border border-glass-border bg-card/70">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-full border border-glass-border text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

const contactLinks = [
  {
    label: "WhatsApp",
    value: studio.phone,
    href: studio.whatsapp,
    Icon: MessageCircle,
    tile: "tile-chat",
  },
  {
    label: "Email",
    value: studio.email,
    href: `mailto:${studio.email}`,
    Icon: Mail,
    tile: "tile-mail",
  },
  {
    label: "LinkedIn",
    value: "pritesh-lad",
    href: studio.linkedin,
    Icon: Linkedin,
    tile: "tile-link",
  },
];

export function FinalCta({
  title = "Let's figure out what your business actually needs.",
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <section id="contact" className={cn(sectionClass, "ambient-center sm:py-32")}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="glass-strong glow-border relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-[var(--halo)] blur-[90px]"
          />
          <p className="label">Start here</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {children ?? (
              <>
                You don&apos;t need to know the technology, pages or features. Tell us what your
                business does, what&apos;s not working today and what you&apos;d like the website to
                achieve. We&apos;ll help you figure out the right approach.
              </>
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PlanLink from="final-cta" />
            <CallLink from="final-cta" />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {contactLinks.map(({ label, value, href, Icon, tile }) => (
              <div key={label} className={`contact-tile glass ${tile} rounded-2xl`}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="block p-5"
                >
                  <Icon className="size-4 text-cobalt transition-transform" />
                  <p className="label mt-4">{label}</p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{value}</p>
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-6 flex flex-col items-start justify-between gap-3 px-2 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Know a business that needs a better website?
            </span>{" "}
            Introduce us. If they become a client, we&apos;ll thank you with a referral reward.
          </p>
          <a
            href={whatsappLink(
              "Hi Pritesh, I'd like to refer a business that needs a better website.",
            )}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Refer a business
            <ArrowUpRight className="size-4 text-cobalt" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="border-t border-glass-border px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Based in Pune. Working with businesses beyond Pune.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { href: studio.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
              { href: `mailto:${studio.email}`, Icon: Mail, label: "Email" },
              { href: studio.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: studio.github, Icon: Github, label: "GitHub" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-9 place-items-center rounded-full border border-glass-border text-muted-foreground transition-colors hover:border-cobalt/40 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="label">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.hash}>
                <Link
                  to="/"
                  hash={l.hash}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label">Start</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/plan"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Plan my website
              </Link>
            </li>
            <li>
              <Link
                to="/check"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Check my website
              </Link>
            </li>
            <li>
              <Link
                to="/"
                hash="growth-plans"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Monthly growth plans
              </Link>
            </li>
            <li>
              <Link
                to="/"
                hash="faq"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} {studio.name}
      </p>
    </footer>
  );
}
