import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Globe, Info, Loader2, Minus } from "lucide-react";
import { btnPrimary, CallLink, PlanLink } from "./Cta";
import { track } from "@/lib/analytics";
import { runGrowthCheck } from "@/lib/growth-check";
import type { CheckStatus, GrowthCheckResult } from "@/lib/growth-analyze";
import { cn } from "@/lib/utils";

const categories = [
  "Mobile experience",
  "Clarity",
  "CTA",
  "Trust",
  "Contact",
  "Structure",
  "Performance",
  "Local visibility",
];

// Status is shown by shape and fill, not by extra colours: filled cobalt = in place,
// hollow = could improve.
const statusStyle: Record<CheckStatus, { Icon: typeof Info; className: string; label: string }> = {
  good: {
    Icon: Check,
    className: "border-transparent bg-primary text-primary-foreground",
    label: "In place",
  },
  improve: {
    Icon: Minus,
    className: "border-tint/25 text-muted-foreground",
    label: "Could improve",
  },
  info: { Icon: Info, className: "border-transparent text-muted-foreground", label: "Note" },
};

export function GrowthCheck({ initialUrl }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GrowthCheckResult | null>(null);
  const started = useRef(false);

  const run = async (target: string) => {
    if (!target.trim()) return;
    setLoading(true);
    setResult(null);
    track("growth_check_started");
    try {
      const res = await runGrowthCheck({ data: { url: target } });
      setResult(res);
      track("growth_check_finished", { ok: res.ok });
    } catch {
      setResult({ ok: false, error: "Something went wrong running the check. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Arriving from the homepage form (/check?url=...) runs the check straight away.
  useEffect(() => {
    if (initialUrl && !started.current) {
      started.current = true;
      void run(initialUrl);
    }
  }, [initialUrl]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void run(url);
  };

  const pct = result?.ok ? Math.round((result.good / result.total) * 100) : 0;

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="glass-strong flex flex-col gap-2 rounded-[1.75rem] p-2.5 transition-colors duration-500 focus-within:border-cobalt/60 focus-within:shadow-[0_0_60px_-20px_rgb(44_52_128)] sm:flex-row sm:items-center sm:rounded-full"
      >
        <label htmlFor="check-url" className="sr-only">
          Your website address
        </label>
        <Globe className="ml-5 hidden size-5 shrink-0 text-cobalt sm:block" aria-hidden />
        <input
          id="check-url"
          name="url"
          required
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="yourbusiness.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-4 text-lg text-foreground outline-none placeholder:text-muted-foreground/60 sm:px-3"
        />
        <button type="submit" disabled={loading} className={cn(btnPrimary, "disabled:opacity-60")}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Checking
            </>
          ) : (
            <>
              Check my website
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* What gets checked. While the page is being fetched and read, the chips pulse in turn. */}
      {!result && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-hidden={!loading}>
          {categories.map((c, i) => (
            <li
              key={c}
              className={cn(
                "rounded-full border border-tint/10 bg-tint/[0.03] px-3.5 py-2 text-xs text-muted-foreground",
                loading && "pulse-soft border-cobalt/40 text-foreground",
              )}
              style={loading ? { animationDelay: `${i * 160}ms` } : undefined}
            >
              {c}
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" className="mt-8">
        {loading && <p className="sr-only">Reading your page…</p>}

        {result && !result.ok && (
          <p className="rise glass rounded-2xl px-5 py-4 text-sm text-foreground">{result.error}</p>
        )}

        {result?.ok && (
          <div>
            <div className="rise glass-strong grid gap-8 rounded-3xl p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
              <div
                className="relative mx-auto grid size-36 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(var(--cobalt) ${pct}%, var(--track) 0)`,
                }}
                role="img"
                aria-label={`${result.good} of ${result.total} basics in place`}
              >
                <div className="grid size-[7.75rem] place-items-center rounded-full bg-card">
                  <p className="font-display text-4xl font-medium tracking-tight text-ink">
                    {result.good}
                    <span className="text-xl text-muted-foreground">/{result.total}</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="label">Quick Growth Check · {result.host}</p>
                <h2 className="mt-3 font-display text-2xl font-medium text-ink sm:text-4xl">
                  {result.good} of {result.total} basics are in place.
                </h2>
                <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  {result.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                  <li>
                    This reads the page&apos;s HTML only. It can&apos;t judge your design, wording
                    or how the page feels to a customer. That takes a person.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {result.groups.map((g, gi) => {
                const scored = g.items.filter((i) => i.status !== "info");
                const good = scored.filter((i) => i.status === "good").length;
                return (
                  <section
                    key={g.id}
                    className="rise glass rounded-3xl p-6"
                    style={{ animationDelay: `${120 + gi * 70}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-lg font-medium text-ink">{g.title}</h3>
                      <div className="flex shrink-0 items-center gap-2">
                        <div className="flex gap-1" aria-hidden>
                          {scored.map((i) => (
                            <span
                              key={i.label}
                              className={cn(
                                "h-1.5 w-5 rounded-full",
                                i.status === "good" ? "bg-cobalt" : "bg-tint/12",
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {good}/{scored.length}
                        </span>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-4">
                      {g.items.map((it) => {
                        const s = statusStyle[it.status];
                        return (
                          <li key={it.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                            <span
                              className={cn(
                                "mt-0.5 grid size-5 place-items-center rounded-full border",
                                s.className,
                              )}
                              role="img"
                              aria-label={s.label}
                            >
                              <s.Icon className="size-3" aria-hidden />
                            </span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{it.label}</p>
                              <p className="mt-0.5 break-words text-sm leading-relaxed text-muted-foreground">
                                {it.detail}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>

            <div className="rise glass-strong ambient-center mt-4 overflow-hidden rounded-3xl p-6 sm:p-10">
              <h2 className="font-display text-2xl font-medium text-ink sm:text-4xl">
                Want us to show you what we&apos;d improve?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We&apos;ll look at the website properly, as a customer would, and tell you the few
                changes most likely to help. If it doesn&apos;t need much, we&apos;ll say so.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PlanLink need="redesign" site={result.url} from="growth-check-result">
                  Improve my website
                </PlanLink>
                <CallLink from="growth-check-result" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
