import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react";
import { btnPrimary, CallLink } from "./Cta";
import { Pito, type PitoMood } from "./Pito";
import { studio, whatsappLink } from "@/data/site";
import { track } from "@/lib/analytics";
import { submitLead } from "@/lib/leads";
import {
  budgetOptions,
  businessOptions,
  currentOptions,
  goalOptions,
  labelFor,
  needOptions,
  planMessage,
  recommend,
  type Answers,
  type Option,
} from "@/lib/planner";
import { cn } from "@/lib/utils";

export const assistantName = "Pito";

type SingleKey = "need" | "current" | "business" | "budget";
type StepKey = SingleKey | "goals" | "contact";

// What the assistant says at each step. The questions and the rules behind the
// recommendation are fixed (see lib/planner.ts); this is a guided chat, not a live model.
const steps: { key: StepKey; ask: string; options?: Option[] }[] = [
  { key: "need", ask: "First up: what do you need?", options: needOptions },
  {
    key: "goals",
    ask: "Got it. What should it help you do? Pick as many as apply, then send.",
    options: goalOptions,
  },
  { key: "current", ask: "And what do you have today?", options: currentOptions },
  {
    key: "business",
    ask: "What kind of business is it? That shapes what the website should lead with.",
    options: businessOptions,
  },
  {
    key: "budget",
    ask: "What level of investment are you considering? A rough range is enough.",
    options: budgetOptions,
  },
  {
    key: "contact",
    ask: "Last one. Where should I send your plan? Your recommendation is next.",
  },
];

// Long enough to read as someone thinking before they answer.
const TYPING_MS = 3500;

const inputClass =
  "mt-2 w-full rounded-xl border border-input bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-cobalt focus-visible:ring-2 focus-visible:ring-ring/30";

const valid = (options: Option[], id?: string) => (options.some((o) => o.id === id) ? id! : "");

