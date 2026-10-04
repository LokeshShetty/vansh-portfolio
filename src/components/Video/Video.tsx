import { Asset } from "@/components/Asset/Asset";
import { assetUrl, getAsset } from "@/lib/assets";
import styles from "./Video.module.css";
import type { VideoProps } from "./types";

// Native player with preload="none": only the poster loads with the page,
// and no video bytes are fetched until someone presses play. No JavaScript.
// The poster is the image asset with the same name (see README).
export function Video(props: VideoProps) {
  const { name, alt, src, ratio = "16 / 9", className } = props;
  const poster = getAsset(name);

  if (!src || !poster) return <Asset {...props} />;

  return (
    <video
      className={[styles.video, className].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio }}
      src={src}
      poster={assetUrl(name, poster, poster.widths.at(-1)!, "webp")}
      aria-label={alt}
      width={poster.width}
      height={poster.height}
      preload="none"
      controls
      playsInline
    />
  );
}
