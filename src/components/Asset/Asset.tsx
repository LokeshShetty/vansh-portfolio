import { assetUrl, getAsset } from "@/lib/assets";
import styles from "./Asset.module.css";
import type { AssetProps } from "./types";

// Server-rendered <picture>: AVIF, then WebP, at several widths, with real
// dimensions (no layout shift) and a tiny inline blur while it loads.
// Ships zero JavaScript. An asset that hasn't been uploaded yet renders as an
// empty frame of the same shape, so the layout doesn't move when it arrives.
export function Asset({
  name,
  alt,
  ratio = "16 / 10",
  sizes = "(min-width: 64rem) 36rem, 100vw",
  priority = false,
  className,
}: AssetProps) {
  const entry = getAsset(name);

  if (!entry) {
    return (
      <div
        className={[styles.frame, styles.placeholder, className]
          .filter(Boolean)
          .join(" ")}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={`${alt} (coming soon)`}
      >
        <span className={styles.label}>{name}</span>
      </div>
    );
  }

  const file = (w: number, ext: string) => assetUrl(name, entry, w, ext);
  const srcSet = (ext: string) =>
    entry.widths.map((w) => `${file(w, ext)} ${w}w`).join(", ");

  return (
    <picture className={[styles.frame, className].filter(Boolean).join(" ")}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        className={styles.img}
        src={file(entry.widths.at(-1)!, "webp")}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ backgroundImage: `url(${entry.blur})` }}
      />
    </picture>
  );
}
