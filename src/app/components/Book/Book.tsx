import { Asset } from "@/components/Asset/Asset";
import { book } from "@/data/profile";
import styles from "./Book.module.css";

export function Book() {
  return (
    <section className="shell" aria-labelledby="book-title">
      <div className={`tile ${styles.inner} reveal`}>
        <div className={styles.coverWrap}>
          <Asset {...book.cover} className={styles.cover} sizes="16rem" />
        </div>
        <div className={styles.copy}>
          <p className="chip">Author · Amazon, 2026</p>
          <h2 id="book-title" className={`display ${styles.title}`}>
            {book.title}
          </h2>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p className={styles.note}>{book.note}</p>
          {book.href && (
            <a
              className={styles.link}
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get it on Amazon ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
