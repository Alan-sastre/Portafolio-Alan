import type { LocalizedText } from './profile';

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillArea {
  key: string;
  label: LocalizedText;
  icon: string;
  color: string;
  skills: SkillItem[];
}

export const skillAreas: SkillArea[] = [
  {
    key: 'backend',
    label: { es: 'Backend', en: 'Backend' },
    icon: '⚙️',
    color: '#3b82f6',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 75 },
      { name: 'FastAPI', level: 80 },
      { name: 'Spring Boot', level: 65 },
    ],
  },
  {
    key: 'frontend',
    label: { es: 'Frontend', en: 'Frontend' },
    icon: '🎨',
    color: '#10b981',
    skills: [
      { name: 'JavaScript', level: 70 },
      { name: 'TypeScript', level: 65 },
      { name: 'React', level: 65 },
      { name: 'Tailwind CSS', level: 70 },
      { name: 'HTML/CSS', level: 75 },
    ],
  },
  {
    key: 'tools',
    label: { es: 'Herramientas', en: 'Tools' },
    icon: '🛠️',
    color: '#8b5cf6',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'Linux', level: 70 },
      { name: 'Docker', level: 55 },
      { name: 'Supabase', level: 60 },
      { name: 'Ciberseguridad', level: 60 },
    ],
  },
];

// Legacy format for tags view
export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = skillAreas.flatMap((area) =>
  area.skills.map((s) => ({ name: s.name, level: s.level, category: area.key }))
);

export const skillCategories: Record<string, LocalizedText> = {
  backend: { es: 'Backend', en: 'Backend' },
  frontend: { es: 'Frontend', en: 'Frontend' },
  tools: { es: 'Herramientas', en: 'Tools' },
};
