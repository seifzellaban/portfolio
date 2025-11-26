"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO at TechStart",
        content:
            "Seif transformed our MVP into a fully scalable product. His attention to detail and technical expertise are unmatched. We saw a 200% increase in user retention after the redesign.",
        avatar: "/avatars/sarah.png",
        initials: "SJ",
    },
    {
        name: "Michael Chen",
        role: "Founder of GreenLoop",
        content:
            "Working with Seif was a game-changer. He didn't just build what we asked for; he helped us refine our product strategy. The results speak for themselves.",
        avatar: "/avatars/michael.png",
        initials: "MC",
    },
    {
        name: "Emily Davis",
        role: "Product Manager",
        content:
            "Incredible developer with a keen eye for design. The UI he built for us is not only beautiful but also extremely intuitive. Highly recommended!",
        avatar: "/avatars/emily.png",
        initials: "ED",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 sm:py-32 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        What Clients Say
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Don&apos;t just take my word for it. Here&apos;s what others have to say about working with me.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="relative h-full shadow-sm">
                            <CardHeader className="pb-4">
                                <div className="absolute top-6 right-6 text-muted-foreground/20">
                                    <IconQuote size={40} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    &quot;{testimonial.content}&quot;
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
