"use client";

import { useState, useEffect } from "react";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconCopy,
  IconMail,
} from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { site } from "@/lib/site";

const INQUIRY_TOPICS = [
  {
    id: "General",
    label: "General Inquiry",
    subject: "Project Inquiry",
  },
  {
    id: "Web app",
    label: "Web Development",
    subject: "Inquiry — Web Development",
  },
  {
    id: "UI/UX design",
    label: "UI/UX Design",
    subject: "Inquiry — UI/UX Design",
  },
  {
    id: "AI / automation",
    label: "AI & Automation",
    subject: "Inquiry — API, Bot & AI Automation",
  },
  {
    id: "SEO & growth",
    label: "SEO & Growth",
    subject: "Inquiry — SEO & Digital Marketing",
  },
] as const;

const BRIEF_PROMPTS = [
  {
    index: "01",
    title: "What you're building",
    detail: "A short summary of the product, site, or problem you want solved.",
  },
  {
    index: "02",
    title: "Your timeline",
    detail: "When you want it live, or whether you're still planning ahead.",
  },
  {
    index: "03",
    title: "Links or notes",
    detail: "A live URL, Figma file, or rough notes. Doesn't need to be polished.",
  },
] as const;

type TopicId = (typeof INQUIRY_TOPICS)[number]["id"];

function buildMailtoHref(topic: (typeof INQUIRY_TOPICS)[number]) {
  const subject = encodeURIComponent(topic.subject);
  const body = encodeURIComponent(
    [
      "Hi Seif,",
      "",
      "What we're building:",
      "",
      "Target timeline:",
      "",
      "Relevant links or context:",
      "",
    ].join("\n")
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function Contact() {
  const [time, setTime] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>("General");
  const [copied, setCopied] = useState(false);

  const headingRef = useReveal<HTMLDivElement>();
  const cardRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 30_000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleSelectProjectType = (event: Event) => {
      const customEvent = event as CustomEvent<{ projectType?: string }>;
      const nextType = customEvent.detail?.projectType;
      if (
        nextType &&
        INQUIRY_TOPICS.some((topic) => topic.id === nextType)
      ) {
        setSelectedTopicId(nextType as TopicId);
      }
    };

    window.addEventListener("select-project-type", handleSelectProjectType);
    return () =>
      window.removeEventListener(
        "select-project-type",
        handleSelectProjectType
      );
  }, []);

  const activeTopic =
    INQUIRY_TOPICS.find((topic) => topic.id === selectedTopicId) ??
    INQUIRY_TOPICS[0];
  const mailtoHref = buildMailtoHref(activeTopic);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      track("contact_email_copy", { topic: activeTopic.id });
      toast.success("Email address copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      toast.error(`Couldn't copy automatically — email ${site.email}`);
    }
  };

  const socials = [
    {
      href: site.socials.find((item) => item.label === "LinkedIn")!.href,
      icon: IconBrandLinkedin,
      label: "LinkedIn",
    },
    {
      href: site.socials.find((item) => item.label === "GitHub")!.href,
      icon: IconBrandGithub,
      label: "GitHub",
    },
    {
      href: site.socials.find((item) => item.label === "X")!.href,
      icon: IconBrandX,
      label: "X",
    },
    {
      href: site.socials.find((item) => item.label === "Instagram")!.href,
      icon: IconBrandInstagram,
      label: "Instagram",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 opacity-20 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Contact</span>
                {time ? (
                  <>
                    <span aria-hidden className="text-border">
                      /
                    </span>
                    <span>
                      Cairo <span className="text-foreground">{time}</span>
                    </span>
                  </>
                ) : null}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
                Send an{" "}
                <span className="font-light italic text-primary">email.</span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              Tell me what you&apos;re building and when you want it live. I
              reply myself, usually within a day.
            </p>
          </header>
        </div>

        {/* Direct inquiry surface */}
        <div
          ref={cardRef}
          className="reveal reveal-delay-1 mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card/65 backdrop-blur-sm sm:mt-14 md:mt-20"
        >
          <div className="grid grid-cols-1 divide-y divide-border/50 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            {/* Left: Email funnel */}
            <div className="flex flex-col justify-between p-5 sm:p-10 lg:col-span-7 xl:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:gap-x-4 sm:tracking-[0.18em]">
                  <span className="inline-flex items-center gap-2 text-foreground">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    />
                    {site.availability}
                  </span>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span>{site.responseTime}</span>
                </div>

                {/* Subject selector */}
                <div className="mt-7 sm:mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Topic (optional)
                  </p>
                  <div
                    role="group"
                    aria-label="Email subject topic"
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {INQUIRY_TOPICS.map((topic) => {
                      const active = topic.id === activeTopic.id;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopicId(topic.id)}
                          aria-pressed={active}
                          className={`min-h-[38px] rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border/70 bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                          }`}
                        >
                          {topic.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct email link */}
                <div className="mt-8 border-t border-border/50 pt-6 sm:mt-10 sm:pt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={mailtoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("contact_email_click", { topic: activeTopic.id })
                    }
                    className="group mt-2.5 inline-flex max-w-full flex-wrap items-baseline gap-1.5 break-words font-serif text-[1.45rem] font-bold tracking-tight text-foreground decoration-primary/40 decoration-1 underline-offset-[6px] transition-colors hover:text-primary hover:underline sm:mt-3 sm:gap-2 sm:text-4xl sm:underline-offset-[8px] xl:text-[2.65rem]"
                  >
                    <span>{site.email}</span>
                    <IconArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-7 sm:w-7"
                    />
                  </a>
                </div>
              </div>

              {/* Primary & secondary actions */}
              <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href={mailtoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("contact_email_click", { topic: activeTopic.id })
                  }
                  className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  <IconMail size={15} />
                  Write an Email
                  <IconArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-border/70 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  {copied ? (
                    <>
                      <IconCheck size={14} className="text-primary" />
                      Copied
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} />
                      Copy Address
                    </>
                  )}
                </button>

                {site.bookingUrl ? (
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                  >
                    Book a call <IconArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
            </div>

            {/* Right: What to include + socials */}
            <div className="flex flex-col justify-between bg-background/40 p-5 sm:p-10 lg:col-span-5 xl:p-12">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  What helps most
                </p>
                <ol className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
                  {BRIEF_PROMPTS.map((item) => (
                    <li
                      key={item.index}
                      className="grid grid-cols-[auto_1fr] gap-3.5 border-b border-border/40 pb-4 last:border-b-0 last:pb-0 sm:gap-4 sm:pb-5"
                    >
                      <span className="mt-0.5 font-mono text-[11px] text-primary">
                        {item.index}
                      </span>
                      <div>
                        <p className="font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border-t border-border/50 pt-6 sm:mt-10 sm:pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Elsewhere
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4 sm:gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
                    >
                      <social.icon size={15} />
                      <span>{social.label}</span>
                    </a>
                  ))}
                  {site.whatsapp ? (
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
                    >
                      <IconBrandWhatsapp size={15} />
                      <span>WhatsApp</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
