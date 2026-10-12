export type BlockCategory = "content" | "data" | "legal";

export interface BlockMeta {
  label: { de: string; en: string };
  description: { de: string; en: string };
  category: BlockCategory;
  /** lucide icon name, e.g. "Image" */
  icon: string;
}
