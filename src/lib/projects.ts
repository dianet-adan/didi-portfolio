export type CategoryId = "uxui" | "branding" | "advertising";

export interface BentoShowcase {
  large: string;
  brandCard: {
    background: string;
    eyebrow: string;
    title: string;
    tagline: string;
    groupLabel: string;
    items: [string, string][];
  };
  bottomMiddle: string;
  bottomRight: string;
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  type?: string;
  role: string;
  brief: string;
  collaboration?: string;
  tags: string[];
  image: string;
  gallery?: string[];
  bento?: BentoShowcase;
  rotate: number;
}

export interface FolderData {
  id: CategoryId;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  intro: string;
  color: string;
  textColor: string;
  image: string;
  projects: Project[];
}

export const projects: Project[] = [
  {
    slug: "ascendone",
    title: "AscendONE",
    category: "uxui",
    type: "Omnichannel SaaS platform",
    role: "Product Designer · UX/UI Designer · Brand Design Support",
    brief:
      "AscendONE had to turn complex campaign-management logic into one clear, scalable SaaS platform — helping users create campaigns, configure channels and read performance from one place.",
    tags: [
      "Product Design",
      "UX/UI",
      "SaaS",
      "Dashboard Design",
      "Campaign Management",
      "Design System",
      "UX Strategy",
    ],
    image: "/images/ascendone/cover.png",
    gallery: [
      "/images/ascendone/screens.png",
      "/images/ascendone/dashboard1.png",
      "/images/ascendone/dashboard2.png",
      "/images/ascendone/channels.png",
    ],
    rotate: -2,
  },
  {
    slug: "kiddo",
    title: "KidDo",
    category: "uxui",
    role: "UX/UI Designer · Visual Designer",
    brief:
      "A mobile app that helps children and parents manage homework, school subjects and learning routines — turning daily school tasks into clear, friendly, easy-to-follow actions.",
    tags: [
      "UX/UI",
      "Mobile App",
      "Education",
      "Product Design",
      "Visual System",
      "Illustration",
      "Family Experience",
    ],
    image: "/images/kiddo/cover.png",
    gallery: ["/images/kiddo/screens.png", "/images/kiddo/graphic.png"],
    rotate: 1.5,
  },
  {
    slug: "visionary",
    title: "Visionary",
    category: "branding",
    role: "Creative Director · Brand Designer",
    brief:
      "A refined and scalable identity system connecting eyewear, optical spaces and creative studio services under one premium brand architecture — custom typographic logo, restrained palette and editorial art direction.",
    tags: [
      "Brand Identity",
      "Creative Direction",
      "Premium Retail",
      "Visual System",
      "Packaging",
      "Brand Architecture",
    ],
    image: "/images/visionary/cover.jpg",
    bento: {
      large: "/images/visionary/mockup.png",
      brandCard: {
        background: "/images/visionary/brand-bg.jpg",
        eyebrow: "Main Logo",
        title: "Visionary",
        tagline: "Design with intention",
        groupLabel: "Logos per business",
        items: [
          ["Visionary", "Studio"],
          ["Visionary", "Spaces"],
          ["Visionary", "Eyewear"],
        ],
      },
      bottomMiddle: "/images/visionary/pr-box.png",
      bottomRight: "/images/visionary/glasses.jpg",
    },
    rotate: -1.5,
  },
  {
    slug: "rebel-owners",
    title: "Rebel Owners",
    category: "branding",
    role: "Creative Director · Brand Designer",
    brief:
      "A pet lifestyle brand for dogs with attitude and humans who don't follow the pack — a bold visual universe inspired by streetwear, retro graphics, humor and self-expression.",
    tags: [
      "Brand Identity",
      "Pet Lifestyle",
      "Art Direction",
      "Streetwear",
      "Editorial Photography",
      "Visual System",
    ],
    image: "/images/rebelowners/cover.png",
    gallery: ["/images/rebelowners/bulldog.png"],
    rotate: 2,
  },
  {
    slug: "beyond-meat",
    title: "Beyond Meat",
    category: "advertising",
    role: "Art Direction · Visual Storytelling · Campaign Design",
    brief:
      "As Beyond Meat grew its presence in Europe, the brand needed bold, culturally-connected social-first content — translating the global brand identity into engaging digital campaign visuals.",
    collaboration:
      "Developed as part of a multidisciplinary creative team — copywriters, strategists and social media specialists.",
    tags: [
      "Art Direction",
      "Campaign Design",
      "Social Media",
      "Visual Storytelling",
      "Food Brand",
      "Team Collaboration",
    ],
    image: "/images/beyondmeat/cover.jpg",
    gallery: ["/images/beyondmeat/illustrations.png"],
    rotate: -1,
  },
  {
    slug: "toblerone",
    title: "Toblerone",
    category: "advertising",
    role: "Art Direction · Visual Concepting · Campaign Design and Communication",
    brief:
      "Toblerone set out to evolve its communication and move beyond its perception as a traditional airport chocolate — a more modern, desirable, occasion-led visual direction.",
    collaboration:
      "Developed with a creative team — copywriters, strategists and the brand team.",
    tags: [
      "Art Direction",
      "Campaign Design",
      "Brand Communication",
      "Visual Concepting",
      "Social Media",
      "Team Collaboration",
    ],
    image: "/images/toblerone/cover.jpg",
    gallery: ["/images/toblerone/social.png"],
    rotate: 1,
  },
];

