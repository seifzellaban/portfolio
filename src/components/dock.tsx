"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconDeviceDesktopCode,
  IconUser,
  IconSun,
  IconMoon,
  IconBrandLinkedin,
  IconLink,
} from "@tabler/icons-react";
import { useTheme } from "@/lib/theme-provider";
import { LogoSvg } from "@/components/logo";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Dock() {
  const { theme, toggleTheme } = useTheme();
  const { handleNav } = useSmoothScroll();
  const isDark = theme === "dark";

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    toggleTheme({ x, y });
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      onClick: () => handleNav("home"),
      mobile: true,
    },

    {
      title: "Projects",
      icon: (
        <IconDeviceDesktopCode className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      onClick: () => handleNav("projects"),
      mobile: false,
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      onClick: () => handleNav("about"),
      mobile: false,
    },
    {
      title: "Links",
      icon: (
        <IconLink className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      href: "/links",
      mobile: true,
    },
    {
      title: "Masons",
      icon: (
        <LogoSvg className="h-full w-full text-muted-foreground dark:text-foreground/80 scale-150 fill-current" />
      ),
      href: "https://wearemasons.com",
      mobile: true,
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      href: "https://linkedin.com/in/seifzellaban",
      mobile: false,
    },
    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      href: "https://x.com/seifzellaban",
      mobile: false,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-muted-foreground dark:text-foreground/80" />
      ),
      href: "https://github.com/seifzellaban",
      mobile: false,
    },
    {
      title: "Toggle theme",
      icon: (
        <div className="relative h-full w-full cursor-pointer">
          <IconSun
            className={`h-full w-full text-muted-foreground dark:text-foreground/80 transition-all duration-200 ${
              isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <IconMoon
            className={`absolute inset-0 h-full w-full text-muted-foreground dark:text-foreground/80 transition-all duration-200 ${
              isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
          />
        </div>
      ),
      onClick: handleThemeToggle,
      mobile: true,
    },
  ];
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
