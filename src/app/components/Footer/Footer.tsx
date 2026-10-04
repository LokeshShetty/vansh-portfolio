import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

const icons: Record<string, React.ReactNode> = {
  Email: (
    <path
      d="M3 6h18v12H3zM3 6l9 7 9-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  ),
  LinkedIn: (
    <path
      d="M6.5 9.5V18M6.5 6.2v.1M10.5 18v-5a2.5 2.5 0 0 1 5 0v5M10.5 9.5V18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  "Résumé (PDF)": (
    <path
      d="M7 3h7l4 4v14H7zM14 3v4h4M9.5 12h6M9.5 15.5h6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  ),
};

const sections = [
  { label: "Work", href: "#work" },
  { label: "Book", href: "#book" },
  { label: "Experience", href: "#about" },
];

// Closing contact card: a big "Get in touch", the email, round icon links,
// and a slim footer row.
export function Footer() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    ...profile.links,
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <footer className={`shell ${styles.footer}`}>
      <div className={`tile ${styles.card} reveal`}>
        <p className={styles.lets}>Let&rsquo;s</p>
        <h2 className={`display ${styles.big}`}>
          Get in <span className={styles.touch}>touch</span>
        </h2>

        <div className={styles.contact}>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className={styles.icons}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    {icons[link.label]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bar}>
          <nav aria-label="Sections">
            <ul className={styles.nav}>
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <p className={styles.mark}>{profile.name}</p>
          <p className={styles.meta}>
            {profile.location} · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