function BotRow({
  children,
  wide,
  mood,
}: {
  children: ReactNode;
  wide?: boolean;
  mood?: PitoMood;
}) {
  return (
    <div className="step-in flex items-end gap-2.5">
      <Pito {...(mood && { mood })} className="size-10 sm:size-12" />
      <div
        className={cn(
          "glass rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed text-foreground sm:text-base",
          wide ? "min-w-0 flex-1 sm:p-6" : "max-w-[85%]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function UserRow({ children }: { children: ReactNode }) {
  return (
    <div className="step-in flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground sm:text-base">
        {children}
      </p>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-end gap-2.5" aria-hidden>
      <Pito mood="think" className="size-10 sm:size-12" />
      <div className="glass flex gap-1.5 rounded-2xl rounded-bl-md px-4 py-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="pulse-soft size-1.5 rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Planner({
  initial,
}: {
  initial: { need?: string; business?: string; site?: string };
}) {
  const presetNeed = valid(needOptions, initial.need);
  const [answers, setAnswers] = useState<Answers>({
    need: presetNeed,
    goals: [],
    current: "",
    business: valid(businessOptions, initial.business),
    budget: "",
  });
  const [contact, setContact] = useState({
    name: "",
    business: "",
    contact: "",
    website: initial.site ?? "",
  });
  const [step, setStep] = useState(presetNeed ? 1 : 0);
  const [done, setDone] = useState(false);
  const [typing, setTyping] = useState(false);
  const latestRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // A short "typing" beat before each new message, then bring it into view and move focus
  // there so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = () => {
      setTyping(false);
      requestAnimationFrame(() => {
        latestRef.current?.focus({ preventScroll: true });
        latestRef.current?.scrollIntoView({
          block: "center",
          behavior: reduced ? "auto" : "smooth",
        });
      });
    };
    if (reduced) return show();
    setTyping(true);
    const id = window.setTimeout(show, TYPING_MS);
    return () => window.clearTimeout(id);
  }, [step, done]);

  const rec = useMemo(() => (done ? recommend(answers) : null), [done, answers]);
  const current = steps[step]!;

  const go = (next: number) => {
    setStep(next);
    track("planner_step", { step: next + 1 });
  };

  const pick = (key: SingleKey, id: string) => {
    setAnswers((a) => ({ ...a, [key]: id }));
    go(step + 1);
  };

  const toggleGoal = (id: string) =>
    setAnswers((a) => {
      if (id === "unsure") return { ...a, goals: a.goals.includes("unsure") ? [] : ["unsure"] };
      const goals = a.goals.filter((g) => g !== "unsure");
      return { ...a, goals: goals.includes(id) ? goals.filter((g) => g !== id) : [...goals, id] };
    });

  const finish = (e: FormEvent) => {
    e.preventDefault();
    const result = recommend(answers);
    setDone(true);
    track("planner_completed", { tier: result.tier, need: answers.need });
    void submitLead({
      data: { source: "planner", ...contact, summary: planMessage(answers, result, contact) },
    }).catch(() => undefined);
  };

  const restart = () => {
    setAnswers({ need: "", goals: [], current: "", business: "", budget: "" });
    setDone(false);
    setStep(0);
  };

  // What the visitor replied at a step, as it reads in the chat.
  const replyFor = (key: StepKey) => {
    if (key === "goals") return answers.goals.map((g) => labelFor(goalOptions, g)).join(", ");
    if (key === "contact") return `${contact.name}, ${contact.business}`;
    const options = steps.find((s) => s.key === key)!.options!;
    return labelFor(options, answers[key]);
  };

  // Pito smiles to open, looks curious while asking, thinks while "typing" and cheers at the end.
  const mood: PitoMood = typing ? "think" : done ? "cheer" : step === 0 ? "smile" : "ask";

  const answered = steps.slice(0, done ? steps.length : step);
  const canSubmit =
    contact.name.trim().length > 0 &&
    contact.business.trim().length > 0 &&
    contact.contact.trim().length >= 5;
  const message = rec ? planMessage(answers, rec, contact) : "";

  return (
    <div className="glass-strong overflow-hidden rounded-[2rem]">
      <div className="flex items-center gap-3 border-b border-glass-border px-5 py-4 sm:px-8">
        <span className="relative">
          <Pito mood={mood} className="size-14 sm:size-16" />
          <span
            className="absolute bottom-0.5 right-0.5 size-3.5 rounded-full border-2 border-card bg-emerald-400"
            aria-hidden
          />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-medium text-ink">{assistantName}</p>
          <p className="truncate text-xs text-muted-foreground">
            Website planning assistant · {studio.name}
          </p>
        </div>
        <p className="label ml-auto shrink-0" aria-label="Planner progress">
          {done ? "Done" : `${step + 1} / ${steps.length}`}
        </p>
        {done ? (
          <button
            type="button"
            onClick={restart}
            aria-label="Start over"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-glass-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            aria-label="Change my previous answer"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-glass-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
      </div>

      <div className="space-y-4 p-5 sm:p-8" aria-live="polite">
        <BotRow>
          Hi, I&apos;m {assistantName}. Answer six quick questions and I&apos;ll recommend a
          starting point for your website, with a typical investment and timeline.
        </BotRow>

        {answered.map((s) => (
          <div key={s.key} className="space-y-4">
            <BotRow>{s.ask}</BotRow>
            <UserRow>{replyFor(s.key)}</UserRow>
          </div>
        ))}

        {typing ? (
          <Typing />
        ) : done && rec ? (
          <div ref={latestRef} tabIndex={-1} className="space-y-4 outline-none">
            <BotRow mood="cheer">
              Thanks, {contact.name.trim().split(" ")[0]}. Here&apos;s where I&apos;d start.
            </BotRow>
            <BotRow wide mood="cheer">
              <p className="label">Your starting point</p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-tight text-ink sm:text-4xl">
                {rec.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {rec.summary}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {rec.features.map((f, i) => (
                  <li
                    key={f}
                    style={{ animationDelay: `${200 + i * 90}ms` }}
                    className="rise flex items-start gap-3 rounded-2xl border border-glass-border bg-tint/[0.04] px-4 py-3.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Project level", v: rec.tierName },
                  { k: "Typical investment", v: rec.investment },
                  { k: "Typical timeline", v: rec.timeline },
                ].map((d) => (
                  <div key={d.k} className="rounded-2xl border border-tint/10 bg-tint/[0.04] p-4">
                    <dt className="label">{d.k}</dt>
                    <dd className="mt-2 font-display text-xl font-medium tracking-tight text-ink">
                      {d.v}
                    </dd>
                  </div>
                ))}
              </dl>

              {rec.budgetNote && (
                <p className="mt-4 rounded-2xl border border-cobalt/40 bg-primary/30 px-5 py-4 text-sm leading-relaxed text-foreground">
                  {rec.budgetNote}
                </p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                These are typical figures for projects like this. Final scope, cost and timeline
                depend on your requirements, and we confirm them before any work begins.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => track("planner_request_plan", { tier: rec.tier })}
                  className={btnPrimary}
                >
                  <MessageCircle className="size-4" />
                  Request my project plan
                </a>
                <CallLink from="planner-result" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                The button opens WhatsApp with your answers filled in, and Pritesh replies himself.
                Prefer email?{" "}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={`mailto:${studio.email}?subject=${encodeURIComponent(`Project plan request: ${rec.title}`)}&body=${encodeURIComponent(message)}`}
                >
                  Send it by email
                </a>
                .
              </p>
            </BotRow>
          </div>
        ) : (
          <div className="space-y-4">
            <div ref={latestRef} tabIndex={-1} className="outline-none">
              <BotRow mood={mood}>{current.ask}</BotRow>
            </div>

            {current.key === "contact" ? (
              <form onSubmit={finish} className="step-in grid gap-4 pl-12 sm:grid-cols-2 sm:pl-14">
                <label className="text-sm font-medium text-foreground">
                  Your name
                  <input
                    required
                    autoComplete="name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  Business name
                  <input
                    required
                    autoComplete="organization"
                    value={contact.business}
                    onChange={(e) => setContact({ ...contact, business: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  WhatsApp number or email
                  <input
                    required
                    minLength={5}
                    value={contact.contact}
                    onChange={(e) => setContact({ ...contact, contact: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  Website URL <span className="font-normal text-muted-foreground">(optional)</span>
                  <input
                    inputMode="url"
                    placeholder="yourbusiness.com"
                    value={contact.website}
                    onChange={(e) => setContact({ ...contact, website: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={cn(btnPrimary, "disabled:opacity-40")}
                  >
                    See my recommendation
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    No account, no spam. We only use this to reply about your project.
                  </p>
                </div>
              </form>
            ) : (
              <div className="step-in pl-12 sm:pl-14">
                <div className="flex flex-wrap gap-2">
                  {current.options!.map((o) => {
                    const selected =
                      current.key === "goals"
                        ? answers.goals.includes(o.id)
                        : answers[current.key as SingleKey] === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          current.key === "goals"
                            ? toggleGoal(o.id)
                            : pick(current.key as SingleKey, o.id)
                        }
                        className="choice rounded-2xl px-4 py-2.5 text-left"
                      >
                        <span className="block text-sm font-medium text-ink">{o.label}</span>
                        {o.hint && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {o.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {current.key === "goals" && (
                  <button
                    type="button"
                    disabled={answers.goals.length === 0}
                    onClick={() => go(step + 1)}
                    className={cn(btnPrimary, "mt-5 disabled:opacity-40")}
                  >
                    Send
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="border-t border-glass-border px-5 py-3 text-center text-xs text-muted-foreground sm:px-8">
        {assistantName} is a guided planner with set questions, not a live chat. Pritesh reads every
        plan himself.
      </p>
    </div>
  );
}
