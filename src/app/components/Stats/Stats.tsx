import { Text } from "@/components/Text/Text";
import { stats } from "@/data/profile";
import styles from "./Stats.module.css";

export function Stats() {
  return (
    <section className={`shell ${styles.section}`} aria-label="Highlights">
      <dl className={styles.grid}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`${styles.stat} reveal stagger`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={`display ${styles.value}`}>
              <Text>{stat.value}</Text>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
