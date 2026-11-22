import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import { IconMapPin } from "@tabler/icons-react";

interface ExperienceMetric {
  value: string;
  label: string;
}

interface ExperienceDossierProps {
  organization: React.ReactNode;
  role: string;
  category: string;
  location: string;
  current?: boolean;
  featured?: boolean;
  lead: React.ReactNode;
  metrics?: ExperienceMetric[];
  highlights?: React.ReactNode[];
  tags?: string[];
  extra?: React.ReactNode;
}

function ExperienceDossier({
  organization,
  role,
  category,
  location,
  current = false,
  featured = false,
  lead,
  metrics,
  highlights,
  tags,
  extra,
}: ExperienceDossierProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
        featured
          ? "border-border/75 bg-card/70 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.2)]"
          : "border-border/60 bg-card/45"
      }`}
    >
      <div className="p-5 sm:p-7 lg:p-9">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{category}</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span className="inline-flex items-center gap-1">
              <IconMapPin size={12} className="text-primary/80" />
              {location}
            </span>
          </div>

          {current ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Current
            </span>
          ) : null}
        </div>

        {/* Grand Title + Role */}
        <div className="mt-4">
          <h3 className="font-serif text-2xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-3xl">
            {organization}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-foreground/85 sm:text-base">
            {role}
          </p>
        </div>

        {/* Lead statement */}
        <div className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lead}
        </div>

        {/* Optional impact metric band */}
        {metrics && metrics.length > 0 ? (
          <dl
            className={`mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border/60 bg-background/60 p-4 sm:gap-0 sm:divide-x sm:divide-border/50 sm:p-5 ${
              metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
            }`}
          >
            {metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className={`${
                  idx === 2 && metrics.length === 3
                    ? "col-span-2 border-t border-border/50 pt-3.5 sm:col-span-1 sm:border-t-0 sm:pt-0 sm:pl-5"
                    : idx === 0
                      ? "sm:pr-5"
                      : idx === metrics.length - 1
                        ? "sm:pl-5"
                        : "sm:px-5"
                }`}
              >
                <dd className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {metric.value}
                </dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        ) : null}

        {/* Ruled numbered highlights */}
        {highlights && highlights.length > 0 ? (
          <ol className="mt-6 divide-y divide-border/45 border-t border-border/50">
            {highlights.map((item, idx) => (
              <li
                key={idx}
                className="grid grid-cols-[auto_1fr] gap-3.5 py-3.5 first:pt-4 last:pb-0 sm:gap-4 sm:py-4"
              >
                <span className="mt-0.5 font-mono text-[11px] text-primary">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <div className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item}
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {/* Optional custom extra sub-blocks */}
        {extra ? <div className="mt-6">{extra}</div> : null}

        {/* Tech / Capabilities strip */}
        {tags && tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border/50 pt-5 sm:gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

const STUDIO_TRACK_RECORD = [
  {
    tag: "Commercial Ops · 7M+ EGP/mo",
    title: "Safety Source Sales Platform",
    summary:
      "Real-time Convex and Next.js analytics platform powering a 12-person sales team and tracking 7M+ EGP in monthly commercial volume as their single source of truth.",
  },
  {
    tag: "Direct Client Builds · 20+ Shipped",
    title: "Founder & Team Engagements",
    summary:
      "Custom web applications, high-converting sites, internal dashboards, and workflow automations delivered directly to happy clients with clear milestones and clean handoffs.",
  },
] as const;

export function ExperienceSection() {
  const data: TimelineEntry[] = [
    {
      title: "Sep 2022 – Present",
      subtitle: "Ain Shams University",
      current: true,
      content: (
        <ExperienceDossier
          key="edu-asu"
          organization={
            <LinkPreview
              url="https://www.asu.edu.eg/"
              className="underline decoration-border/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              Ain Shams University
            </LinkPreview>
          }
          role="B.Sc. in Computer Science & Statistics"
          category="Education & Leadership"
          location="Cairo, Egypt"
          current
          lead="Combining formal foundations in computer science, algorithms, and statistics with hands-on software engineering, machine learning, and student technical leadership."
          highlights={[
            <>
              Rebuilt{" "}
              <Link
                href="/logs/msp"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
              >
                Microsoft Student Partners (MSP ASU)
              </Link>{" "}
              with engineering standards and launched the Audio AI committee,
              Resonance.
            </>,
            <>
              Led Human Resources operations at the{" "}
              <Link
                href="/logs/osc"
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
              >
                Open Source Community (OSC)
              </Link>
              , mentoring students and running technical events across campus.
            </>,
          ]}
          tags={[
            "Computer Science",
            "Statistics",
            "Machine Learning",
            "MSP ASU",
            "OSC",
          ]}
        />
      ),
    },
    {
      title: "Sep 2024",
      subtitle: "CIB Egypt · Internship",
      content: (
        <ExperienceDossier
          key="intern-cib"
          organization="CIB Egypt"
          role="Fintech Intern"
          category="Banking & Fintech"
          location="Cairo, Egypt"
          lead="Completed a focused fintech internship at Commercial International Bank, one of Egypt's leading private-sector banks."
          highlights={[
            "Studied core banking operations, financial systems architecture, and institutional risk strategy.",
            "Sharpened structured communication and analytical problem-solving in a high-trust enterprise setting.",
          ]}
          tags={["Fintech", "Banking Operations", "Risk Strategy"]}
        />
      ),
    },
    {
      title: "Nov 2024 – May 2025",
      subtitle: "DEPI · Internship",
      content: (
        <ExperienceDossier
          key="intern-depi"
          organization="Digital Egypt Pioneers Initiative (DEPI)"
          role="Full-Stack Web Developer Intern"
          category="Engineering Internship"
          location="Cairo, Egypt"
          lead="6-month intensive engineering program focused on building production MERN applications, containerization, UI/UX fundamentals, and maintainable delivery workflows."
          highlights={[
            "Built and refined full-stack React applications using TypeScript, Tailwind CSS, Node.js, Express, and Docker.",
            "Practiced UI/UX principles, clean architecture, documentation standards, and unit testing across team projects.",
            <>
              Shipped the capstone project{" "}
              <strong className="font-medium text-foreground">Convo</strong>, a
              full-stack real-time chat application built from scratch with
              React and Node.js.
            </>,
          ]}
          tags={["React", "TypeScript", "Node.js", "Express", "Docker"]}
        />
      ),
    },
    {
      title: "Dec 2025 – Feb 2026",
      subtitle: "Safety Source · Cairo",
      content: (
        <ExperienceDossier
          key="safety-source"
          organization="Safety Source"
          role="Freelance Full-Stack Engineer"
          category="Client Engineering"
          location="Cairo, Egypt"
          featured
          lead="Architected and delivered a live commercial analytics platform that unified sales tracking across the company and retired manual spreadsheet reporting."
          metrics={[
            { value: "7M+ EGP", label: "Monthly sales tracked" },
            { value: "12 Seats", label: "Active sales team" },
            { value: "Real-time", label: "Convex reactive sync" },
          ]}
          highlights={[
            <>
              Built a real-time analytics dashboard on{" "}
              <strong className="font-medium text-foreground">
                Convex&apos;s reactive backend
              </strong>{" "}
              (Next.js, Tailwind CSS) tracking{" "}
              <strong className="font-medium text-foreground">
                7M+ EGP in monthly sales
              </strong>{" "}
              for a 12-person sales team, replacing fragmented spreadsheets as
              the single source of truth.
            </>,
          ]}
          tags={[
            "Next.js",
            "Convex",
            "TypeScript",
            "Tailwind CSS",
            "Real-Time Analytics",
          ]}
        />
      ),
    },
    {
      title: "Sep 2023 – Present",
      subtitle: "Masons · Founder",
      current: true,
      content: (
        <ExperienceDossier
          key="founded-masons"
          organization={
            <LinkPreview
              url="https://wearemasons.com"
              className="underline decoration-border/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              Masons
            </LinkPreview>
          }
          role="Founder & Principal Engineer"
          category="Software Studio"
          location="Cairo, Egypt"
          current
          featured
          lead="A commercial software studio in Cairo building production web platforms, internal business systems, and proprietary software for founders and operating teams."
          metrics={[
            { value: "10M+ EGP", label: "Monthly client volume live" },
            { value: "20+", label: "Production builds shipped" },
            { value: "Direct", label: "Senior end-to-end delivery" },
          ]}
          highlights={[
            "Generated consistent studio revenue through direct client delivery — including Safety Source's live Convex sales platform tracking 7M+ EGP/mo across a 12-person sales team.",
            "Delivered 20+ production websites, web apps, and operational tools for satisfied clients with fixed scopes, fast iteration, and zero agency handoff layers.",
            "Built reusable Next.js, TypeScript, and real-time backend foundations that cut delivery time while keeping every client codebase maintainable after launch.",
          ]}
          extra={
            <div className="space-y-6 border-t border-border/50 pt-6">
              {/* Client delivery */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Commercial delivery
                </p>
                <div className="mt-3 divide-y divide-border/45 rounded-xl border border-border/60 bg-background/50">
                  {STUDIO_TRACK_RECORD.map((item) => (
                    <div key={item.title} className="px-4 py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-serif text-base font-semibold text-foreground sm:text-lg">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                          {item.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-house studio products */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Studio products
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/60 p-4 sm:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-serif text-lg font-semibold text-foreground">
                        <LinkPreview
                          url="https://wearemasons.com"
                          className="underline decoration-border underline-offset-4 hover:text-primary"
                        >
                          Rafiqi
                        </LinkPreview>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                        Consumer · AI Health
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      AI-assisted mental health platform built specifically for
                      Egyptians, addressing the gap where formal support feels
                      expensive, inaccessible, or stigmatized. Designed around
                      local language and cultural context with private
                      check-ins, guided reflection, and calm everyday support.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-background/60 p-4 sm:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-serif text-lg font-semibold text-foreground">
                        <LinkPreview
                          url="https://agencykit.app"
                          className="underline decoration-border underline-offset-4 hover:text-primary"
                        >
                          Agency Kit
                        </LinkPreview>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                        B2B · Studio Ops
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Client operations platform born out of running Masons&apos;
                      own engagements, built to replace scattered chats, docs,
                      and status spreadsheets. Centralizes client onboarding,
                      milestone tracking, deliverables, and project handoffs so
                      small studios operate with agency-grade clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
          tags={[
            "Client Delivery",
            "Next.js",
            "Convex",
            "TypeScript",
            "Product Design",
            "AI Systems",
          ]}
        />
      ),
    },
    {
      title: "Jul 2026 – Present",
      subtitle: "Concentrix · Cairo",
      current: true,
      content: (
        <ExperienceDossier
          key="concentrix"
          organization="Concentrix"
          role="Technical Support Specialist – Consumer Electronics Client"
          category="Technical Operations"
          location="Cairo, Egypt"
          current
          featured
          lead="Frontline technical diagnostics and live resolution for a US consumer electronics account, operating across interconnected voice, CRM, and remote diagnostic systems under strict SLA targets."
          metrics={[
            { value: "Multi-tool", label: "Live diagnostics stack" },
            { value: "SLA-driven", label: "Adherence & quality" },
          ]}
          highlights={[
            "Diagnose and resolve live customer issues across a multi-tool stack: softphone, CRM and ticketing, knowledge base, remote diagnostics, and internal scheduling and adherence systems, switching between them in real time.",
            "Work inside a live queue governed by adherence, availability, and quality metrics; follow intraday schedule changes and ad hoc requests without dropping coverage.",
            "Triage and escalate issues with clear root-cause notes, and pick up new tools and process changes fast through self-directed learning.",
          ]}
          tags={[
            "Remote Diagnostics",
            "CRM & Ticketing",
            "Root-Cause Triage",
            "SLA Adherence",
          ]}
        />
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
