"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { services } from "@/lib/services-data";
import Link from "next/link";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Services
          </h2>
          <div className="mt-3 h-[2px] w-16 bg-primary" />
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
            Comprehensive solutions to help you build and grow your digital
            presence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="flex flex-col w-full border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 bg-background">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="font-serif text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0 mt-auto">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm font-mono uppercase tracking-widest text-primary hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    Learn More <IconArrowRight size={14} />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/30 text-sm font-mono uppercase tracking-widest text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            Ready to start a project?{" "}
            <span className="text-primary">Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
