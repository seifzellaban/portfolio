"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function Placeholder() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground p-6 flex flex-col items-center justify-center gap-12">
      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl space-y-4"
      >
        <Avatar className="mx-auto h-20 w-20">
          <AvatarImage src="/seif.jpg" alt="Your Avatar" />
          <AvatarFallback>SE</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight">
          Hey, I’m Seif Zakaria 👋
        </h1>
        <p className="text-muted-foreground text-xl">
          Full Stack Dev ⚙️ | React & NextJS 🧩 | Building magical interfaces
          with Tailwind & Shadcn
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm">
            <Github className="h-4 w-4 mr-2" /> GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
          </Button>
          <Button variant="default" size="sm">
            <Mail className="h-4 w-4 mr-2" /> Let’s Talk
          </Button>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <Card key={i} className="glassmorphic">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-xl font-medium">Project #{i + 1}</h3>
                <p className="text-base text-muted-foreground">
                  A short description of a cool project that uses amazing
                  technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Tailwind</Badge>
                  <Badge variant="secondary">Shadcn</Badge>
                </div>
                <Button variant="link" size="sm">
                  View Project →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* About Tabs */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center">About Me</h2>
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="fun">Fun Stuff</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Building performant UIs with React + Next.js</li>
              <li>Backend wizardry with Golang & Drizzle + PostgreSQL</li>
              <li>Shipped real-time apps at scale</li>
            </ul>
          </TabsContent>
          <TabsContent value="stack">
            <div className="flex flex-wrap gap-2 text-base text-muted-foreground">
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">TailwindCSS</Badge>
              <Badge variant="outline">Drizzle</Badge>
              <Badge variant="outline">React Query</Badge>
              <Badge variant="outline">Zustand</Badge>
              <Badge variant="outline">Golang</Badge>
              <Badge variant="outline">PostgreSQL</Badge>
            </div>
          </TabsContent>
          <TabsContent value="fun">
            <p className="text-muted-foreground">
              I’m a Linux nerd (Fedora + GNOME), Obsidian addict, and a sucker
              for clean UI. Let’s build something epic.
            </p>
          </TabsContent>
        </Tabs>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-base text-muted-foreground py-6">
        Built with <Terminal className="inline h-3 w-3 mx-1" /> and zero sleep —
        Seif Zakaria © 2025
      </footer>
    </main>
  );
}
