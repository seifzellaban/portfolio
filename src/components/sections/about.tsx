import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mobile heading - appears before image */}
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-8 lg:hidden">
          About Me
        </h2>
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            {/* Desktop heading - appears with text content */}
            <h2 className="hidden lg:block text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              About Me
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Hey! I&apos;m Seif Zakaria, a Software Engineering student
              who&apos;s all in about technology and leadership. I love creating
              solutions that make an impact, whether through coding or
              empowering the people I work with. My journey has taught me the
              value of teamwork, mentorship, and staying curious. Whether
              it&apos;s leading a team, exploring the latest tech trends, or
              diving into meaningful conversations.
            </p>

            <div className="mt-8 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
              <p className="text-base font-medium text-red-700 dark:text-red-300">
                I fully and unapologetically support Palestine. I will never
                collaborate with, contribute to, or accept a cent from anyone
                complicit with the genocidal, terrorist state of Israel. If you
                stand with oppression, stay away. Human rights are not for
                debate.
              </p>
            </div>

            {/*<div className="mt-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Achievements
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>NASA Space Apps Challenge</strong> – Participated
                    3×, Local Winner once
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>GDG AI Hackathon</strong> – Participated 1×,
                    Finalist once
                  </span>
                </li>
              </ul>
            </div>*/}
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg bg-card sm:h-96 lg:h-[500px] order-1 lg:order-2">
            <Image
              src="/seif.jpg"
              alt="seif"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
