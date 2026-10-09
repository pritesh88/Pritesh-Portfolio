import islfImg from "@/assets/i-smart-life-foundation.webp";
import islfMobileImg from "@/assets/i-smart-life-foundation-mobile.webp";
import lifeSutraImg from "@/assets/life-sutra.webp";
import lifeSutraMobileImg from "@/assets/life-sutra-mobile.webp";
import finewayImg from "@/assets/fineway-foods.webp";
import finewayMobileImg from "@/assets/fineway-foods-mobile.webp";
import marathmolaImg from "@/assets/marathmola-saaj.webp";
import siddharthImg from "@/assets/siddharth-insurance.webp";
import jobBoardImg from "@/assets/job-board.webp";
import djangoSaasImg from "@/assets/django-saas.webp";
import localBusinessPhoto from "@/assets/stock/local-business.webp";
import restaurantPhoto from "@/assets/stock/restaurant.webp";
import clinicPhoto from "@/assets/stock/clinic.webp";
import professionalPhoto from "@/assets/stock/professional-service.webp";
import manufacturerPhoto from "@/assets/stock/manufacturer.webp";
import ecommercePhoto from "@/assets/stock/e-commerce.webp";
import startupPhoto from "@/assets/stock/startup.webp";
import hospitalityPhoto from "@/assets/stock/hospitality.webp";

export const studio = {
  name: "Growwise Studio",
  brand: "Growwise",
  brandSuffix: "Studio",
  descriptor: "Web development studio",
  location: "Pune, India",
  url: "https://pritesh-lad.vercel.app",
  email: "priteshlad6822@gmail.com",
  phone: "+91 74982 80436",
  whatsapp: "https://wa.me/917498280436",
  github: "https://github.com/pritesh88",
  linkedin: "https://linkedin.com/in/pritesh-lad",
  // Paste a Cal.com / Calendly / Google Calendar booking link here. While empty,
  // "Book a 15-minute call" opens WhatsApp with a prefilled message instead.
  bookingUrl: "",
};

export const founder = {
  name: "Pritesh Lad",
  role: "Founder & full-stack developer",
};

