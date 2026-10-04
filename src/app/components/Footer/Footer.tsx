import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`shell ${styles.footer}`}>
      <a
        className={`tile ${styles.cta} reveal`}
        href={`mailto:${profile.email}`}
      >
        <span className="eyebrow">Have a growth problem worth solving?</span>
        <span className={`display ${styles.big}`}>
          Let&rsquo;s grow <span aria-hidden="true">→</span>
        </span>
        <span className={styles.email}>{profile.email}</span>
      </a>
      <div className={styles.fine}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
