import { notFound } from "next/navigation";
import { services } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, Banknote, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  // Shared Header for all layouts (can be customized per layout if desired, but kept consistent for now)
  const Header = () => (
    <div className="mb-12">
      <Link
        href="/#services"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          {service.icon}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{service.title}</h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl">
        {service.description}
      </p>
    </div>
  );

  const MetaInfo = ({ className }: { className?: string }) => (
    <div className={cn("flex flex-wrap gap-4", className)}>
      <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
        <Clock className="h-4 w-4" />
        {service.timeRange}
      </Badge>
      <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
        <Banknote className="h-4 w-4" />
        {service.priceRange}
      </Badge>
    </div>
  );

  const CTA = () => (
    <div className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border text-center">
      <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
      <p className="text-muted-foreground mb-6">
        Let&apos;s discuss how our {service.title} services can help your
        business grow.
      </p>
      <Button asChild size="lg">
        <Link href="/#contact">Book a Consultation</Link>
      </Button>
    </div>
  );

  // Layout Implementations
  const renderLayout = () => {
    switch (service.layoutType) {
      case "two-column-cards":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Header />
              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {service.fullDescription}
                </p>
              </div>
              <MetaInfo className="mb-8" />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <div className="grid gap-4">
                {service.features.map((feature, idx) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "single-column-detailed":
        return (
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-12 flex flex-col items-center">
              <Link
                href="/#services"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Link>
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-6">
                {service.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {service.fullDescription}
              </p>
              <MetaInfo className="justify-center mb-12" />
            </div>

            <div className="bg-card rounded-3xl p-8 md:p-12 border shadow-sm text-left">
              <h3 className="text-2xl font-semibold mb-8 text-center">
                What&apos;s Included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "grid-features":
        return (
          <div>
            <Header />
            <div className="prose dark:prose-invert max-w-none mb-12">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.fullDescription}
              </p>
            </div>
            <MetaInfo className="mb-12" />

            <h3 className="text-2xl font-bold mb-8">
              Our Process & Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="bg-muted/30 border-0 hover:bg-muted/50 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                        <span className="text-primary font-bold">
                          {idx + 1}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{feature}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "minimal-centered":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 border-b pb-16">
              <Link
                href="/#services"
                className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block"
              >
                ← Back
              </Link>
              <h1 className="text-6xl font-light tracking-tight mb-8">
                {service.title}
              </h1>
              <p className="text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {service.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl font-medium uppercase tracking-widest mb-6 text-muted-foreground">
                  Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b py-3">
                    <span>Estimated Time</span>
                    <span className="font-medium">{service.timeRange}</span>
                  </div>
                  <div className="flex justify-between border-b py-3">
                    <span>Starting Price</span>
                    <span className="font-medium">{service.priceRange}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium uppercase tracking-widest mb-6 text-muted-foreground">
                  Scope
                </h3>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "process-timeline":
        return (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
              <Header />
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>
                    Timeline:{" "}
                    <span className="text-foreground font-medium">
                      {service.timeRange}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Banknote className="h-5 w-5" />
                  <span>
                    Investment:{" "}
                    <span className="text-foreground font-medium">
                      {service.priceRange}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-card border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-8">Consulting Scope</h3>
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-border">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className="h-8 w-8 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-semibold text-lg mb-1">
                          {feature}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Comprehensive analysis and implementation strategies
                          tailored to your specific business requirements.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default: // classic-feature-list
        return (
          <div className="max-w-5xl mx-auto">
            <Header />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-6">
                  Service Overview
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {service.fullDescription}
                </p>

                <h3 className="text-xl font-semibold mb-4">What We Deliver</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>At a Glance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Estimated Duration
                      </div>
                      <div className="font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4" /> {service.timeRange}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Investment Range
                      </div>
                      <div className="font-semibold flex items-center gap-2">
                        <Banknote className="h-4 w-4" /> {service.priceRange}
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button className="w-full" asChild>
                        <Link href="/#contact">Get a Quote</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-24 px-6">
      {renderLayout()}
      {service.layoutType !== "single-column-detailed" && <CTA />}
    </div>
  );
}
