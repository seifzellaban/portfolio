export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  href?: string;
}

/**
 * Real quotes only. The section renders nothing while this list is empty, so
 * add entries here when clients or collaborators send something usable.
 */
export const testimonials: Testimonial[] = [];
