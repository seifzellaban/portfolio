"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(value);
      toast.success("Message sent successfully!");
      form.reset();
    },
  });

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 font-serif">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, I&apos;ll try my best to get back to you!
              </p>
              <p className="text-lg font-bold text-muted-foreground mt-4">
                Local Time: {time}
              </p>
            </div>

            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-background rounded-full">
                    <IconMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:seifzellaban@gmail.com"
                      className="text-foreground font-medium hover:underline"
                    >
                      seifzellaban@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <a
                    href="https://linkedin.com/in/seifzellaban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                  >
                    <IconBrandLinkedin size={24} />
                  </a>
                  <a
                    href="https://github.com/seifzellaban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                  >
                    <IconBrandGithub size={24} />
                  </a>
                  <a
                    href="https://x.com/seifzellaban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                  >
                    <IconBrandX size={24} />
                  </a>
                  <a
                    href="https://instagram.com/theseifzellaban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                  >
                    <IconBrandInstagram size={24} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I&apos;ll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-6"
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
                      <Label htmlFor={field.name}>Name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Your Name"
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
                      <Label htmlFor={field.name}>Email</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="yourname@provider.com"
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
                      <Label htmlFor={field.name}>Message</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tell me about your project..."
                        className="min-h-[120px]"
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
                      className="w-full"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  )}
                </form.Subscribe>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
