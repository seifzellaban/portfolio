"use client";

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "motion/react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }),
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const form = useForm({
    defaultValues: { name: "", email: "", message: "" },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        if (!response.ok) throw new Error("Failed to send message");
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
      href: "https://linkedin.com/in/seifzellaban",
      icon: IconBrandLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/seifzellaban",
      icon: IconBrandGithub,
      label: "GitHub",
    },
    { href: "https://x.com/seifzellaban", icon: IconBrandX, label: "X" },
    {
      href: "https://instagram.com/theseifzellaban",
      icon: IconBrandInstagram,
      label: "Instagram",
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Centered editorial heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground"
          >
            Let&apos;s Talk
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 h-[2px] w-16 bg-primary mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            I&apos;m always interested in hearing about new projects. My local
            time is <span className="text-foreground font-medium">{time}</span>{" "}
            in Cairo, Egypt.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50">
              <div className="p-3 bg-primary/10 rounded-full">
                <IconMail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:seifzellaban@gmail.com"
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  seifzellaban@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card border border-border/50"
          >
            <h3 className="font-serif text-xl font-semibold mb-6">
              Send a Message
            </h3>
            <form
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
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-mono uppercase tracking-widest"
                    >
                      Name
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your Name"
                      className="border-border/50 focus:border-primary/50"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </div>
                )}
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
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-mono uppercase tracking-widest"
                    >
                      Email
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="yourname@provider.com"
                      className="border-border/50 focus:border-primary/50"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
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
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-mono uppercase tracking-widest"
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
                      className="min-h-[120px] border-border/50 focus:border-primary/50"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
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
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
