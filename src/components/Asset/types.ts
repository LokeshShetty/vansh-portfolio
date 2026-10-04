import type { AssetSlot } from "@/data/profile";

export type AssetProps = AssetSlot & {
  /** Matches the column width the image sits in, so the browser picks the right file. */
  sizes?: string;
  /** Above-the-fold images only: loads eagerly at high priority. */
  priority?: boolean;
  className?: string;
};
