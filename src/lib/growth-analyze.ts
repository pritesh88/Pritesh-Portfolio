// Quick Growth Check: everything here is read directly from the page's HTML and the
// response we received. Nothing is estimated, scored by guesswork or simulated.

export type CheckStatus = "good" | "improve" | "info";
export type CheckItem = { status: CheckStatus; label: string; detail: string };
export type CheckGroup = { id: string; title: string; items: CheckItem[] };

export type GrowthCheckResult =
  | {
      ok: true;
      url: string;
      host: string;
      pageTitle: string;
      groups: CheckGroup[];
      good: number;
      total: number;
      notes: string[];
    }
  | { ok: false; error: string };

export type PageFetch = {
  finalUrl: string;
  html: string;
  responseMs: number;
  bytes: number;
  truncated: boolean;
};

const ACTION_WORDS =
  /(contact|enquir|inquir|book|call us|call now|quote|order|buy|shop now|add to cart|get started|whatsapp|appointment|reserve|schedule|talk to|get in touch|sign up|request)/i;

const text = (fragment: string) =>
  fragment
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function attrs(tag: string) {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    out[m[1]!.toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? "";
  }
  return out;
}

function jsonLdTypes(html: string) {
  const types = new Set<string>();
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const type = obj["@type"];
    if (typeof type === "string") types.add(type);
    else if (Array.isArray(type)) type.forEach((t) => typeof t === "string" && types.add(t));
    visit(obj["@graph"]);
  };
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      visit(JSON.parse(m[1]!));
    } catch {
      // Malformed structured data is simply ignored.
    }
  }
  return [...types];
}

const item = (ok: boolean, label: string, good: string, improve: string): CheckItem => ({
  status: ok ? "good" : "improve",
  label,
  detail: ok ? good : improve,
});

