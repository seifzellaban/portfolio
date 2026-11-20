"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import { site } from "@/lib/site";

const projectTypes = [
  "Website",
  "Web app",
  "UI/UX design",
  "AI / automation",
  "Other",
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const fieldClasses =
  "border-border/50 focus:border-primary/50 aria-[invalid=true]:border-destructive";

export function Contact() {
  const [time, setTime] = useState("");
  const headingRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();

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

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
      website: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        if (!response.ok) throw new Error("Failed to send message");
        track("contact_submit", { type: value.projectType || "unspecified" });
        toast.success("Message sent successfully!");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

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
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-77.5 w-77.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Centered editorial heading */}
        <div ref={headingRef} className="reveal mb-16 text-center">
          <h2 className="font-serif text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl">
            Let&apos;s Talk
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-primary" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            I&apos;m always interested in hearing about new projects. My local
            time is <span className="font-medium text-foreground">{time}</span>{" "}
            in Cairo, Egypt.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left: Info & Socials */}
          <div ref={infoRef} className="reveal reveal-delay-1 space-y-8">
            <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-5">
              <div className="rounded-full bg-primary/10 p-3">
                <IconMail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                />
                {site.availability}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {site.responseTime}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Send a few lines about the problem, the timeline, and anything
                already built. I&apos;ll reply with next steps.
              </p>
            </div>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full border border-border/50 bg-card p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/30 hover:text-primary"
                >
                  <social.icon size={22} />
                </a>
              ))}
              {site.whatsapp ? (
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="rounded-full border border-border/50 bg-card p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/30 hover:text-primary"
                >
                  <IconBrandWhatsapp size={22} />
                </a>
              ) : null}
            </div>

            {site.bookingUrl ? (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
              >
                Book a call <IconArrowUpRight size={14} />
              </a>
            ) : null}
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className="reveal reveal-delay-2 rounded-xl border border-border/50 bg-card p-6"
          >
            <h3 className="mb-6 font-serif text-xl font-semibold">
              Send a Message
            </h3>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const res = formSchema.shape.name.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0].message;
                  },
                }}
              >
                {(field) => {
                  const errorId = `${field.name}-error`;
                  const invalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="font-mono text-sm uppercase tracking-widest"
                      >
                        Name
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        autoComplete="name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Your Name"
                        aria-invalid={invalid}
                        aria-describedby={invalid ? errorId : undefined}
                        className={fieldClasses}
                      />
                      {invalid ? (
                        <p id={errorId} role="alert" className="text-sm text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const res = formSchema.shape.email.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0].message;
                  },
                }}
              >
                {(field) => {
                  const errorId = `${field.name}-error`;
                  const invalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="font-mono text-sm uppercase tracking-widest"
                      >
                        Email
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="yourname@provider.com"
                        aria-invalid={invalid}
                        aria-describedby={invalid ? errorId : undefined}
                        className={fieldClasses}
                      />
                      {invalid ? (
                        <p id={errorId} role="alert" className="text-sm text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name="projectType">
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="font-mono text-sm uppercase tracking-widest"
                    >
                      Project type <span className="normal-case tracking-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-border/50 bg-transparent px-3 text-base outline-none transition-[color,box-shadow] focus:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                    >
                      <option value="">Select one</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form.Field>

              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) => {
                    const res = formSchema.shape.message.safeParse(value);
                    return res.success
                      ? undefined
                      : res.error.issues[0].message;
                  },
                }}
              >
                {(field) => {
                  const errorId = `${field.name}-error`;
                  const invalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="font-mono text-sm uppercase tracking-widest"
                      >
                        Message
                      </Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tell me about your project..."
                        aria-invalid={invalid}
                        aria-describedby={invalid ? errorId : undefined}
                        className={`min-h-30 ${fieldClasses}`}
                      />
                      {invalid ? (
                        <p id={errorId} role="alert" className="text-sm text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              {/* Honeypot */}
              <form.Field name="website">
                {(field) => (
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                )}
              </form.Subscribe>

              <p className="text-center text-xs text-muted-foreground">
                By sending this you agree to the{" "}
                <a
                  href="/privacy"
                  className="underline decoration-primary/40 underline-offset-2 hover:text-foreground"
                >
                  privacy note
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
