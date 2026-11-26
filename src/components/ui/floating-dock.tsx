"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconMail } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  mobile?: boolean;
  desktop?: boolean;
  download?: string;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mobileItems = items.filter((item) => item.mobile);
  const contactItem = mobileItems.find((item) => item.title === "Contact");
  const themeItem = mobileItems.find((item) => item.title === "Toggle theme");
  const drawerItems = mobileItems.filter(
    (item) => item.title !== "Toggle theme" && item.title !== "Contact"
  );

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Primary"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 isolate mb-3 w-[min(calc(100vw-1.5rem),21rem)] -translate-x-1/2 rounded-2xl p-3 shadow-2xl"
          >
            {/* Visual background layer — matches desktop dock */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl border border-border/30 bg-sidebar/20 glassmorphic"
            />

            <div className="mb-2 flex items-center justify-between px-2 pt-0.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Navigate
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {drawerItems.length} links
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {drawerItems.map((item) => {
                const isExternal = item.href?.startsWith("http");
                const sharedClasses =
                  "flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-foreground transition-colors icons-glassmorphic active:opacity-80";

                return item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    download={item.download}
                    target={isExternal ? "_blank" : undefined}
                    rel={item.rel ?? (isExternal ? "noopener noreferrer" : undefined)}
                    onClick={(event) => {
                      item.onClick?.(event);
                      setOpen(false);
                    }}
                    className={sharedClasses}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                ) : (
                  <button
                    key={item.title}
                    type="button"
                    onClick={(event) => {
                      item.onClick?.(event);
                      setOpen(false);
                    }}
                    className={sharedClasses}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating mobile pill bar */}
      <div className="relative isolate flex items-center gap-1.5 rounded-full p-1.5 shadow-xl">
        {/* Visual background layer — matches desktop dock */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-border/30 bg-sidebar/20 glassmorphic"
        />

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors icons-glassmorphic active:opacity-80"
        >
          {open ? <IconX size={16} /> : <IconMenu2 size={16} />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>

        {contactItem ? (
          contactItem.href ? (
            <Link
              href={contactItem.href}
              onClick={(event) => {
                contactItem.onClick?.(event);
                setOpen(false);
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-background transition-colors active:bg-foreground/85"
            >
              <IconMail size={15} />
              <span>Contact</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={(event) => {
                contactItem.onClick?.(event);
                setOpen(false);
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-background transition-colors active:bg-foreground/85"
            >
              <IconMail size={15} />
              <span>Contact</span>
            </button>
          )
        ) : null}

        {themeItem ? (
          <button
            type="button"
            aria-label={themeItem.title}
            title={themeItem.title}
            onClick={(event) => themeItem.onClick?.(event)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors icons-glassmorphic active:opacity-80"
          >
            <span className="h-5 w-5">{themeItem.icon}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const desktopItems = items.filter((item) => item.desktop !== false);

  return (
    <motion.div
      role="navigation"
      aria-label="Primary"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "relative mx-auto hidden h-16 items-end overflow-visible rounded-2xl md:flex",
        className
      )}
    >
      {/* Visual background layer - separate to avoid clipping child backdrop filters */}
      <div className="absolute inset-0 rounded-2xl border border-border/30 bg-sidebar/20 glassmorphic -z-10 pointer-events-none" />

      <div className="flex h-full items-end gap-4 overflow-visible px-4 pb-3">
        {desktopItems.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  rel,
  onClick,
  download,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  download?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full icons-glassmorphic"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-border bg-muted px-2 py-0.5 text-sm text-secondary-foreground"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel={
            rel === "me noopener noreferrer"
              ? "me noopener noreferrer"
              : "noopener noreferrer"
          }
          aria-label={title}
          title={title}
          download={download}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        rel={rel}
        aria-label={title}
        title={title}
        download={download}
        onClick={onClick}
        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      onClick={(e) => onClick?.(e)}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {content}
    </button>
  );
}
