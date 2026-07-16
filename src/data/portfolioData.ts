export interface Project {
  name: string;
  description: string;
  tech: string[];
  category: string;
  links?: { label: string; url: string }[];
}

export interface SkillGroup { category: string; items: string[]; }
export interface ExperienceEntry { role: string; company: string; period: string; details: string[]; }
export interface EducationEntry { degree: string; institution: string; period: string; }
export interface Certification { name: string; issuer: string; date: string; }

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: Certification[];
}

export const portfolioData: PortfolioData = {
  name: "Taha Akber",
  title: "Full-Stack Software Developer",
  bio: "I build reliable commerce platforms and modern digital products across web and mobile, with hands-on experience in React, Next.js, Remix, React Native, Node.js, and Shopify.",
  email: "taha.akber007@gmail.com",
  phone: "+92 346 2999417",
  location: "Karachi, Pakistan",
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "Remix", "TypeScript", "Tailwind CSS", "Accessibility"] },
    { category: "Backend & Data", items: ["Node.js", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "Mobile & Commerce", items: ["React Native", "Shopify Apps", "Webhooks", "Payments", "Third-party APIs"] },
    { category: "Engineering", items: ["Docker", "Microservices", "Authentication", "SSR / SSG", "Git", "API Integration"] },
  ],
  projects: [
    {
      name: "Cercle Commerce Ecosystem",
      category: "Flagship Product",
      description: "A connected Shopify commerce product spanning customer shopping, mobile experiences, administrative operations, and sales workflows across a shared platform.",
      tech: ["Shopify", "Remix", "React Native", "Node.js", "SQL Server"],
      links: [{ label: "Main Website", url: "https://cymbiote.com/" }],
    },
    {
      name: "Cercle Mobile",
      category: "Commerce · Mobile",
      description: "Cross-platform mobile shopping experience connected to the Cercle commerce backend and Shopify services.",
      tech: ["React Native", "Node.js", "Shopify", "REST APIs"],
      links: [
        { label: "Android", url: "https://play.google.com/store/apps/details?id=com.cercle.android&hl=en" },
        { label: "iOS", url: "https://apps.apple.com/us/app/cercle-shop-earn-repeat/id6782851914" },
      ],
    },
    {
      name: "Cercle Admin Panel",
      category: "Commerce · Operations",
      description: "Operational workspace for managing the product ecosystem, data, and day-to-day commerce administration.",
      tech: ["React", "Node.js", "SQL Server", "Shopify"],
      links: [{ label: "Admin Portal", url: "https://admin-live.cercle.one/" }],
    },
    {
      name: "Sales Channel",
      category: "Commerce · Integration",
      description: "A private Shopify sales-channel integration focused on reliable product and commerce workflows within merchant stores.",
      tech: ["Shopify", "Remix", "Node.js", "Webhooks"],
    },
    {
      name: "SkillBuilder",
      category: "Learning Platform",
      description: "A full-stack learning platform designed to support structured skill development through a modern, scalable web experience.",
      tech: ["Next.js", "Node.js", "JavaScript", "PostgreSQL"],
      links: [
        { label: "Frontend", url: "https://github.com/AqibQasim/SkillbuilderFrontend" },
        { label: "Backend", url: "https://github.com/AqibQasim/Skillbuilder" },
      ],
    },
    {
      name: "MVP2",
      category: "Full-Stack Product",
      description: "A responsive full-stack product developed with a modern Next.js interface and a PostgreSQL-backed Node.js architecture.",
      tech: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
      links: [{ label: "Backend", url: "https://github.com/sohaibabbasi26/MVP-2-backend" }],
    },
    {
      name: "Sign Vision",
      category: "AI · Mobile",
      description: "A mobile-first computer vision project combining a React Native application with backend services and an AI model workflow.",
      tech: ["React Native", "Node.js", "PostgreSQL", "Docker", "AI Models"],
      links: [
        { label: "Frontend", url: "https://github.com/TahaAkber/fyp_frontend" },
        { label: "Backend", url: "https://github.com/TahaAkber/fyp_backend" },
      ],
    },
  ],
  experience: [
    {
      role: "Full-Stack Software Developer",
      company: "Santex Pvt Limited",
      period: "Feb 2025 — Present",
      details: [
        "Build full-stack Shopify applications with Remix and Next.js, including loaders, actions, nested routes, SSR/SSG, and API routes.",
        "Develop secure Node.js REST APIs with authentication, validation, centralized error handling, and idempotent webhooks.",
        "Deliver accessible React and React Native experiences integrated with REST, GraphQL, payments, analytics, and third-party services.",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Coventech",
      period: "Apr 2024 — Jul 2024",
      details: [
        "Shipped production web applications using Node.js, React, Next.js, JavaScript, and PostgreSQL.",
        "Contributed to scalable microservices and integrated third-party APIs to expand product functionality.",
        "Modeled data and optimized database queries for stronger performance, reliability, and maintainability.",
      ],
    },
  ],
  education: [
    { degree: "MS Computer Science", institution: "University of Kiel", period: "2026 — Present" },
    { degree: "BS Computer Science", institution: "University of Karachi", period: "Completed 2024" },
  ],
  certifications: [
    { name: "Getting Started with Accelerated Computing in CUDA C/C++", issuer: "NVIDIA", date: "May 2024" },
    { name: "IT Industry Academia Bridge Program", issuer: "Government of Sindh", date: "May 2023" },
  ],
};

export const getPortfolioData = (): PortfolioData => {
  if (!portfolioData.name) throw new Error("Portfolio data is unavailable.");
  return portfolioData;
};
