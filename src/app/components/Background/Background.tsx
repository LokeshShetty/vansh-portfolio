import { experience, toolkit } from "@/data/profile";
import styles from "./Background.module.css";

export function Background() {
  return (
    <section className={`shell ${styles.grid}`} aria-label="Background">
      <div>
        <h2 className={`display ${styles.heading} reveal`}>Experience</h2>
        <ol className={styles.list}>
          {experience.map((item) => (
            <li key={item.role} className={`${styles.row} reveal`}>
              <span className={styles.when}>{item.when}</span>
              <div>
                <p className={styles.role}>{item.role}</p>
                <p className={styles.org}>{item.org}</p>
                {item.note && <p className={styles.note}>{item.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h2 className={`display ${styles.heading} reveal`}>Toolkit</h2>
        <dl className={styles.list}>
          {toolkit.map((t) => (
            <div key={t.group} className={`${styles.tool} reveal`}>
              <dt className={styles.role}>{t.group}</dt>
              <dd className={styles.note}>{t.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
