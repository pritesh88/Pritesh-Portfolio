export type Resource = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  intro: string;
  sections: { heading: string; body?: string; points?: string[] }[];
  // Which tool the article hands off to.
  cta: "plan" | "check";
};

export const resources: Resource[] = [
  {
    slug: "does-your-business-need-a-new-website",
    title: "Does your business actually need a new website?",
    summary: "Sometimes yes. Often the honest answer is a smaller, cheaper fix.",
    minutes: 3,
    intro:
      "A new website is the most common thing business owners ask for and not always what they need. Before spending on one, it's worth being clear about what problem you're trying to solve.",
    sections: [
      {
        heading: "You probably need one if",
        points: [
          "You have no website and customers are searching for businesses like yours",
          "Your website can't be updated without calling the person who built it",
          "It doesn't work properly on a phone",
          "What the business does today is no longer what the website says",
        ],
      },
      {
        heading: "You probably don't if",
        points: [
          "The website is sound, but the wording and structure are unclear",
          "Visitors arrive but can't find how to contact you",
          "The real problem is that nobody visits, which is a visibility problem",
        ],
      },
      {
        heading: "A useful test",
        body: "Ask what should happen after someone lands on the website. If you can answer that clearly and the current site can be changed to do it, improve it. If it can't be changed, replace it.",
      },
    ],
    cta: "plan",
  },
  {
    slug: "signs-your-website-is-costing-you-enquiries",
    title: "7 signs your website is costing you enquiries",
    summary: "A website can look perfectly fine and still quietly lose customers.",
    minutes: 4,
    intro:
      "Most websites don't fail dramatically. They fail quietly: a visitor arrives, doesn't find what they need in a few seconds, and goes back to the search results.",
    sections: [
      {
        heading: "The seven signs",
        points: [
          "The first screen doesn't say what you do or where",
          "The phone number isn't tappable on mobile",
          "There's no WhatsApp option, though that's how your customers prefer to talk",
          "The contact form asks for more than it needs",
          "Services are listed as names, with no explanation or pricing guidance",
          "There is nothing that shows real work, real customers or a real location",
          "The page takes long enough to load that you notice it yourself",
        ],
      },
      {
        heading: "What to do about it",
        body: "None of these need a rebuild. Most are fixed by restructuring the first screen, making contact one tap away and adding honest proof. Start with whichever one your customers hit first.",
      },
    ],
    cta: "check",
  },
  {
    slug: "website-redesign-vs-rebuild",
    title: "Website redesign vs rebuilding from scratch",
    summary: "How to tell which one you need, and what each really involves.",
    minutes: 3,
    intro:
      "The two get used interchangeably, but they are different projects with different costs. Choosing the wrong one wastes either money or time.",
    sections: [
      {
        heading: "Redesign",
        body: "You keep the platform and most of the content, and improve the structure, design, mobile experience, speed and paths to enquiry. It suits a website that is technically sound but unclear, dated or underperforming.",
      },
      {
        heading: "Rebuild",
        body: "You start again on a new foundation. It makes sense when the current platform is slow, insecure, impossible to update, or can't support what the business now needs, such as bookings or online sales.",
      },
      {
        heading: "How to decide",
        points: [
          "Can the current site be edited easily? If not, lean towards a rebuild",
          "Is the problem what the site says and shows, or how it's built?",
          "Will you need features the current platform can't support in the next year?",
        ],
      },
    ],
    cta: "check",
  },
  {
    slug: "what-should-a-business-website-do",
    title: "What should a business website actually do?",
    summary: "Four jobs, in order. Most websites only attempt the first.",
    minutes: 3,
    intro:
      "A business website isn't a brochure. It has four jobs, and each one depends on the one before it.",
    sections: [
      {
        heading: "1. Help customers discover you",
        body: "Clear page titles, sensible structure, fast loading and local signals so search engines and maps can show you to the right people.",
      },
      {
        heading: "2. Help them understand you",
        body: "Within a few seconds, on a phone, a visitor should know what you offer, who it's for and where you are.",
      },
      {
        heading: "3. Help them trust you",
        body: "Real work, real photos, real details. People look for reasons not to contact a business they don't know. Remove those reasons.",
      },
      {
        heading: "4. Help them take action",
        body: "One obvious next step, repeated where it's needed: call, WhatsApp, enquire, book or order. If a visitor has to hunt for it, most won't.",
      },
    ],
    cta: "plan",
  },
  {
    slug: "why-visitors-dont-contact-you",
    title: "Why visitors don't contact you",
    summary:
      "People are visiting. The enquiries aren't coming. Here's where they usually drop off.",
    minutes: 3,
    intro:
      "If your website gets visitors but few enquiries, the cause is nearly always one of a small number of things. They're all fixable.",
    sections: [
      {
        heading: "Common reasons",
        points: [
          "They couldn't tell quickly whether you do what they need",
          "The next step wasn't obvious, or there were five competing ones",
          "Contacting you felt like effort: long forms, no WhatsApp, no tappable number",
          "Nothing on the page reassured them that you're established and reliable",
          "They had an unanswered question about price, area or timing",
        ],
      },
      {
        heading: "The fix is usually structural",
        body: "Decide on the one action you want from a visitor. Put it in the first screen, repeat it after each section that builds trust, and make it as short as it can be.",
      },
    ],
    cta: "check",
  },
  {
    slug: "what-should-a-restaurant-website-include",
    title: "What should a restaurant website include?",
    summary: "Diners want three things quickly. Most restaurant sites hide all three.",
    minutes: 3,
    intro:
      "People usually open a restaurant's website on a phone, shortly before deciding where to eat. They aren't there to read your story first.",
    sections: [
      {
        heading: "The essentials",
        points: [
          "A menu that's readable on a phone, as a page rather than a PDF download",
          "Location, opening hours and directions in the first screen",
          "A simple way to book a table or enquire about a group",
          "Real photos of the food and the space",
          "A tappable phone number and a WhatsApp option",
        ],
      },
      {
        heading: "Worth adding later",
        body: "Online ordering, event and catering enquiries, and seasonal menus you can update yourself. Get the essentials right first; they do most of the work.",
      },
    ],
    cta: "plan",
  },
  {
    slug: "what-makes-a-local-business-website-trustworthy",
    title: "What makes a local business website trustworthy?",
    summary: "Trust comes from specifics. Vague websites feel risky to a stranger.",
    minutes: 3,
    intro:
      "A new customer is deciding whether to call a business they've never dealt with. The website either reduces that risk or adds to it.",
    sections: [
      {
        heading: "What builds trust",
        points: [
          "A real address, a map and opening hours",
          "Photos of the actual premises, team and work",
          "Named customers or reviews, quoted honestly",
          "Clear services, with some guidance on pricing",
          "A secure, fast website that works properly on a phone",
          "Details that are current: this year's date, working links, an answered phone",
        ],
      },
      {
        heading: "What undermines it",
        body: "Stock photos of strangers, big claims with nothing behind them, and details that contradict your Google listing. Being specific and consistent matters more than looking impressive.",
      },
    ],
    cta: "check",
  },
  {
    slug: "how-much-should-a-business-website-cost",
    title: "How much should a business website cost?",
    summary:
      "Why quotes range from a few thousand rupees to several lakh, and what you're paying for.",
    minutes: 4,
    intro:
      "You can get a website for almost any price. The differences aren't about the number of pages. They're about how much thinking, custom work and support is included.",
    sections: [
      {
        heading: "What moves the price",
        points: [
          "Template or custom design",
          "Who plans the structure and writes the content",
          "Functionality: enquiry flows, bookings, payments, dashboards",
          "Integrations such as WhatsApp, email, CRM or payment gateways",
          "Whether you can update it yourself",
          "Support after launch",
        ],
      },
      {
        heading: "Typical ranges for our work",
        body: "A focused presence website typically falls between ₹15k and ₹30k. A website built to actively bring in enquiries is typically ₹35k–₹60k. Projects with custom functionality such as bookings, payments or dashboards typically start around ₹65k.",
      },
      {
        heading: "How to compare quotes",
        body: "Ask each provider what the website is supposed to achieve and how they'll structure it to do that. A cheaper website that brings in nothing costs more than a well-planned one that brings in enquiries.",
      },
    ],
    cta: "plan",
  },
];
