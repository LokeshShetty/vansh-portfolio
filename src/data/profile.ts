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
    "I work across product marketing, growth and GTM, turning product capabilities into positioning, campaigns and distribution that drive adoption and revenue",
    "Across B2B SaaS, AI and quick commerce, I’ve worked on launches, acquisition, messaging, content, automation and go-to-market systems from strategy through execution",
  ],
  /** The big scroll-lit sentence under the strips. *Starred* words get the
   *  accent colour. */
  statement:
    "I *understand products*, shape *how they go to market*, and build *systems that help them grow*",
  email: "agi.vansh@gmail.com",
  phone: "+91 7417709500",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vansh-agicha/" },
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
  title: "Built across product, marketing and growth",
  /** Short supporting copy: one line per entry. */
  copy: [
    "Over four years, my scope expanded from execution into product launches, positioning, acquisition, GTM systems, automation and team leadership",
  ],
  /** A smaller line under the copy. */
  aside:
    "Started in video, stayed close to the craft, moved closer to the business",
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

/** Go-to-market tile in the hero grid: four stages, each with its work.
 *  Earlier versions ("How I Grow": Acquire, Convert, Scale, Automate) are in
 *  git history and content-backup/. */
export const howIGrowTitle = "How I Take Products to Market";
export const howIGrow = [
  {
    stage: "Position",
    items: ["Audience", "Messaging", "Value Proposition", "Category Narrative"],
  },
  {
    stage: "Launch",
    items: ["GTM Strategy", "Campaigns", "Landing Pages", "Sales Enablement"],
  },
  {
    stage: "Grow",
    items: ["Paid Acquisition", "SEO", "AEO / GEO", "Creators", "Outbound"],
  },
  {
    stage: "Scale",
    items: ["Automation", "CRM", "Attribution", "AI Workflows"],
  },
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
      problem: "Lean teams struggle to publish consistently",
      positioning:
        "An AI social media operating system, not another content generator",
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
      problem: "Influencer campaigns are difficult to measure",
      positioning: "A performance marketplace where brands pay for outcomes",
      flow: ["Campaign", "Creator", "Content", "Performance", "Payout"],
    },
    {
      name: "HRMS",
      type: "End-to-End HR Platform",
      problem: "Employee operations are fragmented across tools",
      positioning:
        "One system covering the employee lifecycle from hiring to exit",
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

/** "Product Marketing" section, after Selected Work. */
export const productMarketing = {
  title: "Product Marketing",
  blocks: [
    {
      name: "Positioning",
      line: "Turn product capabilities into a clear market story",
    },
    {
      name: "Messaging",
      line: "Translate technical features into customer-facing value",
    },
    {
      name: "Launches",
      line: "Build GTM plans across web, campaigns, creators, sales and offline",
    },
    {
      name: "Adoption",
      line: "Connect acquisition, onboarding, follow-up and lifecycle communication",
    },
  ],
  note: "Worked across SuperAGI, Verk and OK, spanning AI SaaS, B2B software and consumer quick commerce",
};

/** Closing section: what he's looking for, and the final call to action. */
export const next = {
  kicker: "What’s Next",
  pitch:
    "I’m interested in Growth Marketing, Product Marketing, GTM and AI-native marketing roles where I can own outcomes across positioning, acquisition, distribution and experimentation",
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
    note: "Worked across product, GTM and growth for SuperAGI, Verk and OK, spanning B2B SaaS, AI and quick commerce",
    highlights: [
      "Progressed from part-time Video Editor to Marketing Manager",
      "Managed a team of 7",
      "Received two 100% performance-based salary increases",
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
    group: "Product Marketing",
    items: ["Positioning", "Messaging", "Launches", "GTM", "Sales Enablement"],
  },
  {
    group: "Growth",
    items: ["Paid Acquisition", "Attribution", "A/B Testing", "CRO"],
  },
  {
    group: "Distribution",
    items: [
      "SEO",
      "AEO / GEO",
      "Influencer Marketing",
      "Email",
      "WhatsApp",
      "Events",
    ],
  },
  {
    group: "AI & Automation",
    items: ["n8n", "OpenAI API", "Claude Code", "AI Voice Agents"],
  },
  {
    group: "Creative",
    items: ["Landing Pages", "Campaign Creative", "Video", "Figma"],
  },
];

/** Show "Read the case study" links on the project cards and list. Off for
 *  now; set to true to bring them back. */
export const showCaseStudyLinks = false;
