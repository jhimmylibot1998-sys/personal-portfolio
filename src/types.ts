export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
}

export interface ProjectItem {
  id: string;
  slug?: string;
  number: string;
  title: string;
  category: string;
  categorySlug?: string;
  featured?: boolean;
  path?: string;
  description: string;
  image: string;
  videoUrl?: string;
  client?: string;
  year: string;
  duration?: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  challenge: string;
  solution: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  tools: string[];
}

export interface TechTool {
  name: string;
  role: string;
  category: 'AI Video' | 'AI / Creative' | 'Automation' | 'Productivity / Data';
  highlight?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface PortfolioData {
  name: string;
  initials: string;
  title: string;
  subtitle: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  heroEyebrow: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingLine3: string;
  heroHeadingLine4?: string;
  heroSupportingText: string;
  availabilityText: string;
  email: string;
  location: string;
  portraitUrl: string;
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    behance: string;
    x: string;
  };
  stats: StatItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  tools: TechTool[];
  process: ProcessStep[];
}
