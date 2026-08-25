import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  MessagesSquare,
  FolderOpen,
  PenTool,
  Code2,
  Eye,
  Globe,
  Rocket,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import avatarImg from "@/assets/pritesh-avatar.jpg";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import {
  achievement,
  capabilities,
  process,
  profile,
  projects,
  services,
  toolkit,
  values,
} from "@/data/site";

function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-14">
      <p className="label">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {note && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{note}</p>}
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Selected work"
          title="Products, platforms and websites shipped for real clients."
          note="Six builds across research publishing, food manufacturing, jewellery retail, insurance advisory and campus placements."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => {
            const wide = Boolean(p.featured) && i % 3 === 0;
            return (
              <Reveal
                key={p.slug}
                as="div"
                delay={(i % 2) * 80}
                className={wide ? "lg:col-span-2" : ""}
              >
                <ProjectCard project={p} wide={wide} />
              </Reveal>
            );
          })}

        </div>

        <Reveal className="mt-6">
          <div className="glass grid gap-6 overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="label">Achievement</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                {achievement.title}
              </h3>
              <p className="mt-1 text-sm text-primary">{achievement.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {achievement.description}
              </p>
              <a
                href={achievement.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                View the theme
                <ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <img
              src={achievement.image}
              alt="KatanaX theme listing on the Visual Studio Marketplace"
              loading="lazy"
              width={1600}
              height={900}
              className="w-full rounded-2xl border border-glass-border object-cover object-top"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="ambient scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="About" title="Software engineer. Freelancer. Builder." />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="glass glass-hover rounded-3xl p-6 sm:p-9">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Hey I&apos;m Pritesh💚, a freelance web developer and software engineer from Pune, India. I
                specialise in portfolio websites, business websites and landing pages for founders,
                professionals and small businesses.
              </p>
              <p>
                With 2+ years of professional software development experience, I bring
                enterprise-level quality to every freelance project — across React, Node.js,
                Next.js, Python and modern web technologies.
              </p>
              <p>
                I&apos;ve built 15+ websites for businesses and professionals across India. A
                stunning portfolio, a business website or a custom web application — delivered as a
                premium result at an honest price.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { k: "Based in", v: "Pune, India " },
              { k: "Focus", v: "Web · Software · AI" },
              { k: "Working style", v: "Freelance · Remote" },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 70} className="glass glass-hover rounded-2xl p-5">
                <p className="label">{c.k}</p>
                <p className="mt-2 font-display text-lg font-medium text-ink">{c.v}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 70} className="glass glass-hover rounded-2xl p-6">
              <h3 className="font-display text-base font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const serviceTints = ["tint-sky", "tint-violet", "tint-pink", "tint-green"];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Services"
          title="Four capabilities, end to end."
          note="From the first conversation to a live, maintained website."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 70}
              className={`tint-card ${serviceTints[i % serviceTints.length]} rounded-3xl p-6 sm:p-7`}
            >
              <p className="font-display text-sm font-semibold text-ink/70">{s.no}</p>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-glass-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const processIcons: LucideIcon[] = [MessagesSquare, FolderOpen, PenTool, Code2, Eye, Globe, Rocket, LifeBuoy];

export function Process() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="How I work"
          title="A transparent eight-step path from idea to launch."
          note="You always know what happens next."
        />

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-glass-border bg-glass-border sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal
              key={p.no}
              as="li"
              delay={(i % 4) * 60}
              className="glass step-card group rounded-none p-6"
            >
              <div className="flex items-center gap-3">
                <span className="step-icon grid size-10 shrink-0 place-items-center rounded-xl border border-glass-border bg-secondary/60 text-primary">
                  {(() => {
                    const Icon = processIcons[i % processIcons.length]!;
                    return <Icon className="size-5" />;
                  })()}
                </span>
                <p className="step-no font-display text-xs tracking-[0.2em] text-primary">
                  {p.no.padStart(2, "0")}
                </p>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Toolkit() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Toolkit" title="The stack behind the work." />

        <div className="grid gap-4 sm:grid-cols-2">
          {toolkit.map((t, i) => (
            <Reveal key={t.group} delay={(i % 2) * 70} className="glass rounded-3xl p-6 sm:p-7">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-ink">{t.group}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                </div>
                <span className="label shrink-0">{t.items.length}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
    tile: "tile-mail",
  },
  {
    label: "WhatsApp",
    value: profile.phone,
    href: profile.whatsapp,
    Icon: MessageCircle,
    tile: "tile-chat",
  },
  { label: "GitHub", value: "pritesh88", href: profile.github, Icon: Github, tile: "tile-code" },
  {
    label: "LinkedIn",
    value: "pritesh-lad",
    href: profile.linkedin,
    Icon: Linkedin,
    tile: "tile-link",
  },
];


export function Contact() {
  return (
    <section id="contact" className="ambient scroll-mt-24 px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="glass-strong overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
          <p className="label">Contact</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Have something worth building?
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Let&apos;s turn the idea into something real — usually live within a couple of weeks.
          </p>


          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors hover:border-primary/40"
            >
              <MessageCircle className="size-4 text-primary" />
              Chat on WhatsApp
            </a>
          </div>
            </div>

            <div className="glass relative mx-auto w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] p-6 text-center">
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl border border-glass-border">
                <img
                  src={avatarImg}
                  alt="Illustrated avatar of Pritesh Lad"
                  loading="lazy"
                  width={900}
                  height={900}
                  className="size-full object-cover object-top"
                />
              </div>

              <p className="mt-5 font-display text-lg font-semibold text-ink">{profile.name } 👻</p>
              <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-glass-border px-3 py-1.5 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Replies within 24 hours
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map(({ label, value, href, Icon, tile }) => (
              <Reveal
                key={label}
                as="div"
                className={`contact-tile glass ${tile} rounded-2xl`}
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="block p-5"
                >
                  <Icon className="size-4 text-primary transition-transform" />
                  <p className="label mt-4">{label}</p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{value}</p>
                </a>
              </Reveal>
            ))}

          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-glass-border px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · {profile.role } ❤️
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {[
            { href: profile.github, Icon: Github, label: "GitHub" },
            { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: profile.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
            { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer noopener"
              className="grid size-9 place-items-center rounded-full border border-glass-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
