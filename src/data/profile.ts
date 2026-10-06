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
  tagline: "grows things",
  current: "Marketing Manager @ Contlo · SuperAGI",
  focus: ["Performance marketing", "GTM", "AI-led growth"],
  location: "Bengaluru, India",
  /** Hero supporting copy: one line per entry. */
  intro: [
    "I build growth systems across performance marketing, GTM, AI automation, content and product launches",
    "Over four years at Contlo Technologies, I went from part-time Video Editor to Marketing Manager, leading a team of 7",
  ],
  /** The big scroll-lit sentence under the strips. *Starred* words get the
   *  accent colour. */
  statement:
    "From part-time video editor to *marketing manager* in four years, with two 100% performance-based raises, a *team of seven* and a *book on AGI* along the way",
  email: "agi.vansh@gmail.com",
  links: [
    { label: "LinkedIn", href: null },
    { label: "Résumé (PDF)", href: null },
  ] satisfies Link[],
  portrait: {
    name: "portrait-cutout",
    alt: "Portrait of Vansh Agicha",
    ratio: "1006 / 1150",
  },
};

/** The work-experience video, shown after the statement. Until `src` is
 *  set, a placeholder frame shows. Put the file in public/video/ and an
 *  image named `work-video` in src/assets/media/ for its cover. */
export const video = {
  name: "work-video",
  alt: "Vansh walking through his work experience",
  ratio: "16 / 9",
  src: "/video/work-video.mp4" as string | null,
  kicker: "Watch",
  title: "From Execution to Ownership",
  /** Short supporting copy: one line per entry. */
  copy: [
    "I started by editing videos and gradually moved across design, product, growth, GTM and marketing leadership",
    "The scope changed, but the habit stayed the same: build, test, learn and own the outcome",
  ],
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

/** "How I Grow" tile in the hero grid: what each set of tools is for.
 *  Previous labels, to restore: Acquire (Google Ads, Meta Ads, LinkedIn Ads,
 *  Cold Email); Convert (HubSpot, Landing Pages, WhatsApp, AI Voice); Scale
 *  (SEO, AEO/GEO, Creators, Events); Automate (n8n, OpenAI, Claude Code) */
export const howIGrow = [
  {
    stage: "Acquire",
    items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Cold Email"],
  },
  {
    stage: "Convert",
    items: ["HubSpot CRM", "Landing Pages", "WhatsApp", "AI Voice Agents"],
  },
  {
    stage: "Scale",
    items: ["SEO", "AEO / GEO", "Influencer Marketing", "Events / Offline GTM"],
  },
  { stage: "Automate", items: ["n8n", "OpenAI API", "Claude Code"] },
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
  /** Optional supporting line under the label. */
  detail?: string;
  /** Optional bar drawn under the number. Real figures only, 0–100. */
  meter?: { label: string; from?: number; to: number; display: string };
};

export const stats: Stat[] = [
  {
    kicker: "Pipeline",
    value: "700+",
    label: "SQLs in 6 months",
    meter: { label: "SQL → Opportunity", to: 47, display: "47%" },
  },
  {
    kicker: "Organic",
    value: "60×",
    label: "Traffic growth",
    meter: { label: "DR 45 → 75", from: 45, to: 75, display: "75/100" },
  },
  {
    kicker: "Consumer",
    value: "₹55L",
    label: "Monthly GMV",
    detail: "30K+ installs • 800 peak orders/day",
  },
  {
    kicker: "Brand",
    value: "1M",
    label: "Peak reach on a single LinkedIn post",
  },
];

/** "I also build products" section, after Selected Work. */
export const products = {
  title: "I also build products",
  items: [
    {
      name: "Content Pilot",
      type: "AI Social Media Operating System",
      flow: [
        "Learns brand context",
        "Builds content calendar",
        "Generates posts and creatives",
        "Publishes",
        "Monitors engagement",
      ],
    },
    {
      name: "InfluencerEarn",
      type: "Performance Influencer Marketplace",
      flow: ["Campaign", "Creator", "Content", "Performance", "Payout"],
    },
    {
      name: "HRMS",
      type: "End-to-End HR Platform",
      flow: [
        "Hiring",
        "Attendance",
        "Leave",
        "Payroll",
        "Performance",
        "Offboarding",
      ],
    },
  ],
  also: ["LOS", "POS", "Invoice Generator", "Event Platform"],
  /** Revenue is from HRMS and Content Pilot only, not every product. */
  proof: {
    scope: "HRMS + Content Pilot",
    figures: [
      { value: "5", label: "Clients" },
      { value: "₹2.5L", label: "Total one-time revenue" },
    ],
  },
};

/** Closing section: what he's looking for, and the final call to action. */
export const next = {
  kicker: "What’s Next",
  pitch:
    "I’m interested in Growth Marketing, Marketing & Growth, GTM and AI-native marketing roles where I can own outcomes across acquisition, distribution and experimentation",
  /** *Starred* word gets the accent colour. */
  cta: "Let’s build something that *grows*",
};

// Case studies live in src/content/work (one Markdown file each).

export const book = {
  title: "AGI Now",
  kicker: "Co-author • Amazon • 2026",
  description:
    "Co-authored with SuperAGI founder Ishaan Bhola, exploring how agentic AI is changing software, economics and responsibility",
  cta: "View on Amazon",
  href: "https://www.amazon.com/dp/B0GJFGW6V9" as string | null,
  /** The three parts of the wraparound cover, cut from one image. */
  cover: {
    name: "agi-now-cover",
    alt: "Front cover of AGI Now by Ishaan Bhola with Vansh Agicha",
    ratio: "2 / 3",
  },
  spine: { name: "agi-now-spine", alt: "", ratio: "94 / 1434" },
  back: { name: "agi-now-back", alt: "Back cover of AGI Now", ratio: "2 / 3" },
};

export type Role = {
  role: string;
  org: string;
  when: string;
  note: string | null;
  /** The path within the role, shown as steps. */
  path?: string[];
  /** Short proof points, shown as chips. */
  highlights?: string[];
};

export const experience: Role[] = [
  {
    role: "Marketing Manager",
    org: "Contlo Technologies (SuperAGI, Verk, OK)",
    when: "2022 to now",
    note: null,
    path: [
      "Video Editor",
      "Design",
      "Product",
      "Growth",
      "GTM",
      "Marketing Manager",
    ],
    highlights: [
      "Managed a team of 7",
      "Two 100% performance-based salary increases",
    ],
  },
  {
    role: "Marketing Associate (contract)",
    org: "Flexiple",
    when: "2024",
    note: "Short-form video on startup stories, and helped build @terminalbyflexiple on Instagram",
  },
  {
    role: "Freelance video producer",
    org: "Apple India, Round Table India, Affinity Branding",
    when: "Earlier",
    note: "Social media and event videos",
  },
  {
    role: "BCA, GPA 8.83",
    org: "Christ University, Bengaluru",
    when: "2020 to 2023",
    note: null,
  },
];

export const capabilities = [
  {
    group: "Growth",
    items: ["Paid Acquisition", "Attribution", "CRO", "GTM", "A/B Testing"],
  },
  {
    group: "Distribution",
    items: ["SEO", "AEO/GEO", "Influencers", "Email", "WhatsApp", "Events"],
  },
  {
    group: "AI",
    items: ["n8n", "OpenAI", "AI Voice", "Claude Code", "Automation"],
  },
  {
    group: "Creative",
    items: ["Landing Pages", "Video", "Design", "Campaign Creative"],
  },
];
