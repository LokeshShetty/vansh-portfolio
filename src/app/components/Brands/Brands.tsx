import { brands } from "@/data/profile";
import styles from "./Brands.module.css";

// A row of names that slides sideways as the page scrolls. The second copy
// only exists so the row never shows a gap; screen readers skip it.
export function Brands() {
  return (
    <section className={styles.band} aria-label="Brands and stages">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={styles.row}
            aria-hidden={copy === 1 || undefined}
          >
            {brands.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
