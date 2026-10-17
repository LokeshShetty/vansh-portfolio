// The Other Work page (/other-work/): campaigns, launches, sales enablement,
// AI workflows, apps, videos and the book. Images are in src/assets/media,
// named by `name`; an entry whose image isn't there yet simply doesn't show
// its image (so screenshots can be added later without layout changes).

import type { YouTubeVideo } from "./videos";

export type Shot = { name: string; alt: string; caption?: string };

export const otherWork = {
  title: "Other Work",
  kicker: "Proof of work",
  summary:
    "Campaigns, launches, sales enablement and the AI systems behind them",

  crm: {
    kicker: "GTM campaign · HubSpot INBOUND 2025, San Francisco",
    title: "CRM is Dead, Long Live ACM",
    lead: "Reframed the product story from traditional CRM to Autonomous Customer Management, then took that narrative to the streets around HubSpot INBOUND",
    video: { id: "DstP5ODXBMQ", shape: "landscape" } as YouTubeVideo,
    did: [
      "Trucks carrying the campaign roamed around the Moscone Center",
      "Pamphlets spread across the venue and the streets around it",
      "A news-style campaign video, distributed everywhere",
      "theCRMisDead.com microsite as the campaign home",
    ],
    result: { value: "100-seat", label: "Account closed" },
    resultNote: "Plus several other client wins",
  },

  launch: {
    kicker: "Open-source launch · SuperAGI",
    title: "#1 on GitHub Trending, 10K+ stars",
    lead: "Launched SuperAGI's open-source agent framework into the developer community, where it trended at #1 on GitHub and passed 10,000 stars",
    shots: [
      {
        name: "superagi-trending",
        alt: "SuperAGI at #1 on GitHub Trending",
        caption: "#1 on GitHub Trending",
      },
      {
        name: "superagi-github",
        alt: "The SuperAGI repository on GitHub, with 17.7K stars",
        caption: "The repository today",
      },
    ] as Shot[],
  },

  enablement: {
    kicker: "Sales enablement",
    title: "Pitch decks and battlecards",
    lead: "Pitch decks and competitive positioning that turn product capabilities into customer value, for SuperAGI and Contlo",
    /** The PDF deck, shown as a slide strip. */
    pdf: {
      title: "Contlo AI deck",
      note: "Fully managed digital marketing for small businesses and startups",
      slides: Array.from({ length: 11 }, (_, i) => ({
        name: `contlo-deck-${String(i + 1).padStart(2, "0")}`,
        alt: `Contlo AI deck, slide ${i + 1}`,
      })) as Shot[],
      href: "/decks/contlo-ai-deck.pdf",
    },
    /** The training course built for the internal team and partners. */
    academy: {
      tag: "Enablement LMS",
      title: "SuperAGI Academy",
      figure: "47 lessons",
      note: "A course I built on Thinkific to train the internal team and partners on the product",
      href: "https://team-s-site-4cd4.thinkific.com/courses/take/master-superagi-course",
    },
    /** Google Slides decks (shared as "anyone with the link"). */
    slides: [
      {
        id: "1fYIhLADRdcR7rhzMooxk-oUJxmqaWjoo5JJMPj6h-Rc",
        tag: "Battlecard",
        title: "SuperAGI competitive landscape",
        note: "Where SuperAGI stands against the market, and its 25+ AI-native apps across outreach, data, engagement, marketing and support",
      },
      {
        id: "1SGn3Fka4A7BViPNZMD6GkWPSRaoxwz2Ya2VHDxfU_LM",
        tag: "Pitch deck",
        title: "SuperAGI AI-native CRM",
        note: "The AI SDR, voice agent, data quality and agentic CRM story for sales teams",
      },
      {
        id: "1q7MJDqZk-81VM2m08zYDP38Fcvx9ZltQcJjE1tEN-Fw",
        tag: "Pitch deck",
        title: "Contlo for Shopify brands",
        note: "AI-native marketing for ecommerce: campaigns, chat support, automation and analytics",
      },
    ],
  },

  ai: {
    kicker: "AI workflows",
    title: "Automation that ships content and books demos",
    lead: "Systems I built to run content and outbound at a scale a small team couldn’t do by hand",
    workflows: [
      {
        name: "Blog engine",
        figure: "100 blogs/day",
        tools: ["n8n", "Anthropic", "Perplexity", "Grok", "ngrok"],
        note: "Ran on my own local server, exposed through ngrok",
        /** First screenshot full width, the rest in a row below. */
        lead: true,
        shots: [
          {
            name: "blog-n8n-workflow",
            alt: "The n8n workflow behind the blog engine",
            caption: "The n8n workflow",
          },
          {
            name: "blog-generator-code",
            alt: "Code for the blog generation service",
            caption: "The generation service",
          },
          {
            name: "ai-search-monitoring",
            alt: "Share of voice in AI answers, tracked over time",
            caption: "Tracking visibility in AI answers",
          },
        ] as Shot[],
      },
      {
        name: "Video engine",
        figure: "50 videos/day",
        tools: ["OpenAI", "Pippit (CapCut)", "TikTok", "Meta"],
        note: "Generated and posted automatically to TikTok and Meta",
        shots: [
          {
            name: "video-engine-workflow",
            alt: "The automation that generates and sequences the videos",
            caption: "The generation workflow",
          },
          {
            name: "video-engine-posts-1",
            alt: "A grid of AI-generated short videos on Instagram",
            caption: "Published output",
          },
          {
            name: "video-engine-posts-2",
            alt: "More AI-generated short videos on Instagram",
            caption: "More of the output",
          },
        ] as Shot[],
      },
      {
        name: "AI voice agents",
        figure: "16 demos from 100 calls",
        tools: ["Bland AI", "SuperAGI", "OpenAI"],
        note: "AI voice agents making cold calls, with 16 demos booked from the first 100",
        shots: [
          {
            name: "voice-agent-pathway",
            alt: "The Bland AI call pathway: qualify, introduce, book the meeting, confirm email",
            caption: "The call pathway in Bland AI",
          },
        ] as Shot[],
      },
    ],
  },

  /** Landing pages. The section shows once it has items. */
  landing: {
    kicker: "Landing pages",
    title: "Pages built to convert",
    lead: "A glimpse of the landing pages I designed and built for launches and campaigns",
    items: [] as { name: string; note: string; shot: Shot }[],
  },

  /** Apps built with Claude Code. The section shows once it has items. */
  apps: {
    kicker: "Built with Claude Code",
    title: "Apps I’ve built",
    items: [
      {
        name: "Asset Track",
        note: "Company assets, inventory and assignments across employees",
        shot: {
          name: "app-asset-track",
          alt: "Asset Track inventory view with utilisation per item",
        },
      },
      {
        name: "ContentPilot",
        note: "AI social media operating system for agencies and their clients",
        shot: {
          name: "app-content-pilot",
          alt: "ContentPilot client view with benchmark posts and engagement",
        },
      },
      {
        name: "HRMS",
        note: "One system for attendance, leave, pay and the employee lifecycle",
        shot: {
          name: "app-hrms",
          alt: "HRMS attendance view with check-in, calendar and history",
        },
      },
      {
        name: "Restaurant POS",
        note: "Checkout, orders, products and customers for cafes and restaurants",
        shot: {
          name: "app-pos",
          alt: "Point-of-sale checkout for a cafe, with menu and cart",
        },
      },
    ] as { name: string; note: string; shot: Shot }[],
  },

  videos: {
    kicker: "Video",
    title: "From My Videos",
    items: [
      { id: "AYnTomGhhN0", shape: "landscape" },
      { id: "Wh30hpForIU", shape: "landscape" },
    ] as YouTubeVideo[],
    cta: "Watch all videos",
  },
};
