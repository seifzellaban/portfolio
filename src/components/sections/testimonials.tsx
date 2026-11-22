import { testimonials } from "@/lib/testimonials";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="border-t border-border/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Words</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>{testimonials.length.toString().padStart(2, "0")}</span>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl">
              What people{" "}
              <span className="font-light italic text-primary">say.</span>
            </h2>
          </div>
        </header>

        <div className="mt-10 divide-y divide-border/50 border-y border-border/50 sm:mt-14 md:mt-20">
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="grid grid-cols-1 gap-4 py-8 sm:gap-6 sm:py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <blockquote className="md:col-span-8">
                <p className="font-serif text-xl leading-[1.35] text-foreground sm:text-2xl md:text-3xl md:leading-snug">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="pt-1 md:col-span-3 md:justify-self-end md:pt-0 md:text-right">
                <p className="text-sm font-medium text-foreground sm:text-base">
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
