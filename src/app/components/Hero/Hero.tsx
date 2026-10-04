import { Asset } from "@/components/Asset/Asset";
import { profile } from "@/data/profile";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={`shell ${styles.hero}`}>
      <div className={styles.copy}>
        <p className="eyebrow">
          {profile.role} · {profile.location}
        </p>
        <h1 className={`display ${styles.name}`}>{profile.name}</h1>
        <p className={styles.focus}>{profile.focus.join(" · ")}</p>
        <p className={styles.intro}>{profile.intro}</p>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          {profile.links.map(
            (link) =>
              link.href && (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                  </a>
                </li>
              ),
          )}
          <li>
            <a href="#work">See the work ↓</a>
          </li>
        </ul>
      </div>
      <Asset
        {...profile.portrait}
        className={styles.portrait}
        sizes="(min-width: 48rem) 20rem, 60vw"
        priority
      />
    </header>
  );
}
