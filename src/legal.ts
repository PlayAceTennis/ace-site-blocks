import { z } from "zod";

export const MAX_REPRESENTATIVES = 10;

export const RepresentativeSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120),
});
export type Representative = z.infer<typeof RepresentativeSchema>;

export const LegalSchema = z.object({
  registerCourt: z.string().trim().max(120).optional(),
  registerNumber: z.string().trim().max(60).optional(),
  representatives: z.array(RepresentativeSchema).max(MAX_REPRESENTATIVES),
  contentResponsible: z
    .object({
      name: z.string().trim().max(120),
      address: z.string().trim().max(300),
    })
    .optional(),
  vatId: z.string().trim().max(30).optional(),
  extraNotes: z.string().trim().max(5000).optional(),
});
export type Legal = z.infer<typeof LegalSchema>;

export const DEFAULT_LEGAL: Legal = { representatives: [] };
