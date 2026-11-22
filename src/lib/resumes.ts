export interface ResumeOption {
  /** Unique identifier used for keys and analytics tracking */
  id: string;
  /** Main label shown in the modal list */
  label: string;
  /** Short category / context kicker */
  kicker: string;
  /** Plain-spoken description of how the visitor might know you */
  description: string;
  /**
   * Public path to the PDF inside /public/files/.
   * Leave empty ("") if the PDF is not uploaded yet — the modal will
   * automatically fall back to a pre-filled email request link.
   */
  path: string;
  /** Filename suggested when downloading the PDF */
  fileName: string;
  /** Optional custom mailto subject when path is empty */
  requestSubject?: string;
}

/**
 * Resume versions shown in the ResumeModal picker.
 *
 * To add another version later:
 * 1. Drop the PDF into `public/files/` (e.g. `public/files/Seif Zakaria - Product.pdf`)
 * 2. Append a new object to `RESUMES` below — the modal renders this list dynamically.
 */
export const RESUMES: ResumeOption[] = [
  {
    id: "dev",
    label: "Dev & Engineering",
    kicker: "Software · Masons",
    description:
      "Full-stack engineering, AI systems, Masons studio, hackathons, or freelance work.",
    path: "/files/Seif Zakaria - Fullstack Software Engineer.pdf",
    fileName: "Seif Zakaria - Fullstack Software Engineer.pdf",
  },
  {
    id: "concentrix",
    label: "Concentrix",
    kicker: "Tech Support · Consumer Electronics",
    description:
      "Technical support, customer operations, or internal Concentrix referrals.",
    // Drop the PDF in public/files/ and set `path` to enable direct download
    path: "",
    fileName: "Seif Zakaria - Concentrix Resume.pdf",
    requestSubject: "Resume request — Concentrix",
  },
];
