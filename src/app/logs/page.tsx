import { Logs } from "@/components/sections/logs";
import { Card, CardContent } from "@/components/ui/card";
import ShinyText from "@/components/ShinyText";
import { NewsletterForm } from "@/components/newsletter-form";
import { getPosts } from "@/lib/posts";

export default function LogsPage() {
  const posts = getPosts();
  return (
    <div className="relative min-h-screen w-full bg-background selection:bg-primary/10 selection:text-primary overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <main className="mx-auto relative z-10">
        <div className="relative w-full mx-auto">
          {/* Decorative element */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10">
            <ShinyText
              text="THOUGHTS & STORIES"
              speed={4}
              className="text-xs sm:text-sm font-mono tracking-[0.2em] opacity-60 whitespace-nowrap"
            />
          </div>

          <Logs
            heading="My Logs"
            description="A collection of thoughts, deep dives, and stories from my journey—building apps, leading teams, and exploring the craft of modern web development."
            posts={posts}
          />
        </div>

        {/* Newsletter / CTA Section */}
        <section className="pb-32 max-w-7xl mx-auto px-4">
          <Card className="bg-card/50 border-border/50 overflow-hidden relative backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
            <CardContent className="p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-serif text-4xl font-bold tracking-tight">
                  Stay in the loop
                </h3>
                <div className="h-[2px] w-12 bg-primary mx-auto md:mx-0" />
                <p className="text-muted-foreground max-w-xs text-base leading-relaxed pt-2">
                  I write about engineering, leadership, and building products.
                  No spam, just updates.
                </p>
              </div>
              <NewsletterForm />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
