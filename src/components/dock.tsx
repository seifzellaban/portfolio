"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconDeviceDesktopCode,
  IconMail,
  IconUser,
  IconSun,
  IconMoon,
  IconBrandLinkedin,
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
      icon: <IconHome className="h-full w-full text-muted-foreground" />,
      onClick: () => handleNav("home"),
    },

    {
      title: "Projects",
      icon: (
        <IconDeviceDesktopCode className="h-full w-full text-muted-foreground" />
      ),
      onClick: () => handleNav("projects"),
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-muted-foreground" />,
      onClick: () => handleNav("about"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-muted-foreground" />,
      href: "mailto:seifzellaban@gmail.com",
    },
    {
      title: "Masons",
      icon: (
        <LogoSvg className="h-full w-full text-muted-foreground scale-150 fill-current" />
      ),
      href: "https://wearemasons.com",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-muted-foreground" />
      ),
      href: "https://linkedin.com/in/seifzellaban",
    },
    {
      title: "X",
      icon: <IconBrandX className="h-full w-full text-muted-foreground" />,
      href: "https://x.com/seifzellaban",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-muted-foreground" />,
      href: "https://github.com/seifzellaban",
    },
    {
      title: "Toggle theme",
      icon: (
        <div className="relative h-full w-full cursor-pointer">
          <IconSun
            className={`h-full w-full text-muted-foreground transition-all duration-200 ${
              isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <IconMoon
            className={`absolute inset-0 h-full w-full text-muted-foreground transition-all duration-200 ${
              isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
          />
        </div>
      ),
      onClick: handleThemeToggle,
    },
  ];
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
