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
}

export interface Service {
  id: string;
  title: string;
  description: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  icon: JSX.Element;
  timeRange: string;
  priceRange: string;
  theme: ServicePageTheme;
  metrics: ServiceMetric[];
  deliverables: string[];
  diagnostics: ServiceSection;
  process: ServiceProcessStep[];
  proofPoints: string[];
  visualNodes: ServiceVisualNode[];
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Build stable, fast product layers with clear architecture, clean delivery, and launch-ready foundations.",
    metaDescription:
      "Web development services for scalable Next.js and React products, including architecture, integrations, performance, QA, and launch support.",
    heroTitle: "Turn the messy idea into a product that can actually ship.",
    heroLead:
      "I plan and build web products around the parts that usually break later: architecture, data flow, performance, integrations, and the path from first build to launch.",
    ctaLabel: "Start a Web Project",
    ctaTitle: "Ready to build the product layer?",
    ctaBody:
      "Bring the goal, the current constraints, and the rough timeline. I will help shape the build into a realistic first scope.",
    icon: <IconCode size={32} className="text-primary" />,
    timeRange: "4 - 12 Weeks",
    priceRange: "EGP8,000 - EGP25,000+",
    theme: {
      eyebrow: "Architecture Ledger",
      identity: "Technical, precise, product-focused",
      motif: "architecture",
      accentClass: "border-foreground/25 bg-foreground text-background",
      surfaceClass: "bg-card/55",
    },
    metrics: [
      { label: "Build Mode", value: "MVP to production" },
      { label: "Core Stack", value: "Next.js / React" },
      { label: "Focus", value: "Scale, speed, maintainability" },
    ],
    deliverables: [
      "Product architecture and page/application structure",
      "Responsive frontend implementation",
      "Backend routes, APIs, and third-party integrations",
      "Authentication, forms, and content workflows when needed",
      "Performance, accessibility, and deployment checks",
      "Launch support with clear handoff notes",
    ],
    diagnostics: {
      title: "Risks removed before launch",
      body: "The work is shaped around preventing common launch drag: vague scope, fragile data flow, slow pages, unclear ownership, and code that becomes hard to extend after the first release.",
      items: [
        "Requirements translated into buildable milestones",
        "Data and integration edges mapped early",
        "Performance budgets considered before polish",
        "Deployment path checked before the final week",
      ],
    },
    process: [
      {
        label: "01",
        title: "Scope the product",
        description:
          "Clarify users, workflows, must-have features, data sources, and launch constraints.",
      },
      {
        label: "02",
        title: "Design the architecture",
        description:
          "Define routes, components, state, integrations, and the safest build sequence.",
      },
      {
        label: "03",
        title: "Build and test",
        description:
          "Implement the product in visible increments with responsive UI, edge states, and QA passes.",
      },
      {
        label: "04",
        title: "Launch cleanly",
        description:
          "Prepare deployment, verify production behavior, and leave the project understandable.",
      },
    ],
    proofPoints: [
      "Clear architecture instead of one-off page assembly",
      "Responsive interfaces that survive real content",
      "Integrations handled as product flows, not afterthoughts",
      "A launch path that includes testing, deployment, and handoff",
    ],
    visualNodes: [
      { label: "Frontend", value: "Interface layer" },
      { label: "Backend", value: "Data and logic" },
      { label: "Integrations", value: "Payments, CMS, APIs" },
      { label: "Deployment", value: "Production path" },
      { label: "Performance", value: "Fast by design" },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Shape unclear product flows into usable interfaces with strong hierarchy, accessible patterns, and polished interaction states.",
    metaDescription:
      "UI/UX design services for product flows, prototypes, design systems, accessibility, responsive screens, and developer-ready handoff.",
    heroTitle: "Make the product easier to understand, trust, and use.",
    heroLead:
      "I turn rough workflows into deliberate screens: clear user paths, persuasive hierarchy, usable components, and enough detail for development to move without guessing.",
    ctaLabel: "Plan a Design Sprint",
    ctaTitle: "Need a sharper product experience?",
    ctaBody:
      "Send the product goal, the screens or flows that feel weak, and what users need to do next. I will help define the sprint.",
    icon: <IconPalette size={32} className="text-primary" />,
    timeRange: "3 - 8 Weeks",
    priceRange: "EGP4,000 - EGP10,000+",
    theme: {
      eyebrow: "Interface Studio",
      identity: "Human, visual, product-experience led",
      motif: "interface",
      accentClass: "border-primary/30 bg-primary/10 text-foreground",
      surfaceClass: "bg-background",
    },
    metrics: [
      { label: "Output", value: "Flows, screens, systems" },
      { label: "Mode", value: "Design sprint" },
      { label: "Focus", value: "Clarity, trust, usability" },
    ],
    deliverables: [
      "User flow and information hierarchy",
      "Wireframes for core paths",
      "High-fidelity responsive screens",
      "Interaction and empty/loading/error states",
      "Design system foundations and reusable components",
      "Developer handoff notes for implementation",
    ],
    diagnostics: {
      title: "Problems the design work targets",
      body: "The page, dashboard, or app should make the next action obvious. The design process identifies where users lose context, hesitate, distrust the product, or run into inconsistent interface behavior.",
      items: [
        "Confusing navigation or unclear screen priority",
        "Weak conversion paths and low-trust layouts",
        "Missing responsive and interaction states",
        "Inconsistent visual language across the product",
      ],
    },
    process: [
      {
        label: "01",
        title: "Map the experience",
        description:
          "Understand the user, the task, the current friction, and the product outcome.",
      },
      {
        label: "02",
        title: "Structure the flow",
        description:
          "Create wireframes and journey logic before investing in surface-level polish.",
      },
      {
        label: "03",
        title: "Design the interface",
        description:
          "Build a polished visual system with responsive layouts and interaction states.",
      },
      {
        label: "04",
        title: "Prepare the handoff",
        description:
          "Document behavior, states, and reusable decisions so implementation stays faithful.",
      },
    ],
    proofPoints: [
      "Screen hierarchy that explains the product without extra instruction",
      "States for loading, errors, empty content, and mobile behavior",
      "Design decisions tied to user action, not decoration",
      "Handoff that reduces ambiguity for development",
    ],
    visualNodes: [
      { label: "Entry", value: "First impression" },
      { label: "Decision", value: "Compare and trust" },
      { label: "Action", value: "Complete the task" },
      { label: "State", value: "Recover and continue" },
    ],
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    description:
      "Improve search visibility, qualified traffic, and conversion paths through technical audits, content strategy, and reporting.",
    metaDescription:
      "SEO and digital marketing services for technical SEO audits, content strategy, local SEO, conversion improvement, and monthly reporting.",
    heroTitle: "Build a search engine that compounds instead of guessing.",
    heroLead:
      "I treat growth as an operating system: diagnose where traffic leaks, fix the technical foundation, build content around intent, and measure what actually moves visitors toward action.",
    ctaLabel: "Request an SEO Audit",
    ctaTitle: "Want to know where growth is leaking?",
    ctaBody:
      "Share the site, market, and current traffic picture. I will help identify whether the first move should be audit, content, technical cleanup, or conversion work.",
    icon: <IconChartBar size={32} className="text-primary" />,
    timeRange: "Ongoing / Monthly",
    priceRange: "EGP1,500 - EGP5,000 / month",
    theme: {
      eyebrow: "Growth Observatory",
      identity: "Analytical, measured, compounding",
      motif: "growth",
      accentClass: "border-accent/60 bg-accent/25 text-foreground",
      surfaceClass: "bg-card/40",
    },
    metrics: [
      { label: "Engagement", value: "Audit or monthly" },
      { label: "Focus", value: "Qualified traffic" },
      { label: "Cadence", value: "Measure, fix, publish" },
    ],
    deliverables: [
      "Technical SEO audit and prioritized fixes",
      "Keyword and search-intent research",
      "Content strategy and page recommendations",
      "Local SEO and on-page optimization",
      "Conversion path and landing page feedback",
      "Analytics review and monthly reporting",
    ],
    diagnostics: {
      title: "Where growth usually leaks",
      body: "Most sites do not have one SEO problem. They have a chain of small leaks across crawlability, page quality, search intent, content depth, local signals, and conversion clarity.",
      items: [
        "Pages exist, but do not match high-intent searches",
        "Technical issues limit crawlability or page speed",
        "Traffic arrives but does not move toward contact",
        "Reporting shows activity without decision-making clarity",
      ],
    },
    process: [
      {
        label: "01",
        title: "Audit the baseline",
        description:
          "Review technical health, current rankings, content quality, analytics, and conversion paths.",
      },
      {
        label: "02",
        title: "Prioritize the fixes",
        description:
          "Separate urgent technical blockers from content and conversion opportunities.",
      },
      {
        label: "03",
        title: "Build the content engine",
        description:
          "Create or improve pages around search intent, relevance, and business value.",
      },
      {
        label: "04",
        title: "Report and refine",
        description:
          "Track progress, inspect what changed, and adjust the next monthly cycle.",
      },
    ],
    proofPoints: [
      "SEO recommendations tied to business intent",
      "Technical fixes prioritized by impact",
      "Content direction based on search behavior",
      "Reporting that informs the next decision",
    ],
    visualNodes: [
      { label: "Technical Health", value: "Crawl, speed, structure" },
      { label: "Intent", value: "Search demand" },
      { label: "Content", value: "Pages that answer" },
      { label: "Conversion", value: "Visitor to lead" },
      { label: "Reporting", value: "Next action" },
    ],
  },
  {
    id: "api-bot-ai-automation",
    title: "API, Bot & AI Automation",
    description:
      "Design APIs, bots, and AI workflows that remove repetitive work while keeping safeguards, logging, and human control clear.",
    metaDescription:
      "API, bot, and AI automation services for workflow automation, chatbots, integrations, data pipelines, document processing, and operational safeguards.",
    heroTitle:
      "Replace repeated manual work with systems that know when to stop.",
    heroLead:
      "I design automation around the full operational loop: trigger, context, decision, integration, output, review, and logging. The result is useful automation, not a fragile demo.",
    ctaLabel: "Scope an Automation",
    ctaTitle: "Have a workflow that keeps repeating?",
    ctaBody:
      "Describe the trigger, the tools involved, the current manual steps, and what a correct output looks like. I will help scope the safest automation path.",
    icon: <IconRobot size={32} className="text-primary" />,
    timeRange: "3 - 10 Weeks",
    priceRange: "EGP4,000 - EGP12,000+",
    theme: {
      eyebrow: "Automation Circuit",
      identity: "Operational, systems-led, safeguard-aware",
      motif: "automation",
      accentClass: "border-foreground bg-foreground text-background",
      surfaceClass: "bg-foreground text-background",
    },
    metrics: [
      { label: "Systems", value: "APIs, bots, AI flows" },
      { label: "Focus", value: "Reduce manual work" },
      { label: "Control", value: "Logs, review, fallbacks" },
    ],
    deliverables: [
      "Workflow mapping from trigger to output",
      "Custom APIs and third-party integrations",
      "Chatbots and conversational interfaces",
      "AI-assisted data or document processing",
      "Validation, fallback, and approval logic",
      "Monitoring, logs, and handoff documentation",
    ],
    diagnostics: {
      title: "Manual work worth automating",
      body: "The best automations are repetitive enough to matter, structured enough to verify, and important enough to deserve safeguards. The goal is to reduce load without hiding failure.",
      items: [
        "Copying information between tools",
        "Answering repeated operational questions",
        "Turning messy documents into structured records",
        "Routing requests to the right person or system",
      ],
    },
    process: [
      {
        label: "01",
        title: "Trace the workflow",
        description:
          "Document triggers, inputs, systems, edge cases, approvals, and expected outputs.",
      },
      {
        label: "02",
        title: "Design the circuit",
        description:
          "Choose the API, bot, AI, and human-review boundaries before implementation.",
      },
      {
        label: "03",
        title: "Build the automation",
        description:
          "Connect systems, validate data, handle errors, and expose useful operational states.",
      },
      {
        label: "04",
        title: "Monitor and hand off",
        description:
          "Add logs, fallback paths, and documentation so the workflow can be trusted.",
      },
    ],
    proofPoints: [
      "Automation scoped around real operational behavior",
      "Human review points for risky decisions",
      "Fallbacks and logs for diagnosing failures",
      "Integrations designed as maintainable workflows",
    ],
    visualNodes: [
      { label: "Trigger", value: "Event or request" },
      { label: "Context", value: "Data collection" },
      { label: "AI / Logic", value: "Decision layer" },
      { label: "Integration", value: "API action" },
      { label: "Review", value: "Human control" },
      { label: "Output", value: "Logged result" },
    ],
  },
];
