
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  impact: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
}