export function analyzePage(page: PageFetch): Extract<GrowthCheckResult, { ok: true }> {
  const { html } = page;
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const meta = (key: string) =>
    metas.find((m) => (m["name"] ?? m["property"] ?? "").toLowerCase() === key)?.["content"] ?? "";

  const pageTitle = text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = meta("description");
  const viewport = meta("viewport");
  const h1s = [...body.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)].map((m) => text(m[0]));
  const h2Count = [...body.matchAll(/<h2[\s>]/gi)].length;

  const links = [...body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: attrs(`<a ${m[1]}>`)["href"] ?? "",
    label: text(m[2]!),
  }));
  const buttons = [...body.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((m) =>
    text(m[1]!),
  );
  const actions = [...links.map((l) => l.label), ...buttons].filter(
    (l) => l.length > 0 && l.length < 40 && ACTION_WORDS.test(l),
  );
  const uniqueActions = [...new Set(actions.map((a) => a.toLowerCase()))];

  const hasTel = links.some((l) => l.href.startsWith("tel:"));
  const hasMail = links.some((l) => l.href.startsWith("mailto:"));
  const hasWhatsApp = /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i.test(html);
  const hasForm = /<form[\s>]/i.test(body);
  const hasMaps = /google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(
    html,
  );

  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const withAlt = images.filter((i) => (i["alt"] ?? "").trim().length > 0).length;
  const lazy = images.filter((i) => i["loading"] === "lazy").length;
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=/gi)].length;

  const isHttps = page.finalUrl.startsWith("https://");
  const hasSocialPreview = Boolean(meta("og:title") && meta("og:image"));
  const lang = attrs(html.match(/<html\b[^>]*>/i)?.[0] ?? "")["lang"] ?? "";
  const hasNav = /<nav[\s>]/i.test(body);
  const ldTypes = jsonLdTypes(html);

  const years = [...body.matchAll(/(?:©|&copy;|copyright)[^<]{0,40}?(20\d{2})(?!\d)/gi)].map((m) =>
    Number(m[1]),
  );
  const footerYear = years.length ? Math.max(...years) : undefined;
  const thisYear = new Date().getFullYear();

  const kb = Math.round(page.bytes / 1024);
  const seconds = (page.responseMs / 1000).toFixed(1);

  const groups: CheckGroup[] = [
    {
      id: "mobile",
      title: "Mobile experience",
      items: [
        item(
          /width\s*=\s*device-width/i.test(viewport),
          "Mobile viewport",
          "The page declares a mobile viewport, so it can adapt to phone screens.",
          "No mobile viewport tag found. Phones will likely show a zoomed-out desktop page.",
        ),
      ],
    },
    {
      id: "clarity",
      title: "Clarity",
      items: [
        item(
          pageTitle.length >= 10,
          "Page title",
          `Title: “${pageTitle.slice(0, 90)}”`,
          pageTitle
            ? `The title is only “${pageTitle}”. It should say what the business does.`
            : "No page title found. This is the headline people see in search results.",
        ),
        item(
          description.length >= 50,
          "Search description",
          `A meta description is set (${description.length} characters).`,
          description
            ? "The meta description is very short. It's your pitch in search results."
            : "No meta description found, so search engines pick their own snippet.",
        ),
        item(
          h1s.length === 1,
          "Main headline",
          `One clear main heading: “${(h1s[0] ?? "").slice(0, 90)}”`,
          h1s.length === 0
            ? "No main heading (H1) found in the HTML."
            : `${h1s.length} main headings (H1) found. One clear headline works better.`,
        ),
      ],
    },
    {
      id: "cta",
      title: "CTA visibility",
      items: [
        item(
          uniqueActions.length > 0,
          "Action-oriented links and buttons",
          `Found ${actions.length} (${uniqueActions.slice(0, 4).join(", ")}). We can't see where they sit on the page from the HTML alone.`,
          "We found no links or buttons with action wording such as contact, enquire, book or order.",
        ),
      ],
    },
    {
      id: "trust",
      title: "Trust",
      items: [
        item(
          isHttps,
          "Secure connection",
          "The site loads over HTTPS.",
          "The site doesn't load over HTTPS, so browsers mark it “Not secure”.",
        ),
        item(
          hasSocialPreview,
          "Link preview",
          "A title and image are set for previews on WhatsApp, LinkedIn and Instagram.",
          "No complete link preview (Open Graph title and image). Shared links will look bare on WhatsApp.",
        ),
        ...(footerYear
          ? [
              item(
                footerYear >= thisYear - 1,
                "Copyright year",
                `The page shows © ${footerYear}.`,
                `The page shows © ${footerYear}. A stale year can make a site look unattended.`,
              ),
            ]
          : []),
      ],
    },
    {
      id: "contact",
      title: "Contact accessibility",
      items: [
        item(
          hasTel,
          "Tap-to-call",
          "A tappable phone link is present.",
          "No tappable phone link (tel:) found on this page.",
        ),
        item(
          hasWhatsApp,
          "WhatsApp",
          "A WhatsApp chat link is present.",
          "No WhatsApp chat link found on this page.",
        ),
        item(
          hasForm || hasMail,
          "Form or email",
          hasForm ? "A form is present on this page." : "An email link is present.",
          "No enquiry form or email link found on this page.",
        ),
      ],
    },
    {
      id: "structure",
      title: "Structure",
      items: [
        item(
          h2Count >= 2,
          "Section headings",
          `${h2Count} section headings (H2) organise the page.`,
          `${h2Count === 0 ? "No section headings" : "Only one section heading"} (H2) found. Clear sections help people scan.`,
        ),
        item(
          hasNav,
          "Navigation",
          "A navigation landmark is present.",
          "No <nav> element found. Screen readers and search engines use it to understand the site.",
        ),
        item(
          Boolean(lang),
          "Language declared",
          `The page declares its language (${lang}).`,
          "The page doesn't declare its language.",
        ),
        ...(images.length
          ? [
              item(
                withAlt / images.length >= 0.8,
                "Image descriptions",
                `${withAlt} of ${images.length} images have alt text.`,
                `Only ${withAlt} of ${images.length} images have alt text.`,
              ),
            ]
          : []),
      ],
    },
    {
      id: "performance",
      title: "Performance",
      items: [
        item(
          page.responseMs < 1500,
          "Server response",
          `The page responded in ${seconds}s (measured from our server, not a phone).`,
          `The page took ${seconds}s to respond to our server.`,
        ),
        item(
          kb < 300,
          "HTML size",
          `The HTML document is ${kb} KB${page.truncated ? "+" : ""}.`,
          `The HTML document is ${kb} KB${page.truncated ? "+" : ""}, which is heavy before any images load.`,
        ),
        ...(images.length >= 4
          ? [
              item(
                lazy > 0,
                "Image loading",
                `${lazy} of ${images.length} images are lazy-loaded.`,
                `None of the ${images.length} images are lazy-loaded, so they all compete on first load.`,
              ),
            ]
          : []),
        {
          status: "info" as const,
          label: "Scripts",
          detail: `${scripts} external script file${scripts === 1 ? "" : "s"} referenced. This is not a full speed test.`,
        },
      ],
    },
    {
      id: "local",
      title: "Local visibility foundations",
      items: [
        item(
          ldTypes.length > 0,
          "Structured data",
          `Structured data found: ${ldTypes.slice(0, 4).join(", ")}.`,
          "No structured data found. It helps search engines understand the business, address and hours.",
        ),
        item(
          hasMaps,
          "Google Maps",
          "A Google Maps link or embed is present.",
          "No Google Maps link or embed found on this page.",
        ),
      ],
    },
  ];

  const scored = groups.flatMap((g) => g.items).filter((i) => i.status !== "info");
  const notes = ["We checked one page: the address you entered."];
  if (text(body).length < 400 && scripts > 0) {
    notes.push(
      "This page seems to build most of its content with JavaScript, so some items may show as missing even though visitors see them.",
    );
  }

  return {
    ok: true,
    url: page.finalUrl,
    host: new URL(page.finalUrl).host,
    pageTitle,
    groups,
    good: scored.filter((i) => i.status === "good").length,
    total: scored.length,
    notes,
  };
}
