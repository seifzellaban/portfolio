import {
  IconChartBar,
  IconCode,
  IconPalette,
  IconRobot,
} from "@tabler/icons-react";
import { JSX } from "react";

export type ServiceMotif =
  | "architecture"
  | "interface"
  | "growth"
  | "automation";

export interface ServicePageTheme {
  eyebrow: string;
  identity: string;
  motif: ServiceMotif;
  accentClass: string;
  surfaceClass: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
}

export interface ServiceSection {
  title: string;
  body: string;
  items: string[];
}

export interface ServiceProcessStep {
  label: string;
  title: string;
  description: string;
}

export interface ServiceVisualNode {
  label: string;
  value: string;
  detail: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceRelatedWork {
  slug: string;
  title: string;
  summary: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  idealFor: string;
  engagementStyle: string;
  contactProjectType: string;
  emailSubject: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  icon: JSX.Element;
  timeRange: string;
  priceRange: string;
  theme: ServicePageTheme;
  metrics: ServiceMetric[];
  stack: string[];
  deliverables: string[];
  diagnostics: ServiceSection;
  blueprint: {
    kicker: string;
    title: string;
    body: string;
  };
  process: ServiceProcessStep[];
  proofPoints: string[];
  visualNodes: ServiceVisualNode[];
  faqs: ServiceFaq[];
  relatedWork?: ServiceRelatedWork;
}

export const SERVICE_ORDER = [
  "web-development",
  "ui-ux-design",
  "api-bot-ai-automation",
  "seo-digital-marketing",
] as const;

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Fast Next.js and TypeScript web applications built cleanly from data model to production deployment.",
    metaDescription:
      "Full-stack web development with Next.js, React, TypeScript, and Convex: architecture, APIs, performance, QA, and production launch.",
    heroTitle: "Ship a fast web product built to hold up after launch.",
    heroLead:
      "I handle the full build: route structure, database and real-time state, integrations, responsive UI, and production deployment so your team inherits readable code instead of technical debt.",
    idealFor:
      "Founders launching a v1 web app or internal dashboard, or teams replacing a slow frontend and messy spreadsheets.",
    engagementStyle: "Fixed-scope build",
    contactProjectType: "Web app",
    emailSubject: "Web Development inquiry",
    ctaLabel: "Email about a web build",
    ctaTitle: "Have a web app or dashboard to ship?",
    ctaBody:
      "Send a short note with what you are building, what needs to exist in v1, and your target launch window. I will reply within 24 hours with next steps and a realistic scope.",
    icon: <IconCode size={28} className="text-primary" />,
    timeRange: "4 – 12 Weeks",
    priceRange: "EGP 8,000 – 25,000+",
    theme: {
      eyebrow: "Full-Stack Engineering",
      identity: "Next.js, TypeScript, real-time backends",
      motif: "architecture",
      accentClass: "border-border bg-card text-foreground",
      surfaceClass: "bg-card/55",
    },
    metrics: [
      { label: "Build mode", value: "v1 to production" },
      { label: "Core stack", value: "Next.js · Convex · TS" },
      { label: "Handoff", value: "Full repo & docs" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    deliverables: [
      "Application architecture, data schema, and route structure",
      "Responsive React & Next.js frontend with clean mobile behavior",
      "Backend APIs, real-time sync, and third-party integrations",
      "Authentication, role permissions, and admin workflows when needed",
      "Core Web Vitals, accessibility, and production QA checks",
      "Live deployment, environment setup, and clear repo handoff",
    ],
    diagnostics: {
      title: "Where web builds usually stall",
      body: "Most delays happen before launch week: unclear v1 boundaries, fragile API contracts, or a frontend patched together without a real data model. I surface those edges in week one.",
      items: [
        "Vague feature lists translated into concrete weekly milestones",
        "Database schemas, auth, and third-party APIs mapped before UI polish",
        "Performance and mobile responsiveness built in from the first route",
        "Hosting, domains, and environment variables verified ahead of launch",
      ],
    },
    blueprint: {
      kicker: "System layers",
      title: "How every layer fits together",
      body: "Each layer is typed end to end so changes in the database or API surface immediately at build time instead of breaking in production.",
    },
    process: [
      {
        label: "01",
        title: "Lock the v1 scope",
        description:
          "Define core users, essential flows, data sources, and what stays out of v1 so the timeline stays honest.",
      },
      {
        label: "02",
        title: "Wire the foundation",
        description:
          "Set up the repo, schema, auth, and core routes early so you can click through a live staging URL in week one.",
      },
      {
        label: "03",
        title: "Build in visible passes",
        description:
          "Ship working features weekly with responsive states, empty/error handling, and direct async check-ins.",
      },
      {
        label: "04",
        title: "QA & deploy cleanly",
        description:
          "Run production checks, verify analytics and performance, deploy to your infrastructure, and hand over clean docs.",
      },
    ],
    proofPoints: [
      "Strict TypeScript and clean component boundaries any engineer can pick up",
      "Staging preview links shared continuously throughout the build",
      "Real-world proof: shipped Safety Source's live Convex dashboard tracking 7M+ EGP/mo",
      "You own 100% of the repository, accounts, and deployment pipeline",
    ],
    visualNodes: [
      {
        label: "Interface",
        value: "Next.js App Router",
        detail: "Fast server-rendered pages, crisp mobile layouts, accessible components.",
      },
      {
        label: "Data & Auth",
        value: "Convex / Postgres",
        detail: "Typed schemas, reactive live queries, role-based access control.",
      },
      {
        label: "Integrations",
        value: "APIs & Webhooks",
        detail: "Payments, email, CRM sync, and external services with error handling.",
      },
      {
        label: "Quality",
        value: "Speed & Edge States",
        detail: "Loading states, empty states, validation, and Core Web Vitals checks.",
      },
      {
        label: "Production",
        value: "CI & Deployment",
        detail: "Clean env config, domain setup, monitoring, and full code ownership.",
      },
    ],
    faqs: [
      {
        question: "How does pricing and payment work?",
        answer:
          "Every build is priced against an agreed milestone scope before code starts. Typically split 50% upfront to book the slot and 50% at launch, or in three milestones for longer 8–12 week builds.",
      },
      {
        question: "Do I need finished Figma designs first?",
        answer:
          "No. If you already have Figma files, I build directly from them. If you only have a rough brief or existing spreadsheets, I design the interface and build the app together.",
      },
      {
        question: "Who owns the code and hosting accounts?",
        answer:
          "You do. Everything lives in your GitHub organization, Vercel/hosting account, and database project from day one, with a written handoff guide at the end.",
      },
    ],
    relatedWork: {
      slug: "masons",
      title: "Masons Studio",
      summary: "Statically rendered Next.js studio site built with a reusable type and component system.",
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Clear product flows, responsive interfaces, and practical component systems built by someone who also writes the frontend.",
    metaDescription:
      "UI/UX design sprints for web apps, dashboards, and landing pages: user flows, responsive screens, interaction states, and developer-ready handoff.",
    heroTitle: "Make the product obvious to use and easy to trust.",
    heroLead:
      "I turn cluttered screens and rough product ideas into calm, readable interfaces with clear hierarchy, real edge states, and component specs that developers can actually build.",
    idealFor:
      "Products that work under the hood but feel confusing, inconsistent, or hard for new users to trust on desktop and mobile.",
    engagementStyle: "Design sprint",
    contactProjectType: "UI/UX design",
    emailSubject: "UI/UX Design sprint inquiry",
    ctaLabel: "Email about a design sprint",
    ctaTitle: "Need a clearer product interface?",
    ctaBody:
      "Send a link to the current product or describe the screens you need designed. I will reply within 24 hours with how I would structure the sprint.",
    icon: <IconPalette size={28} className="text-primary" />,
    timeRange: "3 – 8 Weeks",
    priceRange: "EGP 4,000 – 10,000+",
    theme: {
      eyebrow: "Interface & Product Design",
      identity: "Hierarchy, flows, and buildable systems",
      motif: "interface",
      accentClass: "border-primary/30 bg-primary/10 text-foreground",
      surfaceClass: "bg-card/45",
    },
    metrics: [
      { label: "Output", value: "Flows, screens, tokens" },
      { label: "Cadence", value: "Focused design sprint" },
      { label: "Handoff", value: "Dev-ready specs" },
    ],
    stack: [
      "Figma",
      "Design Systems",
      "Responsive Grids",
      "Interactive Prototypes",
      "Accessibility (WCAG)",
      "Frontend-Aware Specs",
    ],
    deliverables: [
      "Information architecture and core user journey mapping",
      "Low-fidelity wireframes to validate structure before styling",
      "High-fidelity desktop and mobile screens for every key flow",
      "Empty, loading, error, and validation states documented",
      "Reusable color, typography, spacing, and component foundations",
      "Clean engineering handoff notes with zero guesswork",
    ],
    diagnostics: {
      title: "Friction points a design sprint fixes",
      body: "Good interface work removes hesitation. Instead of decorating screens, the sprint locates where users lose context, bounce on mobile, or stall before taking action.",
      items: [
        "Crowded screens where the primary action is buried",
        "Landing pages that fail to explain the offer in the first 10 seconds",
        "Missing mobile layouts and forgotten empty or error states",
        "Inconsistent spacing, typography, and buttons across views",
      ],
    },
    blueprint: {
      kicker: "Experience map",
      title: "Four stages every screen has to survive",
      body: "Every flow is checked from first impression through edge cases so nothing falls apart when real customer data replaces placeholder text.",
    },
    process: [
      {
        label: "01",
        title: "Audit the current flow",
        description:
          "Review existing screens, user goals, and drop-off points to pinpoint what actually needs fixing.",
      },
      {
        label: "02",
        title: "Structure the wireframes",
        description:
          "Agree on navigation, layout hierarchy, and copy placement before spending time on surface polish.",
      },
      {
        label: "03",
        title: "Design the full system",
        description:
          "Craft responsive desktop and mobile screens along with reusable components and interactive states.",
      },
      {
        label: "04",
        title: "Deliver dev-ready handoff",
        description:
          "Organize Figma frames, tokens, and behavior notes so your engineers (or I) can ship faithfully.",
      },
    ],
    proofPoints: [
      "Designed by an engineer who knows CSS layout, responsive breakpoints, and real implementation cost",
      "Every core screen includes desktop, mobile, empty, and error states",
      "Typography and hierarchy carry the page instead of heavy decorative gimmicks",
      "Optional direct transition straight into Next.js implementation",
    ],
    visualNodes: [
      {
        label: "Entry",
        value: "First 5 seconds",
        detail: "Clear value proposition, readable type scale, and obvious navigation.",
      },
      {
        label: "Clarity",
        value: "Decision & Trust",
        detail: "Structured proof, scannable layouts, and zero visual clutter.",
      },
      {
        label: "Action",
        value: "Core Task Flow",
        detail: "Low-friction forms, crisp controls, and thumb-friendly mobile targets.",
      },
      {
        label: "Recovery",
        value: "Real-World States",
        detail: "Loading skeletons, empty views, inline errors, and graceful fallbacks.",
      },
    ],
    faqs: [
      {
        question: "Can you both design and build the frontend?",
        answer:
          "Yes — that is the cleanest setup. Designing and implementing in the same hands cuts out translation loss and usually saves weeks.",
      },
      {
        question: "How do revisions work during the sprint?",
        answer:
          "We review wireframes first so big structural feedback happens early, then iterate on high-fidelity screens in focused rounds with clear async walkthroughs.",
      },
      {
        question: "What do I receive at the end?",
        answer:
          "An organized Figma file containing user flows, desktop and mobile screens, component library, type/color tokens, and written notes for engineering.",
      },
    ],
    relatedWork: {
      slug: "umbra",
      title: "Umbra",
      summary: "Research interface designed to filter and visualize complex NASA space biology datasets.",
    },
  },
  {
    id: "api-bot-ai-automation",
    title: "API, Bot & AI Automation",
    description:
      "Custom APIs, bots, and AI workflows with clear logging, validation, and human-in-the-loop safeguards.",
    metaDescription:
      "API integration, bot development, and AI workflow automation: custom endpoints, document extraction, internal tools, logging, and reliability safeguards.",
    heroTitle: "Automate repetitive ops without shipping a fragile black box.",
    heroLead:
      "I build practical APIs, bots, and AI-assisted pipelines with explicit input validation, audit logs, and fallback paths so your team saves hours every week without risking silent failures.",
    idealFor:
      "Teams losing hours every week to manual data entry, copy-pasting between CRMs and sheets, or brittle internal scripts.",
    engagementStyle: "Systems build",
    contactProjectType: "AI / automation",
    emailSubject: "API & AI Automation inquiry",
    ctaLabel: "Email about an automation",
    ctaTitle: "Have a manual workflow slowing the team down?",
    ctaBody:
      "Describe the trigger, the tools involved, and what the finished output should look like. I will reply within 24 hours with a clean architecture and scope.",
    icon: <IconRobot size={28} className="text-primary" />,
    timeRange: "3 – 10 Weeks",
    priceRange: "EGP 4,000 – 12,000+",
    theme: {
      eyebrow: "Systems & Automation",
      identity: "APIs, bots, and reliable AI pipelines",
      motif: "automation",
      accentClass: "border-border bg-card text-foreground",
      surfaceClass: "bg-card/55",
    },
    metrics: [
      { label: "Scope", value: "APIs, bots, AI flows" },
      { label: "Reliability", value: "Logs & fallbacks" },
      { label: "Control", value: "Human review gates" },
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Python",
      "REST & Webhooks",
      "LLM APIs",
      "Convex / Queues",
      "Telegram / Slack / WhatsApp",
    ],
    deliverables: [
      "End-to-end workflow map covering triggers, edges, and failure modes",
      "Custom backend APIs, webhooks, and CRM/tool integrations",
      "Internal or customer-facing bots and assistant workflows",
      "Structured AI document extraction, classification, or routing",
      "Schema validation, retry handling, and human approval checkpoints",
      "Run logs, alerting, and plain-English operations documentation",
    ],
    diagnostics: {
      title: "Manual work worth automating first",
      body: "Not every task belongs behind an LLM. The highest-return automations are repetitive, verifiable, and wired with clear fallback rules when an API times out or an input looks unusual.",
      items: [
        "Copying leads, orders, or tickets manually across two or more tools",
        "Parsing PDFs, invoices, or messages into clean structured records",
        "Triaging and routing inbound customer or support requests",
        "Answering recurring internal questions from docs or knowledge bases",
      ],
    },
    blueprint: {
      kicker: "Execution circuit",
      title: "Every automation follows a verifiable loop",
      body: "Instead of chaining prompts and hoping for the best, every step validates its input, logs its decision, and hands edge cases back to a human.",
    },
    process: [
      {
        label: "01",
        title: "Trace the manual loop",
        description:
          "Document exact inputs, tools, edge cases, and what a correct result looks like before writing code.",
      },
      {
        label: "02",
        title: "Set deterministic boundaries",
        description:
          "Decide what should be strict code vs. AI inference, and where human approval is required.",
      },
      {
        label: "03",
        title: "Build & stress-test",
        description:
          "Connect APIs, enforce strict schemas, test malformed inputs, and wire retry and timeout handling.",
      },
      {
        label: "04",
        title: "Add logs & hand over",
        description:
          "Ship clear execution logs, failure alerts, and documentation so your team can monitor it easily.",
      },
    ],
    proofPoints: [
      "Deterministic code handles routing and validation; AI is only used where it adds real leverage",
      "Structured JSON outputs checked against strict schemas before touching production data",
      "Explicit human-in-the-loop checkpoints for sensitive or customer-facing actions",
      "Full logging so you can see exactly why any run succeeded, retried, or paused",
    ],
    visualNodes: [
      {
        label: "Trigger",
        value: "Webhook / Schedule",
        detail: "Inbound email, form, CRM update, or timed batch job starts the run.",
      },
      {
        label: "Context",
        value: "Fetch & Normalize",
        detail: "Pulls verified records from your database, CRM, or knowledge base.",
      },
      {
        label: "Decision",
        value: "Rules & AI Layer",
        detail: "Applies business rules and schema-validated LLM extraction or routing.",
      },
      {
        label: "Guardrail",
        value: "Validate & Review",
        detail: "Checks confidence and constraints; escalates exceptions to a person.",
      },
      {
        label: "Action",
        value: "Write & Log",
        detail: "Updates target APIs cleanly and records a full audit trail.",
      },
    ],
    faqs: [
      {
        question: "Will this depend on expensive monthly no-code subscriptions?",
        answer:
          "Usually no. I prefer lightweight custom Node.js, Python, or Convex services you own directly — cheaper to run, version-controlled in Git, and much easier to debug than tangled visual workflows.",
      },
      {
        question: "How do you prevent AI hallucinations from corrupting data?",
        answer:
          "Every model response is validated against strict schemas before writing anywhere. Low-confidence or out-of-policy cases route to a human review queue instead of silently executing.",
      },
      {
        question: "Can you integrate with our existing CRM or internal tools?",
        answer:
          "Yes. If the tool exposes a REST API, webhook, database, or CSV/email hook, we can wire it cleanly into the pipeline.",
      },
    ],
    relatedWork: {
      slug: "repai",
      title: "RepAi",
      summary: "Top 7 finalist (of 88 teams) at GDG Cairo AI Finance Hackathon — AI verification and rewards workflow.",
    },
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    description:
      "Technical SEO audits, search-intent structure, and conversion fixes grounded in real site performance and analytics.",
    metaDescription:
      "Technical SEO and growth engineering: crawl and speed audits, structured metadata, search-intent pages, conversion cleanup, and clear monthly reporting.",
    heroTitle: "Fix the technical leaks and build search traffic that compounds.",
    heroLead:
      "I approach SEO as an engineer: clean up crawlability, speed, and metadata first, align pages with real buyer search intent, and tighten conversion paths so visits turn into inquiries.",
    idealFor:
      "Businesses with a real offer and live website that barely show up in search or fail to turn existing visits into emails and leads.",
    engagementStyle: "Audit or monthly",
    contactProjectType: "SEO & growth",
    emailSubject: "SEO & Growth audit inquiry",
    ctaLabel: "Email for an SEO audit",
    ctaTitle: "Want to find out where search traffic is leaking?",
    ctaBody:
      "Send your site URL, target market, and what counts as a qualified lead. I will reply within 24 hours on whether a one-time technical audit or monthly cycle makes more sense.",
    icon: <IconChartBar size={28} className="text-primary" />,
    timeRange: "Audit or Monthly",
    priceRange: "EGP 1,500 – 5,000 / mo",
    theme: {
      eyebrow: "Technical SEO & Growth",
      identity: "Crawl health, search intent, conversion clarity",
      motif: "growth",
      accentClass: "border-border bg-card text-foreground",
      surfaceClass: "bg-card/45",
    },
    metrics: [
      { label: "Format", value: "One-off audit or monthly" },
      { label: "Focus", value: "Technical + intent SEO" },
      { label: "Reporting", value: "Plain monthly notes" },
    ],
    stack: [
      "Google Search Console",
      "Core Web Vitals",
      "Schema / JSON-LD",
      "Technical Crawl Audits",
      "On-Page Architecture",
      "Conversion UX",
    ],
    deliverables: [
      "Full technical SEO audit covering indexing, speed, and site structure",
      "Prioritized engineering fix list (or direct implementation on your stack)",
      "Keyword and search-intent mapping tied to commercial pages",
      "Metadata, OpenGraph, canonical, sitemap, and JSON-LD structured data",
      "Landing page clarity and conversion-path review",
      "Straightforward monthly report showing what moved and what is next",
    ],
    diagnostics: {
      title: "Why most small-business sites stay invisible",
      body: "Search visibility rarely fails for one dramatic reason. Usually it is a pile of fixable issues: slow mobile pages, broken metadata, generic copy that matches zero real queries, and unclear next steps.",
      items: [
        "Pages are indexed poorly, missing canonicals, or weighed down by heavy assets",
        "Headlines describe the company internally instead of what buyers search for",
        "Local signals, structured schema, and internal links are incomplete",
        "Visitors land on the page but hit friction before reaching out",
      ],
    },
    blueprint: {
      kicker: "Growth loop",
      title: "Fix the foundation before chasing volume",
      body: "Traffic only matters when the site loads fast, answers the query directly, and gives the right visitor an easy way to get in touch.",
    },
    process: [
      {
        label: "01",
        title: "Audit the baseline",
        description:
          "Inspect Search Console, crawl health, page speed, structured data, and current conversion friction.",
      },
      {
        label: "02",
        title: "Clear technical blockers",
        description:
          "Fix indexing issues, metadata, canonicals, schema, and Core Web Vitals bottlenecks in priority order.",
      },
      {
        label: "03",
        title: "Align pages with intent",
        description:
          "Structure service pages and content around the specific terms your actual customers search.",
      },
      {
        label: "04",
        title: "Measure & iterate",
        description:
          "Track impressions, clicks, and real inquiries each month and focus effort on what actually converts.",
      },
    ],
    proofPoints: [
      "Engineering-level technical fixes — not just a generic PDF checklist",
      "Keyword strategy anchored in buyer intent instead of vanity traffic",
      "Direct landing page and UX recommendations to turn visits into inquiries",
      "Short, plain-spoken monthly summaries without padded vanity metrics",
    ],
    visualNodes: [
      {
        label: "Crawl & Speed",
        value: "Technical Base",
        detail: "Indexing, sitemaps, canonicals, JSON-LD, and mobile Core Web Vitals.",
      },
      {
        label: "Intent",
        value: "Buyer Demand",
        detail: "Mapping pages directly to high-intent search queries in your market.",
      },
      {
        label: "Structure",
        value: "On-Page Clarity",
        detail: "Clean headings, internal linking, and direct copy that answers fast.",
      },
      {
        label: "Conversion",
        value: "Visit to Inquiry",
        detail: "Removing friction between landing on a page and emailing or booking.",
      },
      {
        label: "Feedback",
        value: "Monthly Iteration",
        detail: "Search Console & analytics review guiding the next month's priorities.",
      },
    ],
    faqs: [
      {
        question: "Can I start with a single technical audit instead of a retainer?",
        answer:
          "Yes. Many clients start with a one-time technical and on-page audit (with optional direct code fixes) and only move to monthly work if they want ongoing content and iteration.",
      },
      {
        question: "Can you implement the technical SEO fixes in code directly?",
        answer:
          "Yes. Because I am a full-stack engineer, I can ship the metadata, JSON-LD schema, sitemap, image optimization, and speed fixes directly in Next.js, React, or standard web stacks.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical and conversion improvements help immediately. Organic search gains compound over 2–4 months as search engines recrawl updated structure and new intent-matched pages.",
      },
    ],
    relatedWork: {
      slug: "masons",
      title: "Masons Studio",
      summary: "Fast statically rendered architecture with structured metadata and clear inbound positioning.",
    },
  },
];

export function getOrderedServices(): Service[] {
  return [...services].sort(
    (a, b) =>
      SERVICE_ORDER.indexOf(a.id as (typeof SERVICE_ORDER)[number]) -
      SERVICE_ORDER.indexOf(b.id as (typeof SERVICE_ORDER)[number])
  );
}
