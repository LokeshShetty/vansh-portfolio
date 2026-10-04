import { Asset } from "@/components/Asset/Asset";
import { book } from "@/data/profile";
import styles from "./Book.module.css";

export function Book() {
  return (
    <section className={styles.band} aria-labelledby="book-title">
      <div className={`shell ${styles.inner}`}>
        <Asset {...book.cover} className={styles.cover} sizes="12rem" />
        <div className={styles.copy}>
          <p className="eyebrow">Publication</p>
          <h2 id="book-title" className={`display ${styles.title}`}>
            {book.title}
          </h2>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p className={styles.note}>{book.note}</p>
          {book.href && (
            <a href={book.href} target="_blank" rel="noopener noreferrer">
              Get it on Amazon ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
