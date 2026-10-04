// All page copy lives here. Fields set to `null` are placeholders: the page
// hides a null link, and an asset `name` with no file behind it renders as a
// labelled empty frame until it's uploaded (see README → Adding assets).

export type Link = { label: string; href: string | null };

export type AssetSlot = {
  /** File name (without extension) to drop into assets-src/. */
  name: string;
  alt: string;
  /** Frame shape shown before the real file exists. */
  ratio?: string;
};

export type VideoSlot = AssetSlot & {
  /** e.g. "/video/ok-launch.mp4" once uploaded; null shows the poster only. */
  src: string | null;
};

export type CaseStudy = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  did: string[];
  results: { value: string; label: string }[];
  assets: (AssetSlot | VideoSlot)[];
};

export const profile = {
  name: "Vansh Agicha",
  role: "Growth Marketing Manager",
  focus: ["Performance marketing", "GTM", "AI-led growth"],
  location: "Rishikesh, India",
  intro:
    "I run full-funnel growth for B2B SaaS and consumer brands. In four years at Contlo Technologies (SuperAGI, Verk, OK) I went from part-time video editor to marketing manager, leading a team of seven.",
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

export const stats = [
  { value: "700+", label: "sales-qualified leads in six months" },
  { value: "60×", label: "organic traffic growth" },
  { value: "₹55L", label: "monthly GMV, three months after launch" },
  { value: "1M", label: "people reached by a single LinkedIn post" },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "acm-inbound",
    kicker: "Campaign · HubSpot INBOUND 2025, San Francisco",
    title: "CRM is Dead, Long Live ACM",
    summary:
      "An end-to-end launch campaign for SuperAGI at INBOUND: the microsite, on-ground activations and geo-targeted ads around the venue.",
    did: [
      "Owned the campaign from concept to the event floor",
      "Built the campaign microsite",
      "Ran geo-targeted ads to reach attendees around the venue",
    ],
    results: [
      { value: "100-seat", label: "account closed, plus several more clients" },
    ],
    assets: [
      {
        name: "acm-microsite",
        alt: "The ACM campaign microsite",
        ratio: "16 / 10",
      },
      {
        name: "acm-activation",
        alt: "On-ground activation at INBOUND 2025",
        ratio: "4 / 3",
      },
    ],
  },
  {
    id: "ok-launch",
    kicker: "Launch · Consumer quick commerce, Bengaluru",
    title: "OK: from zero to ₹55 lakh GMV",
    summary:
      "Launched OK, a private-label grocery app, with two dark stores and city-wide offline campaigns alongside paid installs.",
    did: [
      "Ran app-install campaigns at ₹22 per install",
      "Planned and ran offline campaigns across the city",
      "Ran two dark stores through launch",
    ],
    results: [
      { value: "30,000+", label: "installs in two months" },
      { value: "800", label: "orders a day at peak" },
      { value: "₹55L", label: "monthly GMV within three months" },
    ],
    assets: [
      {
        name: "ok-campaign",
        alt: "OK offline campaign creative",
        ratio: "4 / 5",
      },
      { name: "ok-reel", alt: "OK launch video", ratio: "9 / 16", src: null },
    ],
  },
  {
    id: "paid-acquisition",
    kicker: "Performance marketing · B2B SaaS",
    title: "A $20K/month engine for qualified pipeline",
    summary:
      "Paid acquisition across Google, Meta and LinkedIn, with tracking built so every dollar could be traced to pipeline.",
    did: [
      "Set up attribution with GA4, HubSpot, Google Tag Manager, Meta Pixel and UTMs",
      "Ran bi-weekly performance reviews with leadership",
      "Cut creative production time by 60% with AI-assisted briefs, ad copy and A/B tests",
    ],
    results: [
      { value: "700+", label: "SQLs in six months" },
      { value: "47%", label: "SQL-to-opportunity rate" },
    ],
    assets: [
      {
        name: "ads-creatives",
        alt: "A selection of paid ad creatives",
        ratio: "16 / 10",
      },
    ],
  },
  {
    id: "organic-ai",
    kicker: "Organic growth · SEO & AEO/GEO",
    title: "An AI content engine that grew traffic 60×",
    summary:
      "An n8n and OpenAI workflow that published 100 blog posts a day, plus optimising content to appear in ChatGPT and Perplexity answers.",
    did: [
      "Designed and built the publishing automation",
      "Set up prompt monitoring for AI search visibility",
    ],
    results: [
      { value: "60×", label: "organic traffic" },
      { value: "45 → 75", label: "Domain Rating" },
      { value: "5×", label: "traffic from ChatGPT and Perplexity" },
    ],
    assets: [
      {
        name: "organic-growth-chart",
        alt: "Organic traffic growth over time",
        ratio: "16 / 9",
      },
    ],
  },
  {
    id: "social-brand",
    kicker: "Brand & social · SuperAGI",
    title: "Social, creators and a #1 trending launch",
    summary:
      "Owned SuperAGI's social roadmap, ran a LinkedIn creator program and helped take the open-source launch to the top of GitHub.",
    did: [
      "Built a video automation producing 50 reels a day",
      "Onboarded 20+ LinkedIn creators a month on a $10K monthly budget",
    ],
    results: [
      { value: "1M", label: "reach on a single LinkedIn post" },
      { value: "~1,000", label: "sign-ups per creator" },
      { value: "10K", label: "GitHub stars; #1 trending for a week" },
    ],
    assets: [
      {
        name: "social-posts",
        alt: "Top-performing LinkedIn posts",
        ratio: "4 / 3",
      },
      {
        name: "social-reel",
        alt: "Sample automated reel",
        ratio: "9 / 16",
        src: null,
      },
    ],
  },
  {
    id: "outbound",
    kicker: "Outbound · Email, WhatsApp, AI voice",
    title: "Cold outreach that books demos",
    summary:
      "Multi-channel outbound at scale, plus AI voice agents for both cold calling and hiring.",
    did: [
      "Sent about 500K cold emails a month across 30 inboxes",
      "Sent 3,000 WhatsApp messages a day",
      "Built a hiring workflow on WhatsApp and AI voice agents",
    ],
    results: [
      { value: "40%", label: "email open rate" },
      { value: "16", label: "demos booked from 100 AI calls in five days" },
      { value: "200", label: "people hired in one month" },
    ],
    assets: [],
  },
];

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
