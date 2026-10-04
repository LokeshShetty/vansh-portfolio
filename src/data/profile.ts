// All page copy lives here. Fields set to `null` are placeholders: the page
// hides a null link, and an asset `name` with no file behind it renders as a
// labelled empty frame until it's added (see README → Adding assets).

export type Link = { label: string; href: string | null };

export type AssetSlot = {
  /** File name (without extension) in src/assets/media/. */
  name: string;
  alt: string;
  /** Frame shape shown before the real file exists. */
  ratio?: string;
};

export type VideoSlot = AssetSlot & {
  /** e.g. "/video/ok-launch.mp4" once uploaded; null shows the poster only. */
  src: string | null;
};

export const profile = {
  name: "Vansh Agicha",
  role: "Growth Marketing Manager",
  /** Second line of the hero headline, in the accent colour. */
  tagline: "grows things.",
  current: "Marketing Manager @ Contlo · SuperAGI",
  focus: ["Performance marketing", "GTM", "AI-led growth"],
  location: "Rishikesh, India",
  intro:
    "I run full-funnel growth for B2B SaaS and consumer brands. In four years at Contlo Technologies (SuperAGI, Verk, OK) I went from part-time video editor to marketing manager, leading a team of seven.",
  /** The big scroll-lit sentence under the strips. *Starred* words get the
   *  accent colour. */
  statement:
    "From part-time video editor to *marketing manager* in four years, with two 100% performance-based raises, a *team of seven* and a *book on AGI* along the way.",
  email: "agi.vansh@gmail.com",
  links: [
    { label: "LinkedIn", href: null },
    { label: "Résumé (PDF)", href: null },
  ] satisfies Link[],
  portrait: {
    name: "portrait",
    alt: "Portrait of Vansh Agicha",
    ratio: "1 / 1",
  },
};

/** Second row of the scrolling strip, sliding the other way. */
export const channels = [
  "Paid social",
  "Search",
  "SEO",
  "AEO/GEO",
  "Cold email",
  "WhatsApp",
  "AI voice agents",
  "Creators",
  "Events",
  "Launches",
];

/** Tools shown as chips in the hero grid. */
export const stack = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "HubSpot",
  "GA4",
  "n8n",
  "OpenAI",
  "Claude Code",
  "AI voice agents",
];

/** Companies, clients and stages, shown in the scrolling strip under the hero. */
export const brands = [
  "SuperAGI",
  "Contlo",
  "Verk",
  "OK",
  "HubSpot INBOUND 2025",
  "Flexiple",
  "Apple India",
  "Round Table India",
  "Affinity Branding",
];

export type Stat = {
  kicker: string;
  value: string;
  label: string;
  /** Optional bar drawn under the number. Real figures only, 0–100. */
  meter?: { label: string; from?: number; to: number; display: string };
};

export const stats: Stat[] = [
  {
    kicker: "Pipeline",
    value: "700+",
    label: "SQLs in six months",
    meter: { label: "SQL → opportunity", to: 47, display: "47%" },
  },
  {
    kicker: "Organic",
    value: "60×",
    label: "organic traffic",
    meter: {
      label: "Domain Rating 45 → 75",
      from: 45,
      to: 75,
      display: "75/100",
    },
  },
  {
    kicker: "Launch",
    value: "₹55L",
    label: "monthly GMV, three months after launch",
  },
  {
    kicker: "Reach",
    value: "1M",
    label: "people reached by a single LinkedIn post",
  },
];

// Case studies live in src/content/work (one Markdown file each).

export const book = {
  title: "AGI Now",
  subtitle:
    "AGI is Already Here, Are You Ready for the Biggest Technological Revolution?",
  note: "Co-authored with founder Ishaan Bhola. Amazon, January 2026, Kindle and paperback.",
  href: null as string | null,
  cover: { name: "agi-now-cover", alt: "Cover of AGI Now", ratio: "2 / 3" },
};

export const experience = [
  {
    role: "Marketing Manager",
    org: "Contlo Technologies (SuperAGI, Verk, OK)",
    when: "2022 to now",
    note: "Grew from part-time video editor through design, product and GTM roles. Two 100% performance-based raises.",
  },
  {
    role: "Marketing Associate (contract)",
    org: "Flexiple",
    when: "2024",
    note: "Short-form video on startup stories, and helped build @terminalbyflexiple on Instagram.",
  },
  {
    role: "Freelance video producer",
    org: "Apple India, Round Table India, Affinity Branding",
    when: "Earlier",
    note: "Social media and event videos.",
  },
  {
    role: "BCA, GPA 8.83",
    org: "Christ University, Bengaluru",
    when: "2020 to 2023",
    note: null,
  },
];

export const toolkit = [
  {
    group: "Growth",
    items:
      "Google, Meta and LinkedIn Ads · HubSpot · GA4 · GTM · Attribution · A/B testing",
  },
  {
    group: "Channels",
    items:
      "SEO · AEO/GEO · Cold email · WhatsApp · Creators · Events and offline",
  },
  {
    group: "AI & automation",
    items: "n8n · OpenAI API · Claude Code · AI voice agents",
  },
  {
    group: "Creative",
    items: "Premiere Pro · After Effects · Photoshop · Figma · Landing pages",
  },
];
