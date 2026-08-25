import lifeSutraImg from "@/assets/life-sutra.png";
import finewayImg from "@/assets/fineway-foods.png";
import marathmolaImg from "@/assets/marathmola-saaj.png";
import siddharthImg from "@/assets/siddharth-insurance.png";
import katanaxImg from "@/assets/katanax.png";
import portraitImg from "@/assets/pritesh-portrait.jpg";
import jobBoardImg from "@/assets/job-board.jpg";
import djangoSaasImg from "@/assets/django-saas.jpg";

export const profile = {
  name: "Pritesh Lad",
  role: "Freelance software engineer",
  location: "Pune, India",
  portrait: portraitImg,
  tagline: "I build digital products that feel simple.",
  intro:
    "Freelance software engineer helping founders, professionals and small businesses launch portfolios, websites and platforms that bring more clients, trust and visibility.",
  email: "priteshlad6822@gmail.com",
  phone: "+91 74982 80436",
  whatsapp: "https://wa.me/917498280436",
  github: "https://github.com/pritesh88",
  linkedin: "https://linkedin.com/in/pritesh-lad",
};

export const stats = [
  { value: "15+", label: "Websites delivered" },
  { value: "2+", label: "Years building" },
  { value: "6", label: "Client platforms" },
  { value: "1", label: "Published VS Code theme" },
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  overview: string;
  problem: string;
  built: string[];
  features: string[];
  tech: string[];
  role: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "life-sutra",
    name: "Life Sutra",
    summary: "Open access research & knowledge ecosystem for Indian Knowledge Systems.",
    category: "Research Platform",
    tags: ["Research", "Web Platform", "CMS"],
    image: lifeSutraImg,
    featured: true,
    overview:
      "An open access platform where research on Indian Knowledge Systems is published, examined, challenged, discussed, synthesised and organised into a growing knowledge base.",
    problem:
      "Research around Indian Knowledge Systems sits scattered across journals, PDFs and institutions with no shared infrastructure connecting studies, scholars and evidence.",
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
    summary: "Premium frozen ready-to-eat and ready-to-cook manufacturer website.",
    category: "Business Website",
    tags: ["Business Site", "Catalogue", "SEO"],
    image: finewayImg,
    featured: true,
    liveUrl: "https://fineway-foods-okco.vercel.app/",
    overview:
      "Fine Way Foods LLP manufactures premium ready-to-eat and ready-to-cook frozen products with authentic taste, superior quality and complete food safety — from Punjabi samosa to gravy concentrates.",
    problem:
      "A manufacturer with 100+ products and no digital presence to present the catalogue or capture distributor and export enquiries.",
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
    slug: "marathmola-saaj",
    name: "Marathmola Saaj",
    summary: "Handmade Maharashtrian jewellery brand store.",
    category: "Brand & Commerce",
    tags: ["Brand Site", "Catalogue", "WhatsApp Orders"],
    image: marathmolaImg,
    featured: true,
    overview:
      "A handmade jewellery brand from Pune — mangalsutra, nath, thushi, bugadi and kudya — presented with the warmth of a heritage label.",
    problem:
      "The brand sold entirely through social media, with no place to present collections or convert interest into orders.",
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
    slug: "siddharth-insurance",
    name: "Siddharth Insurance",
    summary: "Digital presence and enquiry hub for an insurance advisor.",
    category: "Service Website",
    tags: ["Service Site", "Lead Capture", "Mobile First"],
    image: siddharthImg,
    liveUrl: "https://connectitapp.in/siddharth-insurance",
    overview:
      "A compact, mobile-first profile for an insurance consultancy: products, payment details, gallery and direct enquiry in one place.",
    problem:
      "Clients needed policy details, contact and payment information shared repeatedly over calls and chat.",
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
    slug: "job-board",
    name: "Job Board",
    summary: "Campus placement platform for students, companies and administrators.",
    category: "Full-stack Platform",
    tags: ["Django", "DRF", "MySQL"],
    image: jobBoardImg,
    featured: true,
    overview:
      "A multi-role placement platform where companies list jobs, students apply, and the college placement cell runs the process — replacing WhatsApp groups and repeated resume drops.",
    problem:
      "College placements ran on broadcast groups and manual forms, so students re-sent resumes and administrators tracked applications by hand.",
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
    name: "Django SaaS App",
    summary: "Reusable subscription backend with Stripe billing and CI/CD.",
    category: "SaaS Backend",
    tags: ["Django", "Stripe", "PostgreSQL"],
    image: djangoSaasImg,
    overview:
      "A reusable SaaS foundation: authentication, permissions, PostgreSQL persistence and recurring subscription billing, ready to drop under a new product.",
    problem:
      "Every subscription product restarts the same billing, auth and deployment plumbing from zero.",
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

export const achievement = {
  title: "KatanaX",
  subtitle: "VS Code theme published on the Visual Studio Marketplace",
  description:
    "A dark theme collection for VS Code — Midnight Blue, Misty Wind and Cherry Blossom — built and published for comfortable coding and vibrant syntax highlights.",
  image: katanaxImg,
  repoUrl: "https://github.com/pritesh88/katanax-theme",
};

export const values = [
  {
    title: "Clean UI design",
    body: "Pixel-perfect, modern interfaces that impress visitors and convert leads.",
  },
  {
    title: "Fast loading speed",
    body: "Optimised performance so your site loads in under two seconds.",
  },
  { title: "SEO friendly", body: "Built with search engines in mind — rank higher on Google." },
  {
    title: "Mobile responsive",
    body: "A perfect experience on desktop, tablet and mobile.",
  },
  {
    title: "2+ years experience",
    body: "Professional software development and technical depth behind every project.",
  },
  {
    title: "Affordable pricing",
    body: "Premium quality websites at budget-friendly prices for SMEs.",
  },
];

export const services = [
  { no: "01 ", title: "Websites 🌐", body: "Portfolio, business and company websites." } ,
  { no: "02", title: "Landing Pages 📄", body: "Focused pages built to convert. " },
  { no: "03", title: "Web Applications 📱", body: "Full-stack platforms and custom software. " },
  { no: "04", title: "Automation & AI ⚙️", body: "Integrations, workflows and practical AI features." } ,
];

export const capabilities = [
  "Portfolio websites",
  "Business / company websites",
  "Landing pages",
  "Custom domain setup",
  "Hosting & deployment",
  "SEO optimisation",
  "Contact form & email",
  "Website redesign",
  "Brand identity setup",
];

export const process = [
  { no: "1", title: "Discussion", body: "We align on requirements, goals and vision." },
  { no: "2", title: "Content collection", body: "You share text, images, logos and branding." },
  { no: "3", title: "Design confirmation", body: "A mockup is approved before any code." },
  { no: "4", title: "Development", body: "Clean code, responsive layouts, SEO built in." },
  { no: "5", title: "Review & feedback", body: "You review and I refine the details." },
  { no: "6", title: "Domain & hosting", body: "Custom domain set up and site deployed." },
  { no: "7", title: "Final delivery", body: "Site goes live with all credentials handed over." },
  { no: "8", title: "Support & updates", body: "Ongoing maintenance to keep things smooth." },
];

export const toolkit = [
  {
    group: "Frontend",
    note: "Responsive React interfaces with modern UI tooling.",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "jQuery",
      "Vite",
      "Responsive Design",
    ],
  },
  {
    group: "Backend",
    note: "APIs, services and server-side logic.",
    items: [
      "Node.js",
      "Next.js",
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    group: "Databases & Cloud",
    note: "Data storage, deployment and managed platforms.",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Redis",
      "Docker",
      "AWS",
      "Vercel",
    ],
  },
  {
    group: "Tools & Workflow",
    note: "Version control, API testing, issue tracking and IDEs.",
    items: ["Git", "GitHub", "Postman", "Jira", "Eclipse", "Agile", "Advanced Excel"],
  },
];
