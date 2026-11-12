import { asset } from '../lib/asset';
import type { LocalizedText } from './profile';

export interface Education {
  degree: LocalizedText;
  institution: LocalizedText;
  period: string;
  description?: LocalizedText;
}

export interface Certification {
  name: LocalizedText;
  issuer: LocalizedText;
  year: string;
  category: string | LocalizedText;
  coverImage: string;
  certificateUrl?: string;
  verifyUrl?: string;
  description?: LocalizedText;
}

export const education: Education[] = [
  {
    degree: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
    institution: { es: 'Universidad Minuto de Dios', en: 'Universidad Minuto de Dios' },
    period: '2022 – 2026',
    description: {
      es: 'Formación en desarrollo de software, bases de datos, redes, ciberseguridad y gestión de proyectos.',
      en: 'Training in software development, databases, networks, cybersecurity, and project management.',
    },
  },
];

export const certifications: Certification[] = [
  // Coursera
  {
    name: { es: 'Vulnerabilidades y pruebas de penetración', en: 'Vulnerabilities and Penetration Testing' },
    issuer: { es: 'Universidad de los Andes', en: 'University of the Andes' },
    year: '2024',
    category: 'Coursera',
    coverImage: asset('/images/certificados/pentesting-uniandes_thumb-1.png'),
    certificateUrl: asset('/certificados/pentesting-uniandes.pdf'),
    verifyUrl: 'https://coursera.org/verify/BDZRMDDW80U4',
    description: {
      es: 'Análisis de vulnerabilidades, pruebas de penetración y ciberseguridad ofensiva.',
      en: 'Vulnerability analysis, penetration testing, and offensive cybersecurity.',
    },
  },
  {
    name: { es: 'Introduction to Back-End Development', en: 'Introduction to Back-End Development' },
    issuer: { es: 'Meta', en: 'Meta' },
    year: '2024',
    category: 'Coursera',
    coverImage: asset('/images/certificados/backend-meta_thumb-1.png'),
    certificateUrl: asset('/certificados/backend-meta.pdf'),
    verifyUrl: 'https://coursera.org/verify/DJ8WCQ4BXTFB',
    description: {
      es: 'Fundamentos del desarrollo backend, APIs y servidores.',
      en: 'Backend development fundamentals, APIs, and servers.',
    },
  },
  {
    name: { es: 'Python Data Structures', en: 'Python Data Structures' },
    issuer: { es: 'University of Michigan', en: 'University of Michigan' },
    year: '2023',
    category: 'Coursera',
    coverImage: asset('/images/certificados/python-data-structures-michigan_thumb-1.png'),
    certificateUrl: asset('/certificados/python-data-structures-michigan.pdf'),
    verifyUrl: 'https://coursera.org/verify/SFRSQ4LFVQWR',
    description: {
      es: 'Estructuras de datos en Python: listas, diccionarios, tuplas y archivos.',
      en: 'Data structures in Python: lists, dictionaries, tuples, and files.',
    },
  },
  {
    name: { es: 'Introduction to Computers and Operating Systems and Security', en: 'Introduction to Computers and Operating Systems and Security' },
    issuer: { es: 'Microsoft', en: 'Microsoft' },
    year: '2024',
    category: 'Coursera',
    coverImage: asset('/images/certificados/computers-security-microsoft_thumb-1.png'),
    certificateUrl: asset('/certificados/computers-security-microsoft.pdf'),
    verifyUrl: 'https://coursera.org/verify/T29B3N2FNVSQ',
    description: {
      es: 'Fundamentos de computadoras, sistemas operativos y seguridad informática.',
      en: 'Computer fundamentals, operating systems, and cybersecurity.',
    },
  },
  {
    name: { es: 'Estructuras de datos en Python', en: 'Data Structures in Python' },
    issuer: { es: 'Universidad Austral', en: 'Universidad Austral' },
    year: '2023',
    category: 'Coursera',
    coverImage: asset('/images/certificados/estructuras-datos-python-austral_thumb-1.png'),
    certificateUrl: asset('/certificados/estructuras-datos-python-austral.pdf'),
    verifyUrl: 'https://coursera.org/verify/VKW3AUNE6DCF',
    description: {
      es: 'Estructuras de datos avanzadas en Python.',
      en: 'Advanced data structures in Python.',
    },
  },
  // Platzi
  {
    name: { es: 'Programación con JavaScript', en: 'JavaScript Programming' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2025',
    category: 'Platzi',
    coverImage: asset('/images/certificados/javascript-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/javascript-platzi.pdf'),
    verifyUrl: 'https://coursera.org/verify/DO4PQB4X963D',
    description: {
      es: 'Programación con JavaScript: fundamentos y aplicaciones.',
      en: 'JavaScript programming: fundamentals and applications.',
    },
  },
  {
    name: { es: 'Python', en: 'Python' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/python-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/python-platzi.pdf'),
    description: {
      es: 'Fundamentos de programación en Python.',
      en: 'Python programming fundamentals.',
    },
  },
  {
    name: { es: 'Python Fundamentos', en: 'Python Fundamentals' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/python-fundamentos-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/python-fundamentos-platzi.pdf'),
    description: {
      es: 'Conceptos básicos de Python para principiantes.',
      en: 'Basic Python concepts for beginners.',
    },
  },
  {
    name: { es: 'Git & GitHub', en: 'Git & GitHub' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/git-github-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/git-github-platzi.pdf'),
    description: {
      es: 'Control de versiones con Git y colaboración en GitHub.',
      en: 'Version control with Git and collaboration on GitHub.',
    },
  },
  {
    name: { es: 'HTML & CSS', en: 'HTML & CSS' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/html-css-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/html-css-platzi.pdf'),
    description: {
      es: 'Desarrollo web con HTML y CSS.',
      en: 'Web development with HTML and CSS.',
    },
  },
  {
    name: { es: 'Linux', en: 'Linux' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/linux-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/linux-platzi.pdf'),
    description: {
      es: 'Introducción a Linux y administración de sistemas.',
      en: 'Introduction to Linux and system administration.',
    },
  },
  {
    name: { es: 'Inglés Básico para Principiantes', en: 'Basic English for Beginners' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/ingles-basico-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/ingles-basico-platzi.pdf'),
    description: {
      es: 'Fundamentos del idioma inglés.',
      en: 'English language fundamentals.',
    },
  },
  {
    name: { es: 'Estrategias de Inglés', en: 'English Strategies' },
    issuer: { es: 'Platzi', en: 'Platzi' },
    year: '2024',
    category: 'Platzi',
    coverImage: asset('/images/certificados/estrategias-ingles-platzi_thumb-1.png'),
    certificateUrl: asset('/certificados/estrategias-ingles-platzi.pdf'),
    description: {
      es: 'Estrategias para mejorar el aprendizaje del inglés.',
      en: 'Strategies to improve English learning.',
    },
  },
  // MIC TIC
  {
    name: { es: 'Lenguaje de Programación Python', en: 'Python Programming Language' },
    issuer: { es: 'MIC TIC', en: 'MIC TIC' },
    year: '2024',
    category: 'MIC TIC',
    coverImage: asset('/images/certificados/python-mictic_thumb-1.png'),
    certificateUrl: asset('/certificados/python-mictic.pdf'),
    description: {
      es: 'Certificación del Ministerio de TIC en programación Python.',
      en: 'Ministry of TIC certification in Python programming.',
    },
  },
  // Cisco
  {
    name: { es: 'Introduction to Cybersecurity', en: 'Introduction to Cybersecurity' },
    issuer: { es: 'Cisco', en: 'Cisco' },
    year: '2024',
    category: 'Cisco',
    coverImage: asset('/images/certificados/cybersecurity-cisco_thumb-1.png'),
    certificateUrl: asset('/certificados/cybersecurity-cisco.pdf'),
    description: {
      es: 'Fundamentos de ciberseguridad, amenazas y protección de redes.',
      en: 'Cybersecurity fundamentals, threats, and network protection.',
    },
  },
];

export const featuredCertifications = [
  0, // Pentesting Uniandes
  1, // Backend Meta
  14, // Cisco Cybersecurity
  13, // MIC TIC Python
];

export const certificationCategories = [
  { id: 'all', label: { es: 'Todas', en: 'All' } },
  { id: 'Coursera', label: { es: 'Coursera', en: 'Coursera' } },
  { id: 'Platzi', label: { es: 'Platzi', en: 'Platzi' } },
  { id: 'MIC TIC', label: { es: 'MIC TIC', en: 'MIC TIC' } },
  { id: 'Cisco', label: { es: 'Cisco', en: 'Cisco' } },
];
