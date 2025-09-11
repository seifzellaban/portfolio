"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

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

    updateTime(); // Set time immediately
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact Me
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-8">
            <p className="text-lg leading-8 text-muted-foreground text-center">
              I&apos;m always open to new opportunities, collaborations, or just
              a friendly chat. Feel free to reach out through any of the
              platforms below!
            </p>
            <p className="text-base text-muted-foreground text-center">
              Local Time: {time}
            </p>
            <div className="flex justify-center items-center space-x-6 sm:space-x-8">
              <a
                href="https://linkedin.com/in/seifzellaban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconBrandLinkedin size={32} />
              </a>
              <a
                href="https://github.com/seifzellaban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconBrandGithub size={32} />
              </a>
              <a
                href="https://x.com/seifzellaban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconBrandX size={32} />
              </a>
              <a
                href="https://instagram.com/theseifzellaban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconBrandInstagram size={32} />
              </a>
              <a
                href="mailto:seifzellaban@gmail.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconMail size={32} />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
