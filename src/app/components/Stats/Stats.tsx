import { stats } from "@/data/profile";
import styles from "./Stats.module.css";

export function Stats() {
  return (
    <section className="shell" aria-label="Highlights">
      <dl className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={`display ${styles.value}`}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
