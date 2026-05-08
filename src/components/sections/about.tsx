import Image from "next/image";
import Link from "next/link";

export function About() {
  const stats = [
    { number: "20+", label: "Projects Shipped" },
    { number: "3×", label: "NASA Space Apps" },
    { number: "Top 5", label: "GDG Finalist" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial heading */}
        <div className="mb-16 lg:mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            About
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-primary" />
        </div>

        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-16 lg:grid-cols-12">
          {/* Photo */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="relative aspect-3/4 overflow-hidden rounded-lg">
              <Image
                src="/seif.jpg"
                alt="Seif Zakaria"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            {/* Pull Quote */}
            <blockquote className="mb-10 border-l-4 border-primary pl-6">
              <p className="font-serif text-2xl sm:text-3xl italic text-primary leading-relaxed">
                &ldquo;I build products that ship, solve real problems, and make
                users happy.&rdquo;
              </p>
            </blockquote>

            <p className="text-lg leading-8 text-muted-foreground">
              Hey! I&apos;m{" "}
              <span className="font-serif font-medium italic text-foreground">
                Seif Zakaria
              </span>
              . I&apos;m a full-stack developer based in Cairo, Egypt who ships
              fast and obsesses over the details. I lead the AI &amp; Resonance
              committee at Microsoft Student Partners ASU, mentor developers,
              and build with Next.js daily. My background in leading HR teams
              gave me something most engineers lack: the ability to truly
              understand what users need before writing a single line of code.
              I&apos;m applying that to build Rafiqi, a mental health platform
              that&apos;s helped real users. Got a challenging project?{" "}
              <Link
                href="#contact"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Let&apos;s talk.
              </Link>
            </p>

            {/* <div className="mt-8 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-r-lg">
              <p className="text-base font-medium text-red-700 dark:text-red-300">
                I fully and unapologetically support Palestine. I will never
                collaborate with, contribute to, or accept a cent from anyone
                complicit with the genocidal, terrorist state of Israel. If you
                stand with oppression, stay away. Human rights are not for
                debate.
              </p>
            </div> */}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
