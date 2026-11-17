// All homepage and services-page copy. Three equal practices:
// Research & Strategy, AI Solutions (with Caritas), AI Visibility / AEO (with LA TechSpace).

export const hero = {
  lines: ["Understand your customers.", "Get real value from AI.", "Get found in AI search."],
  subline:
    "Research Mind is a research, strategy, and AI consulting firm. We run customer research and strategy projects, help teams adopt AI, and help businesses show up in ChatGPT and other AI assistants.",
  proof: "Founded in 2020. Projects for dozens of organizations across the US, UK, and EU.",
  primaryCta: { label: "Get in touch", href: "/contact" },
  secondaryCta: { label: "See our services", href: "/services" },
};

export type Logo = { name: string; src?: string; url?: string };

export const clientsAndPartners = {
  heading: "Clients & partners",
  logos: [
    { name: "ParentPay", src: "/logos/parentpay.svg", url: "https://www.parentpay.com/" },
    { name: "Red Bull", src: "/logos/redbull.png", url: "https://www.redbullmediahouse.com/" },
    { name: "Noomo", src: "/logos/noomo.png", url: "https://noomoagency.com/" },
    { name: "Bare Stockholm", src: "/logos/bare.png", url: "https://barestockholm.com/" },
    { name: "Caritas", src: "/logos/caritas.png", url: "https://caritas.ventures/" },
    { name: "LA TechSpace", src: "/logos/latechspace.png", url: "https://latechspace.com/" },
  ] as Logo[],
};

export type Practice = {
  id: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  icon: "BarChart3" | "Cpu" | "Search";
  agentReason: "research" | "ai" | "visibility"; // ?for= key on /agents
  hook: string;
  summary: string;
  alsoCalled?: string; // plain-language note shown on the services page
  forWhen: string[];
  included: { name: string; description: string }[];
  questions: string[];
};

export const practices: Practice[] = [
  {
    id: "research-strategy",
    agentReason: "research",
    titleBefore: "Research & Strategy ",
    titleAccent: "Consulting",
    titleAfter: "",
    icon: "BarChart3",
    hook: "What do your customers think of you, and what should you fix first?",
    summary:
      "We survey and interview your customers, members, or users, find out what matters most to them, and give you a clear list of what to do next that your team and board can act on.",
    forWhen: [
      "Satisfaction, renewals, or sign-ups are slipping and nobody can say why",
      "You\u2019re about to change prices, launch something new, or rebrand, and want to know how customers will react",
      "You need numbers your leadership or board will trust",
      "You run a customer or member survey every year, but nothing changes after it",
    ],
    included: [
      {
        name: "Customer & member surveys",
        description:
          "Questions written so the answers are reliable, with results broken down by the groups that matter to you.",
      },
      {
        name: "Interviews & focus groups",
        description: "Conversations that show why customers do what they do, in their own words.",
      },
      {
        name: "What drives satisfaction",
        description:
          "We find which parts of your service most affect how customers feel, so you know where to spend time and money.",
      },
      {
        name: "Product & brand strategy",
        description: "Where to take a product or brand next, based on what customers and the market tell us.",
      },
      {
        name: "Reports people read",
        description:
          "Short, plain-language reports and decks for your team, board, or members, with charts that make the point.",
      },
    ],
    questions: [
      "What do our customers think of us?",
      "What should we fix first?",
      "Will customers pay for this?",
      "Why are renewals slipping?",
    ],
  },
  {
    id: "ai-solutions",
    agentReason: "ai",
    titleBefore: "",
    titleAccent: "AI",
    titleAfter: " Solutions Consulting",
    icon: "Cpu",
    hook: "Your team spends hours every week on work AI could handle.",
    summary:
      "We find the parts of your work that AI can take on, build the tools, and train your team to use them.",
    forWhen: [
      "Your team wants to use AI but doesn’t know where to start",
      "You’ve tried AI tools and they haven’t stuck",
      "Leadership wants an AI plan",
    ],
    included: [
      {
        name: "Find where AI saves you time",
        description:
          "We look at how your team works and list where AI would save the most time, starting with the easiest wins.",
      },
      {
        name: "Automate repetitive work",
        description: "We set up routine tasks to run on their own, so your team doesn\u2019t do them by hand.",
      },
      {
        name: "Custom AI tools",
        description: "We build tools around your processes, and your team owns them.",
      },
      {
        name: "Training & workshops",
        description: "Hands-on sessions so your team can use AI well and safely.",
      },
    ],
    questions: [
      "Where could AI save us time?",
      "How do we get started with AI?",
    ],
  },
  {
    id: "ai-visibility",
    agentReason: "visibility",
    titleBefore: "",
    titleAccent: "AI",
    titleAfter: " Visibility (AEO)",
    icon: "Search",
    hook: "When customers ask ChatGPT about products or services like yours, do you come up?",
    summary:
      "We check what ChatGPT, Gemini, and other AI assistants say about your business, then fix what they get wrong or leave out.",
    alsoCalled: "You may have heard this called AEO, short for answer engine optimization.",
    forWhen: [
      "Your customers use ChatGPT or other AI assistants to find businesses like yours",
      "AI gives wrong or outdated information about you",
      "AI recommends your competitors and not you",
    ],
    included: [
      {
        name: "Get recommended",
        description:
          "We check whether AI assistants name you when people ask for a business like yours, and who they name instead.",
      },
      {
        name: "Get your details right",
        description:
          "We check what AI says about your services, hours, and prices, and flag what’s wrong.",
      },
      {
        name: "Let AI assistants book or buy from you",
        description: "We check whether an AI assistant acting for a customer can book, buy, or contact you.",
      },
      {
        name: "Fixes & content",
        description:
          "We fix the problems in order of impact and write content that AI assistants can read and cite.",
      },
    ],
    questions: [
      "Does ChatGPT recommend us or our competitors?",
      "What do AI tools say about our business?",
    ],
  },
];

