import { caseStudies, profile } from "@/data/profile";
import { Hero } from "./components/Hero/Hero";
import { Brands } from "./components/Brands/Brands";
import { Stats } from "./components/Stats/Stats";
import { CaseStudy } from "./components/CaseStudy/CaseStudy";
import { Book } from "./components/Book/Book";
import { Background } from "./components/Background/Background";
import { Footer } from "./components/Footer/Footer";
import styles from "./page.module.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  sameAs: profile.links.flatMap((l) => (l.href ? [l.href] : [])),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main>
        <Hero />
        <Brands />
        <Stats />
        <section
          id="work"
          className={`shell ${styles.work}`}
          aria-labelledby="work-title"
        >
          <div className={styles.heading}>
            <h2 id="work-title" className="display reveal">
              Selected work
            </h2>
            <p className="eyebrow reveal">
              {String(caseStudies.length).padStart(2, "0")} projects
            </p>
          </div>
          {caseStudies.map((study, i) => (
            <CaseStudy key={study.id} study={study} index={i + 1} />
          ))}
        </section>
        <Book />
        <Background />
      </main>
      <Footer />
    </>
  );
}
