import { Fragment } from "react";
import { Asset } from "@/components/Asset/Asset";
import { profile } from "@/data/profile";
import styles from "./Hero.module.css";

export function Hero() {
  const words = profile.name.split(" ");

  return (
    <header className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <Asset
          {...profile.portrait}
          alt=""
          className={styles.portrait}
          sizes="(min-width: 90rem) 46rem, (min-width: 40rem) 50vw, 22rem"
          priority
        />
      </div>

      <div className={`shell ${styles.inner}`}>
        <p className="eyebrow">
          {profile.role} — {profile.location}
        </p>
        <h1 className={`display ${styles.name}`} aria-label={profile.name}>
          {words.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && " "}
              <span
                className="word"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span>{word}</span>
              </span>
            </Fragment>
          ))}
        </h1>

        <div className={styles.foot}>
          <p className={styles.intro}>{profile.intro}</p>
          <div className={styles.side}>
            <ul className={styles.focus}>
              {profile.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <ul className={styles.links}>
              <li>
                <a className={styles.cta} href={`mailto:${profile.email}`}>
                  Get in touch
                </a>
              </li>
              {profile.links.map(
                (link) =>
                  link.href && (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ),
              )}
              <li>
                <a href="#work">Selected work ↓</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