export const folders: FolderData[] = [
  {
    id: "uxui",
    slug: "ux-ui",
    number: "Folder 01",
    title: "UX/UI Projects",
    subtitle: "Product Design · UX/UI · Digital Experiences",
    intro:
      "Digital products and interfaces designed to make complex systems feel clear — from SaaS dashboards to mobile apps for families.",
    color: "var(--yellow)",
    textColor: "var(--ink)",
    image: "/images/base/folder-uxui.png",
    projects: projects.filter((p) => p.category === "uxui"),
  },
  {
    id: "branding",
    slug: "branding",
    number: "Folder 02",
    title: "Branding Projects",
    subtitle: "Creative Direction · Brand Design · Communication",
    intro:
      "Brand systems and identities built from the ground up — typography, palette, packaging and art direction working as one voice.",
    color: "var(--red)",
    textColor: "var(--paper)",
    image: "/images/base/folder-branding.png",
    projects: projects.filter((p) => p.category === "branding"),
  },
  {
    id: "advertising",
    slug: "advertising",
    number: "Folder 03",
    title: "Advertising Projects",
    subtitle: "Creative Direction · Social Media · Asset Design",
    intro:
      "Campaign and social-first visual storytelling for established brands — translating global identities into culturally-connected content.",
    color: "var(--blue)",
    textColor: "var(--paper)",
    image: "/images/base/folder-advertising.png",
    projects: projects.filter((p) => p.category === "advertising"),
  },
];

export const ascendOne = {
  title: "AscendONE",
  type: "Omnichannel SaaS platform",
  role: "Product Designer · UX/UI Designer · Brand Design Support",
  collaboration:
    "Front-end developers · Back-end developers · Platform specialists · Sales team",
  challenge:
    "AscendONE had to turn complex campaign-management logic into one clear, scalable SaaS platform. Users needed to create campaigns, define objectives, configure channels, manage audiences, select locations, understand statuses and analyze performance from one place. At the same time, internal teams needed a product that was easier to maintain, explain and sell.",
  proposal:
    "AscendONE is a SaaS platform designed to make omnichannel campaign management clearer, more structured and easier to scale. The experience was redesigned to help users configure campaigns and channels with more confidence, navigate complex decisions with less friction and understand performance more easily.",
  valuePoints: [
    {
      title: "Simplified setup",
      text: "Clearer campaign and channel configuration flows.",
    },
    {
      title: "Better visibility",
      text: "Dashboards and statuses designed for faster decisions.",
    },
    {
      title: "Scalable system",
      text: "Reusable components to support consistency and product growth.",
    },
  ],
  features: [
    {
      title: "Simplified campaign creation",
      text: "A clearer flow to help users build omnichannel campaigns with less friction and faster decision-making.",
    },
    {
      title: "Centralized Channel Configuration",
      text: "Unified setup for Meta, Google Ads and DV360, making channel activation easier to manage.",
    },
    {
      title: "Store & Zone Management",
      text: "Better visibility over stores, target areas and campaign locations across different regions.",
    },
    {
      title: "Interactive Dashboards",
      text: "Clear reporting dashboards to understand budget, impressions, clicks, visits and conversions at a glance.",
    },
    {
      title: "Multi-user Roles & Permissions",
      text: "Clearer access levels and collaboration flows for teams working inside the platform.",
    },
    {
      title: "Design System Consistency",
      text: "A scalable component system to improve consistency, speed up design decisions and support product growth.",
    },
  ],
  tags: [
    "Product Design",
    "UX/UI",
    "SaaS",
    "Dashboard Design",
    "Campaign Management",
    "Design System",
    "UX Strategy",
  ],
};
