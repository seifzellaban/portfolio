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
        <section id="services" className="py-24 sm:py-32 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Services
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Comprehensive solutions to help you build and grow your digital presence.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex"
                        >
                            <Card className="flex flex-col w-full hover:shadow-lg transition-all duration-300 border-muted hover:-translate-y-1">
                                <CardHeader>
                                    <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">{service.icon}</div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="pt-0 mt-auto">
                                    <Link href={`/services/${service.id}`} className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
                                        Learn More <IconArrowRight size={16} />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center justify-center p-1 rounded-full bg-muted border border-border">
                        <span className="px-4 py-2 text-sm text-muted-foreground">
                            Ready to start a project?
                        </span>
                        <Link
                            href="#contact"
                            className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
