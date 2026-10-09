import { tiers, type TierId } from "@/data/site";

export type Option = { id: string; label: string; hint?: string };

export const needOptions: Option[] = [
  { id: "new", label: "New website", hint: "A website for the business" },
  { id: "redesign", label: "Website redesign", hint: "Improve the one you have" },
  { id: "ecommerce", label: "E-commerce", hint: "Sell products online" },
  { id: "hospitality", label: "Restaurant / hospitality", hint: "Menus, stays, bookings" },
  { id: "booking", label: "Booking / appointments", hint: "Let customers book you" },
  { id: "webapp", label: "Custom web application", hint: "Portal, dashboard or tool" },
  { id: "unsure", label: "Not sure", hint: "We'll recommend something" },
];

export const goalOptions: Option[] = [
  { id: "enquiries", label: "Get more enquiries" },
  { id: "showcase", label: "Showcase services" },
  { id: "sell", label: "Sell products" },
  { id: "bookings", label: "Take bookings" },
  { id: "whatsapp", label: "WhatsApp enquiries" },
  { id: "credibility", label: "Build credibility" },
  { id: "local", label: "Improve local visibility" },
  { id: "replace", label: "Replace outdated website" },
  { id: "automate", label: "Automate something" },
  { id: "unsure", label: "Not sure" },
];

export const currentOptions: Option[] = [
  { id: "none", label: "No website" },
  { id: "outdated", label: "Outdated website" },
  { id: "low-enquiries", label: "Looks fine, but doesn't generate enough enquiries" },
  { id: "slow-mobile", label: "Slow or poor mobile experience" },
  { id: "features", label: "Need additional features" },
  { id: "scratch", label: "Starting from scratch" },
];

export const businessOptions: Option[] = [
  { id: "restaurant", label: "Restaurant" },
  { id: "clinic", label: "Clinic" },
  { id: "professional", label: "Professional Service" },
  { id: "manufacturer", label: "Manufacturer" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "real-estate", label: "Real Estate" },
  { id: "education", label: "Education" },
  { id: "hospitality", label: "Hospitality" },
  { id: "consultant", label: "Consultant" },
  { id: "local", label: "Local Business" },
  { id: "startup", label: "Startup" },
  { id: "other", label: "Other" },
];

export const budgetOptions: Option[] = [
  { id: "presence", label: "₹15k–₹30k", hint: "A solid, focused presence" },
  { id: "growth", label: "₹30k–₹60k", hint: "Built to bring in enquiries" },
  { id: "scale", label: "₹60k–₹1.4L+", hint: "Custom functionality" },
  { id: "unsure", label: "Not sure", hint: "Recommend something" },
];

export type Answers = {
  need: string;
  goals: string[];
  current: string;
  business: string;
  budget: string;
};

export type Recommendation = {
  tier: TierId;
  tierName: string;
  title: string;
  summary: string;
  features: string[];
  investment: string;
  timeline: string;
  budgetNote?: string;
};

const tierOrder: TierId[] = ["presence", "growth", "scale"];

const goalFocus: Record<string, string> = {
  enquiries: "enquiries",
  whatsapp: "WhatsApp communication",
  bookings: "bookings",
  sell: "product sales",
  local: "local discovery",
  credibility: "credibility",
  showcase: "clear service presentation",
  automate: "automating manual work",
};

const goalFeatures: Record<string, string[]> = {
  enquiries: ["Enquiry optimisation"],
  showcase: ["Stronger service presentation"],
  sell: ["Product pages, cart and payments"],
  bookings: ["Booking or appointment flow"],
  whatsapp: ["WhatsApp integration"],
  credibility: ["Proof, work and trust signals"],
  local: ["Local SEO foundation"],
  replace: ["Content and structure migration"],
  automate: ["Workflow automation"],
};

const businessFeature: Record<string, string> = {
  restaurant: "Mobile menu, location and directions up front",
  hospitality: "Rooms, gallery and direct booking enquiries",
  clinic: "Treatment pages and appointment requests",
  manufacturer: "Product catalogue with quote requests",
  ecommerce: "Product pages, cart and payments",
  "real-estate": "Property listings with enquiry capture",
  education: "Course pages with admission enquiries",
  professional: "Service pages that build credibility",
  consultant: "Service pages that build credibility",
  local: "Google Maps and click-to-call",
  startup: "Clear product story with sign-up capture",
};

const currentFeature: Record<string, string> = {
  outdated: "Modernised design and structure",
  "low-enquiries": "Clearer calls to action and enquiry paths",
  "slow-mobile": "Speed and mobile performance work",
  features: "New functionality on a maintainable base",
};

