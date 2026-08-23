export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  role?: string;
  period?: string;
  description: string;
  impact: string;
  images: string[];
  technologies: string[];
  link?: string;
  category: 'enterprise' | 'web' | 'ecommerce' | 'ai' | 'corporate';
  featured?: boolean;
  fullDetails?: {
    overview: string;
    keyFeatures: { title: string; desc: string }[];
    technologiesUsed: string[];
    challengesAndLearnings?: string;
    outcome?: string;
  };
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  image?: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  level: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
  proficiencyItems?: SkillItem[];
}

export interface Certification {
  title: string;
  issuer: string;
  period: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
}

