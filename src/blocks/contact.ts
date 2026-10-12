import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const ContactPropsSchema = z.object({
  title,
  showMap: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  showSocial: z.boolean(),
});
export type ContactProps = z.infer<typeof ContactPropsSchema>;

export const defaultContactProps = (): ContactProps => ({
  title: "Kontakt",
  showMap: true,
  showEmail: true,
  showPhone: true,
  showSocial: true,
});

export const contactMeta: BlockMeta = {
  label: { de: "Kontakt", en: "Contact" },
  description: { de: "Adresse, Kontaktdaten und Karte", en: "Address, contact details and map" },
  category: "data",
  icon: "MapPin",
};
