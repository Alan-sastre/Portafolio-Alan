import { registerTranslations } from './LanguageContext';

const translations: Record<string, { es: string; en: string }> = {
  // Nav
  'nav.about': { es: 'Sobre mí', en: 'About' },
  'nav.projects': { es: 'Proyectos', en: 'Projects' },
  'nav.experience': { es: 'Experiencia', en: 'Experience' },
  'nav.skills': { es: 'Habilidades', en: 'Skills' },
  'nav.education': { es: 'Educación', en: 'Education' },
  'nav.github': { es: 'GitHub', en: 'GitHub' },
  'nav.technologies': { es: 'Tecnologías', en: 'Technologies' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },

  // Hero
  'hero.role': { es: 'Desarrollador de Software', en: 'Software Developer' },
  'hero.tagline': { es: 'Desarrollador de Software en Bogotá, Colombia', en: 'Software Developer in Bogotá, Colombia' },
  'hero.cta_projects': { es: 'Ver proyectos', en: 'View projects' },
  'hero.cta_contact': { es: 'Contactar', en: 'Contact me' },

  // About
  'about.title': { es: 'Sobre mí', en: 'About Me' },
  'about.subtitle': { es: 'Conóceme', en: 'Get to know me' },
  'about.p1': {
    es: 'Desarrollador de software con enfoque en backend, seguridad y soluciones con IA. Me interesa construir la capa que conecta producto, datos y usuarios: APIs, automatizaciones, lógica de negocio y sistemas confiables que realmente resuelven problemas.',
    en: 'Software developer focused on backend, security, and AI-powered solutions. I\'m interested in building the layer that connects product, data, and users: APIs, automations, business logic, and reliable systems that actually solve real problems.',
  },
  'about.p2': {
    es: 'Mi trabajo está centrado en crear soluciones útiles y escalables, con atención a la calidad, la seguridad y la experiencia operativa. Estoy enfocado en integrar IA para mejorar procesos, apoyar decisiones y entregar productos más inteligentes sin perder rigor técnico.',
    en: 'My work is centered on building useful, scalable solutions with attention to quality, security, and operational experience. I\'m focused on integrating AI to improve processes, support decisions, and deliver smarter products without losing technical rigor.',
  },
  'about.download_cv': { es: 'Descargar CV', en: 'Download CV' },

  // Projects
  'projects.title': { es: 'Proyectos', en: 'Projects' },
  'projects.subtitle': { es: 'Mi trabajo', en: 'My work' },
  'projects.view_code': { es: 'Ver código', en: 'View code' },
  'projects.view_live': { es: 'Ver en vivo', en: 'Live demo' },

  // Experience
  'experience.title': { es: 'Experiencia', en: 'Experience' },
  'experience.subtitle': { es: 'Mi trayectoria', en: 'My journey' },
  'experience.projects_focus': { es: 'Enfoque en proyectos', en: 'Project-focused' },
  'experience.projects_desc': {
    es: 'Actualmente me enfoco en desarrollar proyectos personales y de código abierto que demuestran mis habilidades en backend, IA y seguridad.',
    en: 'Currently I focus on developing personal and open-source projects that demonstrate my skills in backend, AI, and security.',
  },

  // Skills
  'skills.title': { es: 'Habilidades técnicas', en: 'Technical Skills' },
  'skills.subtitle': { es: 'Tecnologías', en: 'Technologies' },
  'skills.backend': { es: 'Backend', en: 'Backend' },
  'skills.frontend': { es: 'Frontend', en: 'Frontend' },
  'skills.tools': { es: 'Herramientas', en: 'Tools' },
  'skills.other': { es: 'Otros', en: 'Others' },

  // Education
  'education.title': { es: 'Educación y Certificaciones', en: 'Education & Certifications' },
  'education.subtitle': { es: 'Formación', en: 'Background' },
  'education.degree': { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
  'education.university': { es: 'Universidad Minuto de Dios', en: 'Universidad Minuto de Dios' },
  'education.cert': { es: 'Certificación', en: 'Certification' },
  'education.pentesting': { es: 'Pentesting — Universidad de los Andes', en: 'Pentesting — University of the Andes' },

  // GitHub
  'github.title': { es: 'Actividad en GitHub', en: 'GitHub Activity' },
  'github.subtitle': { es: 'Contribuciones', en: 'Contributions' },
  'github.loading': { es: 'Cargando...', en: 'Loading...' },
  'github.error': { es: 'No se pudo cargar la actividad', en: 'Could not load activity' },
  'github.view_profile': { es: 'Ver perfil en GitHub', en: 'View GitHub profile' },

  // Contact
  'contact.title': { es: 'Contacto', en: 'Contact' },
  'contact.subtitle': { es: 'Hablemos', en: "Let's talk" },
  'contact.description': {
    es: 'Estoy disponible para nuevas oportunidades de empleo y proyectos freelance. No dudes en contactarme.',
    en: 'I\'m available for new job opportunities and freelance projects. Feel free to reach out.',
  },
  'contact.email': { es: 'Enviar email', en: 'Send email' },
  'contact.linkedin': { es: 'LinkedIn', en: 'LinkedIn' },
  'contact.github': { es: 'GitHub', en: 'GitHub' },

  // Footer
  'footer.built_with': { es: 'Construido con', en: 'Built with' },
  'footer.copyright': { es: '© 2024 Alan Sastre. Todos los derechos reservados.', en: '© 2024 Alan Sastre. All rights reserved.' },

  // Common
  'common.year': { es: 'años', en: 'years' },
  'common.projects_count': { es: 'proyectos', en: 'projects' },
};

registerTranslations(translations);
