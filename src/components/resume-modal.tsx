"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import {
  IconArrowUpRight,
  IconDownload,
  IconExternalLink,
  IconMail,
  IconX,
} from "@tabler/icons-react";
import { RESUMES, type ResumeOption } from "@/lib/resumes";
import { site } from "@/lib/site";

interface ResumeModalContextValue {
  open: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used within a ResumeModalProvider");
  }
  return ctx;
}

interface ResumeModalProviderProps {
  children: ReactNode;
  options?: ResumeOption[];
}

export function ResumeModalProvider({
  children,
  options = RESUMES,
}: ResumeModalProviderProps) {
  const [open, setOpen] = useState(false);

  const openResumeModal = useCallback(() => setOpen(true), []);
  const closeResumeModal = useCallback(() => setOpen(false), []);

  return (
    <ResumeModalContext.Provider
      value={{ open, openResumeModal, closeResumeModal }}
    >
      {children}
      <ResumeModal open={open} onClose={closeResumeModal} options={options} />
    </ResumeModalContext.Provider>
  );
}

type ResumeTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "type">;

/**
 * Drop-in button trigger that opens the site-wide ResumeModal.
 * Safe to render inside Server Components (e.g. Footer).
 */
export function ResumeTrigger({
  onClick,
  children,
  ...props
}: ResumeTriggerProps) {
  const { openResumeModal } = useResumeModal();

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openResumeModal();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  options?: ResumeOption[];
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function ResumeModal({
  open,
  onClose,
  options = RESUMES,
}: ResumeModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose, lenis]);

  const handleOpen = (option: ResumeOption) => {
    track("resume_open", { source: option.id });
    onClose();
  };

  const handleDownload = (option: ResumeOption) => {
    track("resume_download", { source: option.id });
    toast.success(`Downloading ${option.label} résumé`);
    onClose();
  };

  const handleRequest = (option: ResumeOption) => {
    track("resume_request", { source: option.id });
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          aria-describedby="resume-modal-description"
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Dialog surface */}
          <motion.div
            data-lenis-prevent
            data-lenis-prevent-touch
            data-lenis-prevent-wheel
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 14, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex max-h-[min(86dvh,42rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border/75 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header strip (pinned while list scrolls) */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border/50 px-6 pb-4 pt-5 sm:px-8 sm:pt-6">
              <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-foreground">Résumé</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{pad(options.length)} versions</span>
              </p>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close résumé picker"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div
              data-lenis-prevent
              data-lenis-prevent-touch
              data-lenis-prevent-wheel
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-6 pb-6 pt-5 [-webkit-overflow-scrolling:touch] sm:px-8 sm:pb-8 sm:pt-6"
            >
              {/* Prompt */}
              <div>
                <h2
                  id="resume-modal-title"
                  className="font-serif text-2xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-3xl"
                >
                  Where do you know me from?
                </h2>
                <p
                  id="resume-modal-description"
                  className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  Pick the context so you get the version tailored to what
                  you&apos;re looking at.
                </p>
              </div>

              {/* Data-driven resume list */}
              <ul className="mt-6 space-y-3" role="list">
                {options.map((option, index) => {
                  const hasFile = Boolean(option.path);
                  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
                    option.requestSubject ?? `Resume request — ${option.label}`
                  )}`;

                  return (
                    <li
                      key={option.id}
                      className="group relative rounded-xl border border-border/65 bg-background/60 p-4 transition-all duration-200 hover:border-primary/45 hover:bg-background/90 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            <span className="text-foreground">
                              {pad(index + 1)}
                            </span>
                            <span aria-hidden className="text-border">
                              /
                            </span>
                            <span>{option.kicker}</span>
                          </p>

                          <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                            {hasFile ? (
                              <a
                                href={option.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleOpen(option)}
                                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                              >
                                {option.label}
                              </a>
                            ) : (
                              <a
                                href={mailtoHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleRequest(option)}
                                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                              >
                                {option.label}
                              </a>
                            )}
                          </h3>

                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {option.description}
                          </p>
                        </div>

                        <span
                          aria-hidden
                          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground transition-colors group-hover:border-primary/45 group-hover:text-primary"
                        >
                          {hasFile ? (
                            <IconExternalLink size={16} />
                          ) : (
                            <IconMail size={16} />
                          )}
                        </span>
                      </div>

                      {/* Action footer */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3">
                        {hasFile ? (
                          <>
                            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-primary">
                              Open PDF
                              <IconArrowUpRight
                                size={13}
                                className="text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </span>

                            <a
                              href={option.path}
                              download={option.fileName}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleDownload(option)}
                              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground"
                            >
                              <IconDownload size={12} />
                              Download
                            </a>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-primary">
                              Request copy via email
                              <IconArrowUpRight
                                size={13}
                                className="text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </span>

                            <span className="rounded-full border border-border/60 bg-card/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                              On request
                            </span>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Footer note */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>Not sure? Dev &amp; Engineering covers most roles.</span>
                <a
                  href={`mailto:${site.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
