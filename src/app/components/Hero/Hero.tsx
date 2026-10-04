import { Fragment } from "react";
import { Asset } from "@/components/Asset/Asset";
import { Text } from "@/components/Text/Text";
import { profile, stack, stats, type Stat } from "@/data/profile";
import styles from "./Hero.module.css";

function Words({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={word + i}>
      {i > 0 && " "}
      <span
        className="word"
        style={{ "--i": start + i } as React.CSSProperties}
      >
        <span>{word}</span>
      </span>
    </Fragment>
  ));
}

function StatTile({ stat, index }: { stat: Stat; index: number }) {
  const { meter } = stat;
  return (
    <div
      className={`tile ${styles.stat} reveal stagger`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <p className="eyebrow">{stat.kicker}</p>
      <p className={`display ${styles.value}`}>
        <Text>{stat.value}</Text>
      </p>
      <p className={styles.label}>{stat.label}</p>
      {meter && (
        <div className={styles.meter}>
          <div
            className={styles.track}
            role="img"
            aria-label={`${meter.label}: ${meter.display}`}
            style={
              {
                "--from": `${meter.from ?? 0}%`,
                "--to": `${meter.to}%`,
              } as React.CSSProperties
            }
          >
            <span className={styles.fill} />
          </div>
          <p className={styles.meterLabel}>
            <span>{meter.label}</span>
            <span>{meter.display}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const nameWords = profile.name.split(" ").length;

  return (
    <header className={styles.hero}>
      {/* Greyscale portrait behind the grid; the tiles are translucent so it
          shows through them softly. */}
      <div className={styles.backdrop} aria-hidden="true">
        <Asset
          {...profile.portrait}
          alt=""
          className={styles.picture}
          sizes="(min-width: 90rem) 52rem, (min-width: 40rem) 60vw, 26rem"
          priority
        />
      </div>

      <div className={`shell ${styles.bento}`}>
        <div className={`tile ${styles.intro}`}>
          {/* Filled by src/three/funnel.ts after the page is idle; see postbuild. */}
          <canvas data-funnel className={styles.funnel} aria-hidden="true" />
          <p className={`eyebrow ${styles.status}`}>{profile.current}</p>
          <h1 className={`display ${styles.name}`}>
            <Words text={profile.name} start={0} />
            <br />
            <span className={styles.tagline}>
              <Words text={profile.tagline} start={nameWords} />
            </span>
          </h1>
          <div className={styles.lower}>
            <p className={styles.lede}>{profile.intro}</p>
            <span className={styles.place}>{profile.location}</span>
          </div>
        </div>

        {stats.map((stat, i) => (
          <StatTile key={stat.kicker} stat={stat} index={i} />
        ))}

        <div className={`tile ${styles.stack} reveal`}>
          <p className="eyebrow">Stack</p>
          <ul className={styles.chips}>
            {stack.map((tool) => (
              <li key={tool} className="chip">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <a
          className={`tile ${styles.cta} reveal`}
          href={`mailto:${profile.email}`}
        >
          <span className="eyebrow">Open to talk</span>
          <span className={`display ${styles.ctaText}`}>
            Let&rsquo;s grow <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </header>
  );
}
