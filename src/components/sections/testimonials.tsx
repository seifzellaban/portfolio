import { testimonials } from "@/lib/testimonials";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-border/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-primary" />
              Words — {testimonials.length.toString().padStart(2, "0")}
            </p>
            <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What people say
            </h2>
          </div>
        </header>

        <div className="mt-14 divide-y divide-border/50 border-y border-border/50 md:mt-20">
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <blockquote className="md:col-span-8">
                <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="md:col-span-3 md:justify-self-end md:text-right">
                <p className="text-base font-medium text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {testimonial.role}
                  {testimonial.company ? `, ${testimonial.company}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
