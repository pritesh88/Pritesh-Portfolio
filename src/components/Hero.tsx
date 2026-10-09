import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import cafeImg from "@/assets/stock/hero-cafe.webp";
import storeImg from "@/assets/stock/hero-store.webp";
import clinicImg from "@/assets/stock/hero-clinic.webp";
import stayImg from "@/assets/stock/hero-stay.webp";
import { BrowserFrame } from "./BrowserFrame";
import { btnSecondary, PlanLink } from "./Cta";
import { heroProof, studio } from "@/data/site";
import { cn } from "@/lib/utils";

// Illustrative examples, not client work: stock photos staged as the kind of site each business needs.
const slides = [
  {
    kind: "Clinics",
    domain: "your-clinic.com",
    title: "Care that's easy to reach.",
    action: "Request an appointment",
    image: clinicImg,
    color: "#17a593",
  },
  {
    kind: "Stores & brands",
    domain: "your-store.com",
    title: "A collection worth browsing.",
    action: "Shop the collection",
    image: storeImg,
    color: "#e0559b",
  },
  {
    kind: "Hotels & stays",
    domain: "your-stay.com",
    title: "Rooms guests book direct.",
    action: "Check availability",
    image: stayImg,
    color: "#7c6cf0",
  },
  {
    kind: "Restaurants & cafés",
    domain: "your-cafe.com",
    title: "Tables booked before they walk in.",
    action: "Book a table",
    image: cafeImg,
    color: "#ee7b30",
  },
];

const SLIDE_MS = 2000;

// All slides stacked; only the one at `active` is visible, so changes cross-fade.
function Stack({ active, className }: { active: number; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {slides.map((s, i) => (
        <img
          key={s.domain}
          src={s.image}
          alt=""
          loading="lazy"
          width={1600}
          height={1000}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-[800ms] ease-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active]!;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <section
      className="hero-tint relative overflow-hidden px-4 pb-6 pt-28 sm:px-6 sm:pb-10 sm:pt-36"
      style={{ "--hero": slide.color } as CSSProperties}
    >
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,var(--hero),transparent_72%)] opacity-25"
        aria-hidden
      />

      <div className="mx-auto max-w-4xl text-center">
        <p className="label rise inline-flex items-center gap-2 rounded-full border border-tint/10 bg-tint/[0.03] px-4 py-2 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-[var(--hero)]" aria-hidden />
          {studio.descriptor} · {studio.location}
        </p>
        <h1
          className="rise mt-7 text-balance font-display text-[2.6rem] font-medium leading-[1.02] text-ink min-[400px]:text-5xl sm:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "80ms" }}
        >
          Your website should do more than <span className="text-[var(--hero)]">exist.</span>
        </h1>
        <p
          className="rise mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          We design and build websites that help customers discover your business, understand what
          you offer, trust you and take action, whether that&apos;s an enquiry, a booking or an
          order.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <PlanLink from="hero" />
          <Link to="/" hash="work" className={btnSecondary}>
            See what we build
            <ArrowDown className="size-4 text-cobalt" />
          </Link>
        </div>

        <ul
          className="rise mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          style={{ animationDelay: "320ms" }}
        >
          {heroProof.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-[var(--hero)]" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* A changing example site, with the page colour following it. */}
      <div
        className="rise relative mx-auto mt-12 max-w-6xl sm:mt-14"
        style={{ animationDelay: "420ms" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="pointer-events-none absolute inset-x-[6%] -top-10 bottom-0 -z-10 rounded-full bg-[var(--hero)] opacity-45 blur-[120px]"
          aria-hidden
        />
        <div className="relative mx-auto w-[96%] sm:w-[78%]">
          {/* The previous and next examples, out of focus on either side. */}
          <Stack
            active={(active + slides.length - 1) % slides.length}
            className="float-soft absolute -left-[18%] top-[16%] hidden aspect-[4/3] w-[40%] rounded-3xl opacity-70 blur-[5px] [animation-delay:-3s] sm:block"
          />
          <Stack
            active={(active + 1) % slides.length}
            className="float-soft absolute -right-[18%] top-[16%] hidden aspect-[4/3] w-[40%] rounded-3xl opacity-70 blur-[5px] [animation-delay:-6s] sm:block"
          />

          <BrowserFrame label={slide.domain} className="relative z-10">
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              {slides.map((s, i) => (
                <div
                  key={s.domain}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[800ms] ease-out",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <img
                    src={s.image}
                    alt=""
                    width={1600}
                    height={1000}
                    {...(i === 0
                      ? { fetchPriority: "high" as const }
                      : { loading: "lazy" as const })}
                    className={cn(
                      "size-full object-cover transition-transform duration-[7000ms] ease-out",
                      i === active ? "scale-100" : "scale-[1.12]",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col p-[5%] text-left text-white transition-all delay-100 duration-[600ms] ease-out",
                      i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                  >
                    <div className="flex items-center gap-[4%] text-[0.55rem] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-[0.7rem]">
                      <span className="size-2 rounded-full" style={{ background: s.color }} />
                      <span>{s.kind}</span>
                      <span className="ml-auto hidden text-white/60 sm:inline">About</span>
                      <span className="hidden text-white/60 sm:inline">Gallery</span>
                      <span className="hidden text-white/60 sm:inline">Contact</span>
                    </div>
                    <p className="mt-auto max-w-[62%] text-balance font-display text-xl font-medium leading-[1.05] sm:text-4xl lg:text-5xl">
                      {s.title}
                    </p>
                    <span
                      className="mt-[4%] w-fit rounded-full px-3 py-1.5 text-[0.6rem] font-medium text-white sm:px-5 sm:py-2.5 sm:text-sm"
                      style={{ background: s.color }}
                    >
                      {s.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </BrowserFrame>

          <div className="glass-strong absolute -right-[3%] bottom-[12%] z-20 hidden w-52 rounded-2xl p-4 text-left md:block lg:-right-[8%]">
            <p className="label">Built for</p>
            <p className="mt-1.5 font-display text-base font-medium leading-snug text-ink">
              {slide.kind}
            </p>
            <div className="mt-3 flex gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.domain}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show the ${s.kind} example`}
                  aria-current={i === active}
                  className="h-4 flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-colors duration-500",
                      i === active ? "bg-[var(--hero)]" : "bg-tint/15",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
