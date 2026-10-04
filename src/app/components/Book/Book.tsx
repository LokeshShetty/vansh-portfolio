import { Asset } from "@/components/Asset/Asset";
import { book } from "@/data/profile";
import styles from "./Book.module.css";

export function Book() {
  return (
    <section className={styles.band} aria-labelledby="book-title">
      <div className={`shell ${styles.inner}`}>
        <div className={`${styles.coverWrap} reveal`}>
          <Asset {...book.cover} className={styles.cover} sizes="16rem" />
        </div>
        <div className={styles.copy}>
          <p className="eyebrow reveal">Publication</p>
          <h2 id="book-title" className={`display ${styles.title} reveal`}>
            {book.title}
          </h2>
          <p className={`${styles.subtitle} reveal`}>{book.subtitle}</p>
          <p className={`${styles.note} reveal`}>{book.note}</p>
          {book.href && (
            <a
              className="reveal"
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
