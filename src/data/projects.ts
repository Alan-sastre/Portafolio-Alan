import type { LocalizedText } from './profile';

export interface Project {
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  imageColor?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: {
      es: 'Gestor de Salones',
      en: 'Room Manager',
    },
    description: {
      es: 'Sistema web completo para la reserva de salones y equipos universitarios. Incluye autenticación con Supabase, gestión de inventario, calendario interactivo de reservas y panel de administración responsive.',
      en: 'Full web system for university room and equipment reservations. Includes Supabase authentication, inventory management, interactive reservation calendar, and responsive admin panel.',
    },
    technologies: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/Alan-sastre/gestor-salones',
    liveUrl: 'https://gestor-salones.netlify.app',
    image: '/images/gestor-salones.png',
    imageColor: '#3b82f6',
    featured: true,
  },
  {
    title: {
      es: 'Pentest Labs',
      en: 'Pentest Labs',
    },
    description: {
      es: 'Entorno de laboratorio para prácticas de ciberseguridad ofensiva y defensiva. Incluye escenarios de pentesting, análisis de vulnerabilidades y pruebas de penetración en entornos controlados.',
      en: 'Laboratory environment for offensive and defensive cybersecurity practice. Includes pentesting scenarios, vulnerability analysis, and penetration testing in controlled environments.',
    },
    technologies: ['Python', 'Docker', 'Linux', 'OWASP'],
    githubUrl: 'https://github.com/Alan-sastre',
    imageColor: '#ef4444',
    featured: false,
  },
  {
    title: {
      es: 'Git-Mastery (Open Source)',
      en: 'Git-Mastery (Open Source)',
    },
    description: {
      es: 'Contribución open source a una plataforma interactiva de aprendizaje de Git. Implementé mejoras en la visualización de gráficos de commits y soporte multiidioma con Next.js y TypeScript.',
      en: 'Open source contribution to an interactive Git learning platform. Implemented improvements to commit graph visualization and multi-language support with Next.js and TypeScript.',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Git'],
    githubUrl: 'https://github.com/MikaStiebitz/Git-Mastery/pull/91',
    liveUrl: 'https://gitmastery.me',
    image: '/images/git-mastery.png',
    imageColor: '#8b5cf6',
    featured: true,
  },
  {
    title: {
      es: 'NotiCode',
      en: 'NotiCode',
    },
    description: {
      es: 'Sistema de notificaciones y alertas para desarrolladores. Permite configurar canales de comunicación y recibir notificaciones personalizadas sobre eventos del código y despliegues.',
      en: 'Notification and alert system for developers. Allows configuring communication channels and receiving personalized notifications about code events and deployments.',
    },
    technologies: ['Python', 'FastAPI', 'WebSocket', 'Docker'],
    githubUrl: 'https://github.com/Alan-sastre',
    imageColor: '#ec4899',
    featured: false,
  },
  {
    title: {
      es: 'Dopamine — Quickshell Hyprland',
      en: 'Dopamine — Hyprland Quickshell',
    },
    description: {
      es: 'Quickshell personalizada para Hyprland con navegación intuitiva y barra interactiva. Interfaz gráfica construida con QML que mejora la experiencia del entorno de trabajo en Linux.',
      en: 'Custom Quickshell for Hyprland with intuitive navigation and interactive bar. Graphical interface built with QML that enhances the Linux workspace experience.',
    },
    technologies: ['QML', 'Qt', 'Hyprland', 'Linux', 'Shell'],
    githubUrl: 'https://github.com/Alan-sastre/Dopamine',
    imageColor: '#a855f7',
    featured: true,
  },
  {
    title: {
      es: 'ExtractorCorreos',
      en: 'Email Extractor',
    },
    description: {
      es: 'Herramienta para extraer direcciones de correo electrónico de archivos y texto. Útil para análisis de datos, reconocimiento y procesamiento masivo de información.',
      en: 'Tool to extract email addresses from files and text. Useful for data analysis, reconnaissance, and bulk information processing.',
    },
    technologies: ['Python', 'Regex', 'Linux'],
    githubUrl: 'https://github.com/Alan-sastre/ExtractorCorreos',
    imageColor: '#f97316',
    featured: false,
  },
];
