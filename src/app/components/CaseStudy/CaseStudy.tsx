import { Asset } from "@/components/Asset/Asset";
import { Video } from "@/components/Video/Video";
import styles from "./CaseStudy.module.css";
import type { CaseStudyProps } from "./types";

// "9 / 16" → true. Portrait media is capped so a reel doesn't fill a phone screen.
function isTall(ratio = "") {
  const [w, h] = ratio.split("/").map(Number);
  return h > w;
}

export function CaseStudy({ study, index }: CaseStudyProps) {
  const hasAssets = study.assets.length > 0;

  return (
    <article
      id={study.id}
      className={[styles.study, hasAssets ? "" : styles.textOnly].join(" ")}
      aria-labelledby={`${study.id}-title`}
    >
      <div className={styles.copy}>
        <p className="eyebrow">
          {String(index).padStart(2, "0")} · {study.kicker}
        </p>
        <h3 id={`${study.id}-title`} className={`display ${styles.title}`}>
          {study.title}
        </h3>
        <p>{study.summary}</p>
        <ul className={styles.did}>
          {study.did.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <dl className={styles.results}>
          {study.results.map((r) => (
            <div key={r.label}>
              <dt className={styles.label}>{r.label}</dt>
              <dd className={`display ${styles.value}`}>{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {hasAssets && (
        <div className={styles.media}>
          {study.assets.map((asset) =>
            "src" in asset ? (
              <Video
                key={asset.name}
                {...asset}
                className={isTall(asset.ratio) ? styles.tall : undefined}
              />
            ) : (
              <Asset
                key={asset.name}
                {...asset}
                className={isTall(asset.ratio) ? styles.tall : undefined}
              />
            ),
          )}
        </div>
      )}
    </article>
  );
}
