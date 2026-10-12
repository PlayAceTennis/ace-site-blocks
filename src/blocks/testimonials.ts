import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const MAX_TESTIMONIALS = 12;

export const TestimonialSchema = z.object({
  quote: z.string().trim().min(1).max(500),
  author: z.string().trim().min(1).max(60),
  role: z.string().trim().max(60).optional(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const TestimonialsPropsSchema = z.object({
  title,
  items: z.array(TestimonialSchema).min(1).max(MAX_TESTIMONIALS),
  /** Average rating + count of the club's Ace reviews (aggregate only, never individual reviews). */
  showReviewSummary: z.boolean(),
});
export type TestimonialsProps = z.infer<typeof TestimonialsPropsSchema>;

export const defaultTestimonialsProps = (): TestimonialsProps => ({
  title: "Das sagen unsere Mitglieder",
  items: [{ quote: "Tolle Anlage und ein herzlicher Verein.", author: "Vereinsmitglied" }],
  showReviewSummary: false,
});

export const testimonialsMeta: BlockMeta = {
  label: { de: "Stimmen", en: "Testimonials" },
  description: { de: "Zitate von Mitgliedern, optional mit Bewertungsübersicht", en: "Member quotes, optionally with a rating summary" },
  category: "content",
  icon: "Quote",
};
