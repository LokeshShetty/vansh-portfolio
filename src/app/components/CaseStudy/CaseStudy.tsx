import { Asset } from "@/components/Asset/Asset";
import { Text } from "@/components/Text/Text";
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
  const mediaClass = (ratio?: string) =>
    [styles.item, isTall(ratio) ? styles.tall : ""].join(" ");

  return (
    <article
      id={study.id}
      className={["tile", styles.study, hasAssets ? "" : styles.textOnly].join(
        " ",
      )}
      aria-labelledby={`${study.id}-title`}
    >
      <div className={styles.copy}>
        <div className={`${styles.head} reveal`}>
          <span className={`display ${styles.index}`} aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <p className="eyebrow">{study.kicker}</p>
        </div>
        <h3
          id={`${study.id}-title`}
          className={`display ${styles.title} reveal`}
        >
          <Text>{study.title}</Text>
        </h3>
        <p className={`${styles.summary} reveal`}>{study.summary}</p>
        <ul className={`${styles.did} reveal`}>
          {study.did.map((item) => (
            <li key={item}>
              <Text>{item}</Text>
            </li>
          ))}
        </ul>
        <dl className={styles.results}>
          {study.results.map((r, i) => (
            <div
              key={r.label}
              className={`${styles.result} reveal stagger`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <dt className={styles.label}>{r.label}</dt>
              <dd className={`display ${styles.value}`}>
                <Text>{r.value}</Text>
              </dd>
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
                className={mediaClass(asset.ratio)}
              />
            ) : (
              <Asset
                key={asset.name}
                {...asset}
                className={mediaClass(asset.ratio)}
              />
            ),
          )}
        </div>
      )}
    </article>
  );
}