export function whatsappLink(message: string) {
  return `${studio.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const callLink =
  studio.bookingUrl ||
  whatsappLink("Hi Pritesh, I'd like to book a 15-minute call about a website for my business.");

export const nav = [
  { label: "Work", hash: "work" },
  { label: "Services", hash: "services" },
  { label: "How We Work", hash: "how-we-work" },
  { label: "Pricing", hash: "pricing" },
  { label: "Resources", hash: "resources" },
];

export const heroProof = [
  "15+ projects delivered",
  "Full-stack development",
  "Direct collaboration",
];

export const proof = [
  { value: "15+", label: "Projects delivered" },
  { value: "2+", label: "Years building digital products" },
  { value: "Full-stack", label: "Design to deployment" },
  { value: "Real", label: "Client work, shown below" },
  { value: "Direct", label: "Collaboration, no hand-offs" },
  { value: "Post-launch", label: "Support after go-live" },
];

// Real client and project names only, shown as plain text wordmarks.
export const clientNames = [
  "I Smart Life Foundation",
  "Life Sutra Synthesis",
  "Fineway Foods",
  "Siddharth Insurance",
  "Marathmola Saaj",
];

/* ---------- Differentiation ---------- */

export const considerations = [
  "What the business sells",
  "Who the customer is",
  "How customers discover it",
  "What customers need to know",
  "What action they should take",
  "How enquiries are handled today",
  "What isn't working right now",
  "What needs to happen after launch",
];

export const traditionalFlow = ["Brief", "Website", "Launch", "Done"];
export const ourFlow = [
  "Business",
  "Strategy",
  "Structure",
  "Design",
  "Build",
  "Launch",
  "Improve",
];

/* ---------- Services ---------- */

export const services = [
  {
    title: "Business Websites",
    body: "Professional websites for local businesses, professionals, manufacturers and growing companies.",
    need: "new",
  },
  {
    title: "Website Redesigns",
    body: "Modernise an outdated website and improve its structure, mobile experience, speed and conversion.",
    need: "redesign",
  },
  {
    title: "E-commerce",
    body: "Stores, products, payments, orders and the customer journey that connects them.",
    need: "ecommerce",
  },
  {
    title: "Restaurants & Hospitality",
    body: "Menus, locations, bookings, WhatsApp and a mobile-first customer experience.",
    need: "hospitality",
  },
  {
    title: "Custom Web Applications",
    body: "Dashboards, portals, booking systems, customer systems and internal tools.",
    need: "webapp",
  },
  {
    title: "Ongoing Growth",
    body: "Maintenance, performance, content, analytics and continued development after launch.",
    need: "",
  },
];

/* ---------- Business types ---------- */

export type BusinessType = {
  slug: string;
  name: string;
  plannerId: string;
  // Stock photo (Unsplash License) that sets the scene for this kind of business.
  photo: string;
  problem: string;
  intro: string;
  shouldDo: string[];
  typicalBuild: string[];
};

export const businessTypes: BusinessType[] = [
  {
    slug: "local-business",
    name: "Local Business",
    plannerId: "local",
    photo: localBusinessPhoto,
    problem:
      "Help nearby customers find you, see what you do and contact you before they try the next result.",
    intro:
      "Most local customers decide on a phone, in under a minute, usually from a search or a map listing. The website's job is to confirm you're the right choice and make contacting you effortless.",
    shouldDo: [
      "Say what you do and where, in the first screen",
      "Make calling, WhatsApp and directions one tap away",
      "Show real photos, services and opening hours",
      "Support your Google Business Profile with consistent details",
    ],
    typicalBuild: [
      "Service pages",
      "Click-to-call and WhatsApp",
      "Google Maps",
      "Local SEO foundation",
    ],
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    plannerId: "restaurant",
    photo: restaurantPhoto,
    problem:
      "Make your menu easier to explore, directions easier to find and enquiries easier to start.",
    intro:
      "People checking a restaurant want three things fast: the menu, the location and whether they can book. A PDF menu and a buried phone number lose them.",
    shouldDo: [
      "Show a readable menu on mobile, not a PDF download",
      "Put location, hours and directions up front",
      "Make table bookings and party enquiries simple",
      "Use real photos of the food and the space",
    ],
    typicalBuild: [
      "Mobile menu",
      "Booking or enquiry flow",
      "Maps and hours",
      "WhatsApp ordering or enquiries",
    ],
  },
  {
    slug: "clinic",
    name: "Clinic",
    plannerId: "clinic",
    photo: clinicPhoto,
    problem:
      "Let patients understand your treatments, trust the doctor and request an appointment without calling twice.",
    intro:
      "Patients look for reassurance before they book: who the doctor is, what is treated, where the clinic is and how to get an appointment.",
    shouldDo: [
      "Explain treatments in plain language",
      "Introduce the doctors with qualifications",
      "Offer appointment requests that work on mobile",
      "Show timings, location and contact clearly",
    ],
    typicalBuild: [
      "Treatment pages",
      "Doctor profiles",
      "Appointment requests",
      "Maps and timings",
    ],
  },
  {
    slug: "professional-service",
    name: "Professional Service",
    plannerId: "professional",
    photo: professionalPhoto,
    problem:
      "Turn referrals who look you up into enquiries, by showing clearly what you do and why you're credible.",
    intro:
      "For consultants, advisors, CAs, lawyers and agencies, the website is often the second touchpoint after a referral. It needs to confirm the recommendation.",
    shouldDo: [
      "Describe each service and who it is for",
      "Show credentials, experience and real work",
      "Answer the questions clients ask before a first call",
      "Make starting a conversation low-effort",
    ],
    typicalBuild: ["Service pages", "Credibility and proof", "Enquiry flow", "Shareable profile"],
  },
  {
    slug: "manufacturer",
    name: "Manufacturer",
    plannerId: "manufacturer",
    photo: manufacturerPhoto,
    problem:
      "Present your product range properly so distributors and buyers can evaluate you and ask for a quote.",
    intro:
      "B2B buyers shortlist suppliers from their websites. A catalogue that is hard to browse, or no way to request prices, quietly removes you from the list.",
    shouldDo: [
      "Organise products by category with specifications",
      "Show capacity, quality standards and certifications",
      "Make price-list and quote requests simple",
      "Work for export and distributor enquiries too",
    ],
    typicalBuild: [
      "Product catalogue",
      "Quote and price-list requests",
      "Quality and process pages",
      "SEO foundation",
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    plannerId: "ecommerce",
    photo: ecommercePhoto,
    problem:
      "Give your products a store you own, with a checkout customers finish instead of abandoning.",
    intro:
      "Selling only through marketplaces or Instagram DMs limits what you can build. Your own store gives you the customer relationship, the data and the margin.",
    shouldDo: [
      "Make products easy to browse and compare on mobile",
      "Keep checkout short, with familiar payment options",
      "Show delivery, returns and contact details clearly",
      "Give you a simple way to manage products and orders",
    ],
    typicalBuild: [
      "Product pages",
      "Cart and payments",
      "Order management",
      "WhatsApp order support",
    ],
  },
  {
    slug: "startup",
    name: "Startup",
    plannerId: "startup",
    photo: startupPhoto,
    problem:
      "Explain a new product clearly enough that visitors, partners and investors know what it is and what to do next.",
    intro:
      "Early-stage products change quickly. The website should explain the idea simply, capture interest and be easy to update as the product evolves.",
    shouldDo: [
      "State the problem and the product in one screen",
      "Capture sign-ups, demos or waitlist interest",
      "Stay easy to change as the product evolves",
      "Leave room for the web application behind it",
    ],
    typicalBuild: [
      "Product landing pages",
      "Lead or waitlist capture",
      "Content management",
      "Web application, when needed",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    plannerId: "hospitality",
    photo: hospitalityPhoto,
    problem:
      "Show the stay, the rooms and the location well enough that guests enquire directly with you.",
    intro:
      "Guests compare several places at once. Clear rooms, real photos, location and a direct way to enquire help you win bookings that would otherwise go through a listing site.",
    shouldDo: [
      "Present rooms, amenities and pricing guidance clearly",
      "Lead with real photography of the property",
      "Make direct booking enquiries easy",
      "Show location, nearby places and how to reach you",
    ],
    typicalBuild: [
      "Rooms and gallery",
      "Booking enquiry flow",
      "Maps and directions",
      "WhatsApp enquiries",
    ],
  },
];

/* ---------- Case studies ---------- */

export type Project = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  client: string;
  tags: string[];
  image: string;
  // Phone screenshot, shown beside the desktop one where we have it.
  mobileImage?: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  business: string;
  challenge: string;
  approach: string;
  built: string[];
  features: string[];
  tech: string[];
  role: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "i-smart-life-foundation",
    name: "I Smart Life Foundation",
    summary:
      "The website of a books and journals publishing body, home to its journals and a self-assessment tool.",
    category: "Publishing Platform",
    client: "Publishing body",
    tags: ["Publishing", "Web Platform", "Assessment Tool"],
    image: islfImg,
    mobileImage: islfMobileImg,
    featured: true,
    liveUrl: "https://www.lifesutra.co.in/",
    business:
      "I Smart Life Foundation (ISLF) is a Section 8 company in Pune that publishes books and journals on mind, consciousness and Indian Knowledge Systems, including Life Sutra Synthesis and Life Sutra.",
    challenge:
      "The foundation needed one home for its identity, its publications and its public programmes, where each journal could still stand as a publication in its own right.",
    approach:
      "We treated the foundation as the parent and each publication as its own space beneath it. The main site introduces the body and its purpose, and every journal gets a dedicated section with its own identity, navigation and submission route.",
    built: [
      "Foundation site covering its purpose, vision and approach",
      "Publications and books sections, with a dedicated section for each journal",
      "5P Harmony & Agency self-assessment that runs entirely in the browser",
    ],
    features: [
      "Journal and book listings",
      "Research submission route",
      "5P self-assessment",
      "Answers never leave the browser",
    ],
    tech: ["React", "Node.js", "CMS", "SEO"],
    role: "Design, front-end, content architecture and deployment.",
    outcome: "One home for the foundation, its journals and its public programmes.",
  },
  {
    slug: "life-sutra",
    name: "Life Sutra Synthesis",
    summary:
      "A research journal platform for Indian Knowledge Systems and mind and consciousness studies.",
    category: "Research Platform",
    client: "Research journal",
    tags: ["Research", "Web Platform", "CMS"],
    image: lifeSutraImg,
    mobileImage: lifeSutraMobileImg,
    featured: true,
    liveUrl: "https://www.lifesutra.co.in/publications/life-sutra-synthesis",
    business:
      "Life Sutra Synthesis is a peer-reviewed online journal of mind, consciousness studies and Indian Knowledge Systems, published by I Smart Life Foundation. Research is published, examined, discussed and organised into a growing knowledge base.",
    challenge:
      "Research around Indian Knowledge Systems sits scattered across journals, PDFs and institutions with no shared infrastructure connecting studies, scholars and evidence.",
    approach:
      "We started with how research moves — from submission to publication to discussion — and designed the content structure first, so studies, scholars and institutions connect to each other instead of living as separate pages.",
    built: [
      "Editorial and publishing structure for peer-reviewed research and abstracts",
      "Content architecture connecting studies, scholars, institutions and evidence",
      "Responsive editorial front-end with search and discovery flows",
    ],
    features: [
      "Research and abstract publishing",
      "Scholar and institution profiles",
      "Structured knowledge base",
      "Calls for papers and submissions",
    ],
    tech: ["React", "Node.js", "CMS", "SEO"],
    role: "Design, front-end, content architecture and deployment.",
    outcome: "A single research ecosystem replacing scattered documents and manual publishing.",
  },
  {
    slug: "fineway-foods",
    name: "Fineway Foods",
    summary: "A catalogue and enquiry website for a frozen food manufacturer with 100+ products.",
    category: "Manufacturer Website",
    client: "Food manufacturer",
    tags: ["Business Site", "Catalogue", "SEO"],
    image: finewayImg,
    mobileImage: finewayMobileImg,
    featured: true,
    liveUrl: "https://finewayfood.com/",
    business:
      "Fine Way Foods LLP manufactures premium ready-to-eat and ready-to-cook frozen products with authentic taste, superior quality and complete food safety — from Punjabi samosa to gravy concentrates.",
    challenge:
      "A manufacturer with 100+ products and no digital presence to present the catalogue or capture distributor and export enquiries.",
    approach:
      "We began with the buyer: distributors and export customers who need to scan a large range quickly and ask for prices. The catalogue and the price-list request became the spine of the site, with quality and cold-chain proof supporting them.",
    built: [
      "Product catalogue with categories and specifications",
      "Enquiry and price-list request flow",
      "Brand-led landing experience with trust signals",
    ],
    features: [
      "100+ product catalogue",
      "Price-list enquiry",
      "Quality and cold-chain storytelling",
      "Mobile-first layouts",
    ],
    tech: ["React", "Tailwind CSS", "Vercel", "SEO"],
    role: "End-to-end: design, development, deployment.",
    outcome: "A credible B2B storefront that turns catalogue browsing into direct enquiries.",
  },
  {
    slug: "siddharth-insurance",
    name: "Siddharth Insurance",
    summary: "Digital presence and enquiry hub for an insurance advisor.",
    category: "Service Website",
    client: "Insurance advisor",
    tags: ["Service Site", "Lead Capture", "Mobile First"],
    image: siddharthImg,
    featured: true,
    liveUrl: "https://connectitapp.in/siddharth-insurance",
    business:
      "A compact, mobile-first profile for an insurance consultancy: products, payment details, gallery and direct enquiry in one place.",
    challenge:
      "Clients needed policy details, contact and payment information shared repeatedly over calls and chat.",
    approach:
      "The same questions were being answered again and again, so we treated the page as one shareable answer: products, payment details and enquiry, each within a tap on a phone.",
    built: [
      "Product and service listing",
      "One-tap call, enquiry and payment sections",
      "Gallery and feedback modules",
    ],
    features: ["Products overview", "Direct enquiry", "Payment details", "Shareable profile"],
    tech: ["Web", "Responsive UI", "Lead capture"],
    role: "Implementation and deployment.",
    outcome: "Repeat questions replaced by one shareable link.",
  },
  {
    slug: "marathmola-saaj",
    name: "Marathmola Saaj",
    summary: "A branded storefront for a handmade Maharashtrian jewellery label.",
    category: "Brand & Commerce",
    client: "Jewellery brand",
    tags: ["Brand Site", "Catalogue", "WhatsApp Orders"],
    image: marathmolaImg,
    featured: true,
    business:
      "A handmade jewellery brand from Pune — mangalsutra, nath, thushi, bugadi and kudya — presented with the warmth of a heritage label.",
    challenge:
      "The brand sold entirely through social media, with no place to present collections or convert interest into orders.",
    approach:
      "The audience already lived on Instagram and WhatsApp, so we kept ordering there and gave the collections a proper home: browse on the site, order in the chat customers already use.",
    built: [
      "Collection browsing with rich product imagery",
      "WhatsApp-based ordering flow",
      "Heritage-led visual identity in layout and typography",
    ],
    features: [
      "Collection categories",
      "Order on WhatsApp",
      "Story and craft section",
      "Ships pan-India messaging",
    ],
    tech: ["React", "Tailwind CSS", "Deployment"],
    role: "Design and development.",
    outcome: "A branded storefront that gives an Instagram-first business a real home.",
  },
  {
    slug: "job-board",
    name: "Campus Placement Platform",
    summary: "A multi-role placement platform for students, companies and administrators.",
    category: "Custom Web Application",
    client: "College placement cell",
    tags: ["Web Application", "Multi-role", "Workflows"],
    image: jobBoardImg,
    featured: true,
    business:
      "A multi-role placement platform where companies list jobs, students apply, and the college placement cell runs the process — replacing WhatsApp groups and repeated resume drops.",
    challenge:
      "College placements ran on broadcast groups and manual forms, so students re-sent resumes and administrators tracked applications by hand.",
    approach:
      "We mapped the three roles — students, companies and the placement cell — and what each needs to get done, then built permissions and workflows around those jobs before designing any screens.",
    built: [
      "Role-based authentication and custom permissions for students, companies and admins",
      "Job posting and application-status workflows with validation and error handling",
      "Resume/file uploads and email notifications around the application flow",
    ],
    features: [
      "Multi-role access control",
      "Job posting and applications",
      "Resume uploads",
      "Email notifications",
      "Pagination, filtering, indexing",
    ],
    tech: ["Python", "Django", "Django REST Framework", "MySQL", "Postman"],
    role: "Backend architecture, API design, testing and optimisation.",
    outcome:
      "~30% less processing time for the placement cell and ~25% faster API responses after query optimisation.",
  },
  {
    slug: "django-saas",
    name: "Subscription Billing Backend",
    summary: "A reusable subscription backend with Stripe billing and automated deployment.",
    category: "Custom Web Application",
    client: "Product foundation",
    tags: ["Payments", "Subscriptions", "Automation"],
    image: djangoSaasImg,
    business:
      "A reusable SaaS foundation: authentication, permissions, PostgreSQL persistence and recurring subscription billing, ready to drop under a new product.",
    challenge:
      "Every subscription product restarts the same billing, auth and deployment plumbing from zero.",
    approach:
      "We isolated the parts every subscription product repeats — accounts, billing and deployment — and built them once, treating the reliability of billing events as the first priority.",
    built: [
      "Stripe recurring subscriptions with webhook signature verification",
      "Idempotent, retry-safe subscription event handling",
      "Background processing and automated backend tests",
    ],
    features: [
      "Auth and permissions",
      "Stripe subscriptions",
      "Webhook event handling",
      "GitHub OAuth",
      "CI/CD pipeline",
    ],
    tech: ["Python", "Django", "PostgreSQL", "Stripe", "Docker", "GitHub Actions", "Railway"],
    role: "Full backend build and deployment automation.",
    outcome: "~99% webhook processing reliability with automated build and deploy.",
  },
];

/* ---------- Redesign offer ---------- */

export const redesignAreas = [
  "Design",
  "Structure",
  "Mobile experience",
  "Speed",
  "Content hierarchy",
  "Calls to action",
  "Enquiry flow",
  "Service presentation",
  "SEO foundations",
  "Integrations",
  "Conversion paths",
];

/* ---------- Process ---------- */

export const process = [
  {
    no: "01",
    title: "Understand",
    body: "Your business, your customers and what the website needs to achieve.",
  },
  { no: "02", title: "Plan", body: "Page structure and the journey from first visit to enquiry." },
  {
    no: "03",
    title: "Design",
    body: "Visual direction and user experience, approved before the build.",
  },
  { no: "04", title: "Build", body: "Development, integrations and testing across devices." },
  { no: "05", title: "Launch", body: "Hosting, domain, analytics and SEO foundations in place." },
  { no: "06", title: "Improve", body: "Maintenance and ongoing optimisation based on real usage." },
];

/* ---------- Pricing ---------- */

export type TierId = "presence" | "growth" | "scale";

export const tiers: {
  id: TierId;
  name: string;
  investment: string;
  timeline: string;
  forWho: string;
  includesFrom?: string;
  items: string[];
  recommended?: boolean;
}[] = [
  {
    id: "presence",
    name: "Presence",
    investment: "₹15k–₹30k",
    timeline: "1–2 weeks",
    forWho: "For businesses establishing or improving their digital presence.",
    items: [
      "Custom responsive website",
      "Core pages",
      "Mobile-first design",
      "Contact and enquiry forms",
      "WhatsApp integration",
      "Google Maps",
      "Basic SEO",
      "Analytics",
      "Performance optimisation",
      "Launch support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    investment: "₹35k–₹60k",
    timeline: "2–4 weeks",
    forWho: "For businesses that want the website to actively support enquiries.",
    includesFrom: "Everything in Presence, plus",
    recommended: true,
    items: [
      "Conversion-focused structure",
      "Custom UI/UX",
      "Advanced enquiry flows",
      "CMS / content management",
      "WhatsApp and email workflows",
      "SEO foundation",
      "Event tracking",
      "Lead capture optimisation",
      "30 days of post-launch support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    investment: "₹65k–₹1.4L+",
    timeline: "4–8 weeks",
    forWho: "For businesses that need more than a traditional website.",
    includesFrom: "Everything in Growth, plus",
    items: [
      "Custom functionality",
      "Dashboards",
      "Booking systems",
      "Payments",
      "Customer accounts",
      "APIs and integrations",
      "Automation",
      "Custom admin systems",
      "Advanced workflows",
    ],
  },
];

export const growthPlans = [
  {
    name: "Care",
    price: "₹3k–₹5k",
    scope: "Up to 2 hours of changes a month",
    forWho: "Keep the website healthy and current.",
    items: ["Updates", "Uptime monitoring", "Backups", "Minor content changes", "Maintenance"],
  },
  {
    name: "Grow",
    price: "₹7k–₹10k",
    scope: "Up to 6 hours of improvements a month",
    forWho: "Improve the website a little every month.",
    includesFrom: "Everything in Care, plus",
    items: [
      "Monthly improvements",
      "Analytics review",
      "SEO and content improvements",
      "Performance optimisation",
      "Conversion improvements",
    ],
  },
  {
    name: "Partner",
    price: "₹12k+",
    scope: "Scope agreed each month, from 12 hours",
    forWho: "Ongoing development for a growing business.",
    items: [
      "Ongoing development",
      "New features",
      "Automation",
      "Analytics and optimisation",
      "Priority support",
    ],
  },
];

/* ---------- Trust ---------- */

export type Testimonial = { quote: string; name: string; role: string };

// Add real client testimonials here, word for word. The section stays hidden while this is empty.
export const testimonials: Testimonial[] = [];

export const founderSkills = [
  "Design implementation",
  "Frontend",
  "Backend",
  "APIs",
  "Databases",
  "Deployment",
];

export const stack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Docker",
  "AWS",
  "Vercel",
];

export const achievement = {
  title: "KatanaX",
  subtitle: "VS Code theme published on the Visual Studio Marketplace",
  repoUrl: "https://github.com/pritesh88/katanax-theme",
};

/* ---------- FAQ ---------- */

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "Most projects fall into three levels: Presence (typically ₹15k–₹30k), Growth (₹35k–₹60k) and Scale (₹65k–₹1.4L+). The final figure depends on pages, content, integrations and custom functionality. Plan My Website gives you a realistic starting point in under a minute.",
  },
  {
    q: "How long does it take?",
    a: "A focused business website typically takes 1–2 weeks, a Growth-level website 2–4 weeks, and custom applications 4–8 weeks or more. The biggest variable is usually how quickly content and feedback come together.",
  },
  {
    q: "Do you redesign existing websites?",
    a: "Yes. Often a website doesn't need replacing, it needs a clearer structure, a better mobile experience and stronger paths to enquiry. We'll tell you honestly whether a redesign or a rebuild makes more sense.",
  },
  {
    q: "Do you build e-commerce?",
    a: "Yes: product catalogues, carts, payments and order management, as well as simpler WhatsApp-based ordering for businesses that don't need a full store yet.",
  },
  {
    q: "Can you integrate WhatsApp?",
    a: "Yes. Click-to-chat buttons, prefilled enquiry messages and WhatsApp-based ordering are part of most of the websites we build.",
  },
  {
    q: "Can you build booking systems?",
    a: "Yes. That ranges from a simple appointment request form to a full booking system with availability, confirmations and an admin view, depending on what the business needs.",
  },
  {
    q: "Do you provide hosting?",
    a: "We set up hosting and deployment for you on a reliable platform and connect your domain. The hosting account and the domain stay in your name, so you always own your website.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes, through monthly plans: Care for updates and monitoring, Grow for continuous improvements, and Partner for ongoing development. Each has a defined monthly scope.",
  },
  {
    q: "Can you work with my existing domain?",
    a: "Yes. We connect the new website to your existing domain and keep your email and other records working during the switch.",
  },
  {
    q: "Do you work outside Pune?",
    a: "Yes. We're based in Pune and work with businesses across India and abroad over calls, WhatsApp and email.",
  },
  {
    q: "What happens after launch?",
    a: "You get the credentials, a walkthrough and launch support. Growth projects include 30 days of post-launch support, and you can continue with a monthly plan if you want the website to keep improving.",
  },
  {
    q: "Can you help with SEO?",
    a: "We build the foundations into every website: clean structure, metadata, fast loading, mobile performance and local signals. Ongoing SEO and content work is available through the Grow and Partner plans. We don't promise rankings.",
  },
  {
    q: "What if I don't know what website I need?",
    a: "That's normal, and it's our job to figure out. Use Plan My Website or book a 15-minute call, tell us what the business does and what isn't working, and we'll recommend an approach.",
  },
];