export const rollingQuestions = [
  "Why are customers leaving?",
  "What are we missing about our customers?",
  "Why aren’t we converting like we used to?",
  "Why are competitors gaining on us?",
  "Is our brand still resonating?",
  "How do we get serious about AI without wasting six months?",
];

export const whatWeDo = {
  taglineBefore: "You have questions, ",
  taglineAccent: "we have answers.",
  paragraphs: [
    "We help organizations grow, retain customers, and make stronger strategic moves through research and analytics that actually answer the question.",
    "Research Mind brings together a rare mix of expertise: a deep understanding of human behavior and a technical command of AI and machine learning. That combination lets us ask sharper questions, see further into the data, and translate findings into business outcomes you can act on.",
  ],
};

export const whyResearchMind = [
  {
    title: "Rare expertise, applied directly to your business.",
    description:
      "Our grounding spans the science of human behavior (psychology and neuroscience) and the foundations of modern AI, including machine learning and neural networks. That dual fluency is unusual, and it shows up in the quality of our thinking.",
  },
  {
    title: "Boutique by design.",
    description:
      "We\u2019re a small, senior team. Every project gets expert attention, not a junior analyst with a template. You work directly with the people doing the thinking.",
  },
  {
    title: "Big-agency rigor, right-sized for you.",
    description:
      "Large agencies charge for scale most organizations don\u2019t need. We deliver the same caliber of expertise at a scale that fits, making serious research and consulting accessible to teams that don\u2019t have an enterprise budget.",
  },
  {
    title: "AI-enabled, pragmatically.",
    description:
      "We use AI to work faster and smarter, but never at the expense of rigor. When AI helps, we use it. When the question demands a human, we apply one. We can help you build the same balance into your own team.",
  },
];

export const finalCta = {
  heading: "Let\u2019s talk about what you need.",
  body: "Tell us what you\u2019re working on and we\u2019ll tell you how we can help.",
  cta: { label: "Get in touch", href: "/contact" },
};
