import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className="eyebrow reveal">Have a growth problem worth solving?</p>
        <a
          href={`mailto:${profile.email}`}
          className={`display ${styles.cta} reveal`}
        >
          Let&rsquo;s talk <span aria-hidden="true">→</span>
        </a>
        <a
          href={`mailto:${profile.email}`}
          className={`${styles.email} reveal`}
        >
          {profile.email}
        </a>
        <div className={styles.fine}>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
