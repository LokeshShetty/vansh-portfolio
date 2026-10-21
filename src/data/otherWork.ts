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
        tag: "Sales deck",
        title: "SuperAGI Marketing",
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
    kicker: "Landing pages and creatives",
    title: "Positioning, made visible",
    lead: "A glimpse of the landing pages and launch creatives I made for SuperAGI, Contlo and InfluencerEarn",
    /** Landing page heroes, shown two across above the sections. */
    heroes: [
      {
        name: "lp-superagi-gtm-hero",
        alt: "SuperAGI homepage hero: All-in-one agentic GTM platform",
        caption: "SuperAGI · All-in-one agentic GTM platform",
      },
      {
        name: "lp-influencerearn",
        alt: "InfluencerEarn homepage: where creators collaborate and brands perform",
        caption:
          "InfluencerEarn · Where creators collaborate and brands perform",
      },
    ] as Shot[],
    /** Landing page sections, widest story first. */
    pages: [
      {
        name: "lp-superagi-sales-marketing",
        alt: "SuperAGI landing page section: Sales and Marketing, finally together with AGI",
        caption: "SuperAGI · Sales and marketing on one agentic platform",
      },
      {
        name: "lp-supersales-why",
        alt: "SuperSales landing page section: why SuperSales is the only sales platform you need",
        caption: "SuperSales · Why one platform",
      },
      {
        name: "lp-supersales-scheduling",
        alt: "SuperSales landing page section: old vs new way of booking meetings",
        caption: "SuperSales · Smarter scheduling, old way vs new",
      },
    ] as Shot[],
    /** Launch and campaign creatives. */
    creatives: [
      {
        name: "creative-superagi-super-app",
        alt: "SuperAGI creative: AI Super App for Work",
        caption: "SuperAGI · AI Super App for Work",
      },
      {
        name: "creative-superagi-four-apps",
        alt: "SuperAGI creative: Four new apps just landed in SuperAGI",
        caption: "SuperAGI · Four new apps launch",
      },
      {
        name: "creative-superagi-dialer",
        alt: "SuperAGI creative: Reach a global audience with the AI-native dialer",
        caption: "SuperAGI · AI-native dialer",
      },
      {
        name: "creative-contlo-web-sdk",
        alt: "Contlo launch creative: Introducing Web SDK for custom websites",
        caption: "Contlo · Web SDK launch",
      },
      {
        name: "creative-contlo-automation",
        alt: "Contlo creative: Automation Back Population, coming soon",
        caption: "Contlo · Automation back population",
      },
      {
        name: "creative-contlo-black-friday",
        alt: "Contlo Black Friday landing page and popup creative",
        caption: "Contlo · Black Friday pages and popups",
      },
    ] as Shot[],
  },

  /** Scripts, taglines and campaign copy. Each piece shows its idea up
   *  front; the full text opens on demand. */
  writing: {
    kicker: "Writing",
    title: "Scripts, taglines and copy",
    lead: "Brand films, launch scripts, positioning lines and campaign copy written for Verk and SuperAGI",
    pieces: [
      {
        tag: "Brand film · Verk",
        title: "Verk Hard, So You Can Live Harder",
        idea: "Inspired by Nike’s human-centred storytelling. Instead of talking about how AI improves productivity, the film focuses on what people could do with the time they get back: work shouldn’t take away from living",
        label: "Read the script",
        body: [
          "Since the dawn of mankind.",
          "We have always been... Well, just working.",
          "We have toiled hard, ground it out, burned the midnight oil, slogged away, busted our backs, broken our necks, and sweated it out.",
          "But! What if there is a better way to work?",
          "What if your work could be done automagically by AI?",
          "What if you could simply live better?",
          "Leaving you with more time to savor the moments, discover new horizons, nurture your passions, smell the roses, kick back and unwind, seek out wonder, soak up the inspiration, and bask in tranquility?",
          "With Verk, you can just delegate your work to your AI Employees.",
          "Verk Hard, so you can live harder.",
        ],
        link: {
          label: "Watch the film",
          href: "https://www.youtube.com/watch?v=-XFWpEpQzmU",
        },
      },
      {
        tag: "Launch tagline · Verk",
        title: "Stop Working. Start Verk-ing.",
        idea: "A line that explains the product without getting into AI agents. Stop Working, because you don’t need to do everything yourself. Start Verk-ing, because your AI Employees take care of the work. The brand name becomes an action",
      },
      {
        tag: "Product launch video · SuperAGI",
        wide: true,
        title: "Put AI agents to work for sales",
        idea: "The launch script for SuperAGI’s all-in-one sales platform: from the mess of tools and tasks to one system of AI agents for leads, outreach, calls, meetings, deals, CRM and buying signals",
        label: "Read the script",
        body: [
          "Growing a business? Yeah, it’s a lot.",
          "Finding leads, crafting campaigns, juggling calls, and managing deals. It’s hard. And let’s not even start on managing all the tools needed to do it. Messy, right?",
          "Say hello to SuperAGI, a super-intelligent, all-in-one solution for seamless, scalable, and autonomous sales, powered by AI agents.",
          "At its core, SuperAGI uses powerful AI agents to do the heavy lifting. From finding leads to managing customer relationships, it brings everything together into one integrated system. SuperAGI handles it all, so you can spend less time on the grind and more time driving results.",
          "SuperAGI takes the guesswork out of prospecting with access to a database of 275 million+ verified leads. Simply set your Ideal Customer Profile, and your next big client could be just seconds away. Plus, the Chrome extension makes it effortless to add leads straight from LinkedIn to your CRM. Email or call them instantly without breaking your workflow.",
          "And with AI SDRs working around the clock, you can run outreach, handle follow-ups, and book meetings, all without lifting a finger. SuperAGI takes care of the grind, so you can focus on what you do best: the good parts of selling.",
          "Not every lead is the same, and SuperAGI gets that. Build custom agentic workflows that combine emails, LinkedIn engagement, and calls into seamless sequences.",
          "Need help with calls? The AI Dialer has your back. Whether it’s a Power Dialer, Parallel Dialer, or Predictive Dialer, it’s equipped to handle your call blitzes with ease. From call logs to recordings and transcriptions, it keeps everything neat and tidy. Run calling campaigns, drop voicemails automatically, and handle inbound call routing like a pro. Plus, get real-time prospect data during every call, ensuring your team has actionable insights throughout every interaction. AI-generated summaries after every call give you visibility into what worked.",
          "Convert demand into meetings without the scheduling headaches. SuperAGI’s Meeting Agents allow you to turn incoming leads into booked meetings while keeping track of cancellations and conversions. Share a booking link, embed it on your website, or schedule meetings manually.",
          "Introducing SuperAGI Deal Management, your tool for mastering every sales opportunity. With multiple pipelines and enhanced deal visibility, you can track, organise, and forecast revenue with greater accuracy and control.",
          "Get rid of your bloated legacy CRM and replace it with SuperAGI’s modern, AI-native CRM. Built for both humans and AI agents, it prioritises your top prospects and keeps everything fresh and actionable. Goodbye, manual CRM data entry.",
          "Know when buyers are ready. SuperAGI’s Signals track key intent moments, like when someone visits your website, reacts to a LinkedIn post, or engages with a competitor. Set up signals in seconds. Leads get enriched, scored, and routed instantly, so you can reach them at the right time.",
          "No more switching between ten different tools. No more struggling to keep track of it all. With SuperAGI, your sales team can focus on what truly matters: building relationships and closing deals.",
          "Put AI agents to work for sales. Get started with SuperAGI today.",
        ],
        link: {
          label: "Watch the launch video",
          href: "https://www.youtube.com/watch?v=7QLsNSJ1Ycg",
        },
      },
      {
        tag: "Lifecycle campaigns · SuperAGI, WhatsApp",
        title: "Launches and feature education",
        idea: "Customer-facing messages that announce a capability, position the platform and teach one use case at a time",
        label: "Read the messages",
        sections: [
          {
            name: "Vibe Coder launch",
            goal: "Announce a new AI-native development capability and drive adoption",
            lines: [
              "We just removed weeks from your build cycle.",
              "Vibe Coder is now inside SuperAGI.",
              "Talk to it. It builds your website or full-stack app in real time. Branding, structure, preview included.",
              "This is Agentic Development.",
              "It’s live in your workspace. Start building today.",
            ],
          },
          {
            name: "Introducing SuperAGI’s AI-Native CRM",
            goal: "Position SuperAGI as one AI-native platform for the whole customer lifecycle",
            lines: [
              "Big News from SuperAGI",
              "SuperAGI just became the first AI-Native CRM built for the entire Customer Lifecycle.",
              "AI Sales: already trusted to reimagine selling.",
              "AI Marketing: agents that design, personalize, and run campaigns across WhatsApp, Email, SMS, Instagram & more.",
              "AI Support: AI that listens, resolves & acts across Chat, Voice & Email.",
              "Now it all works together, Sales + Marketing + Support, in one AI-powered platform.",
              "No silos. No juggling tools. Just one CRM that finally does it all.",
              "Ready to see it in action?",
            ],
          },
          {
            name: "Abandoned cart automations",
            goal: "Introduce a practical automation use case to existing customers",
            lines: [
              "With Automations in SuperAGI Marketing, you can set up follow-ups that run automatically.",
              "Try this automation: a customer adds products to their cart but doesn’t complete the order.",
              "The automation can then: wait for a while → send a reminder → follow up on another channel if needed → stop once the purchase is completed.",
              "Simple to set up, and useful for recovering abandoned carts.",
            ],
          },
        ],
      },
      {
        tag: "Moment marketing · SuperAGI, GPT-5 launch, August 2025",
        title: "Did SuperAGI inspire GPT-5?",
        idea: "When GPT-5 launched, its new interface shared a surprisingly similar palette with SuperAGI: purple, violet and soft warm gradients. We put the two side by side and made a playful reference to it",
        label: "Read the post",
        body: [
          "GPT-5 just launched, its new interface caught our attention for a slightly different reason",
          "The purple, violet, and warm pastel gradients looked a lot like the colours we’d been using at SuperAGI",
          "We couldn’t resist putting the two side by side",
          "Did we inspire OpenAI? We’ll let the screenshots do the talking",
          "A little tribute from one AI brand to another",
        ],
        shots: [
          {
            name: "writing-superagi-ui",
            alt: "The SuperAGI interface",
            caption: "SuperAGI",
          },
          {
            name: "writing-gpt5-ui",
            alt: "The GPT-5 launch interface",
            caption: "GPT-5",
          },
        ] as Shot[],
      },
    ] as {
      tag: string;
      title: string;
      /** Span the full row. */
      wide?: boolean;
      idea: string;
      label?: string;
      body?: string[];
      sections?: { name: string; goal: string; lines: string[] }[];
      link?: { label: string; href: string };
      shots?: Shot[];
    }[],
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