const defaultFeatures = [
  "Mobile-first experience",
  "Clear page structure",
  "SEO foundations",
  "Analytics",
];

const maxTier = (a: TierId, b: TierId): TierId =>
  tierOrder.indexOf(a) >= tierOrder.indexOf(b) ? a : b;

function joinList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function labelFor(options: Option[], id: string) {
  return options.find((o) => o.id === id)?.label ?? id;
}

export function recommend(a: Answers): Recommendation {
  const goals = a.goals.filter((g) => g !== "unsure");
  const has = (g: string) => goals.includes(g);
  const wantsLeads = has("enquiries") || has("whatsapp") || has("local") || has("bookings");
  const hasSite = ["outdated", "low-enquiries", "slow-mobile", "features"].includes(a.current);

  let tier: TierId = "presence";
  let title = "Presence Website";
  let descriptor = "a focused, professional business website";

  if (a.need === "webapp") {
    tier = "scale";
    title = "Custom Web Application";
    descriptor = "a custom web application";
  } else if (a.need === "ecommerce" || has("sell")) {
    tier = "growth";
    title = "E-commerce Store";
    descriptor = "an online store";
  } else if (a.need === "booking" || has("bookings")) {
    tier = "growth";
    title = "Booking Website";
    descriptor = "a website with a built-in booking flow";
  } else if (a.need === "hospitality") {
    tier = wantsLeads || goals.length >= 3 ? "growth" : "presence";
    title = "Hospitality Website";
    descriptor = "a mobile-first hospitality website";
  } else if (a.need === "redesign" || (hasSite && a.current !== "features")) {
    tier = wantsLeads || a.current === "low-enquiries" ? "growth" : "presence";
    title = tier === "growth" ? "Growth Redesign" : "Website Redesign";
    descriptor = "a redesign of your existing website";
  } else if (wantsLeads) {
    tier = "growth";
    title = "Growth Website";
    descriptor = "a conversion-focused business website";
  }

  if (a.current === "features") tier = maxTier(tier, "growth");
  if (has("automate")) {
    tier = "scale";
    if (a.need !== "webapp") descriptor += " with custom functionality";
  }

  const focus = goals.map((g) => goalFocus[g]).filter((f): f is string => Boolean(f));
  const focusList = [...focus.slice(0, 2), "mobile users"];
  const summary = `Based on what you've told us, we'd recommend ${descriptor} built around ${joinList(focusList)}.`;

  const pool = [
    businessFeature[a.business],
    currentFeature[a.current],
    ...goals.flatMap((g) => goalFeatures[g] ?? []),
    ...defaultFeatures,
  ].filter((f): f is string => Boolean(f));
  const features = [...new Set(pool)].slice(0, 6);

  const t = tiers.find((x) => x.id === tier)!;
  const rec: Recommendation = {
    tier,
    tierName: t.name,
    title,
    summary,
    features,
    investment: t.investment,
    timeline: t.timeline,
  };

  if (a.budget !== "unsure") {
    const diff = tierOrder.indexOf(a.budget as TierId) - tierOrder.indexOf(tier);
    const range = labelFor(budgetOptions, a.budget);
    if (diff < 0) {
      rec.budgetNote = `You're considering ${range}, which is below the typical range for this scope. We'd suggest a phased start: launch the essentials first and add the rest once the website is earning its keep.`;
    } else if (diff > 0) {
      rec.budgetNote = `You're considering ${range}, but what you've described doesn't need that much. We'd only add scope if it clearly helps the business.`;
    }
  }

  return rec;
}

export function planMessage(
  a: Answers,
  rec: Recommendation,
  contact: { name: string; business: string; contact: string; website: string },
) {
  return [
    "Hi Pritesh, I used Plan My Website and would like my project plan.",
    "",
    `Name: ${contact.name}`,
    `Business: ${contact.business}`,
    `Contact: ${contact.contact}`,
    contact.website ? `Website: ${contact.website}` : null,
    "",
    `Need: ${labelFor(needOptions, a.need)}`,
    `Goals: ${a.goals.map((g) => labelFor(goalOptions, g)).join(", ")}`,
    `Today: ${labelFor(currentOptions, a.current)}`,
    `Business type: ${labelFor(businessOptions, a.business)}`,
    `Range considered: ${labelFor(budgetOptions, a.budget)}`,
    "",
    `Recommended: ${rec.title} (${rec.tierName}, typically ${rec.investment}, ${rec.timeline})`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
