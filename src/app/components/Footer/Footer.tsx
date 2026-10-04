import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className="eyebrow">Get in touch</p>
        <a href={`mailto:${profile.email}`} className={`display ${styles.cta}`}>
          {profile.email}
        </a>
        <p className={styles.fine}>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
