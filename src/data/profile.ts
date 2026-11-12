import { asset } from '../lib/asset';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface Profile {
  name: string;
  role: LocalizedText;
  tagline: LocalizedText;
  location: LocalizedText;
  email: string;
  githubUrl: string;
  githubUser: string;
  linkedinUrl: string;
  cvEs: string;
  cvEn: string;
  about: { es: string[]; en: string[] };
  keyFacts: { label: LocalizedText; value: string }[];
}

export const profile: Profile = {
  name: 'Alan Gabriel Sastre Briceño',
  role: {
    es: 'Desarrollador de Software',
    en: 'Software Developer',
  },
  tagline: {
    es: 'Backend con Python & Java | Ciberseguridad & IA',
    en: 'Backend with Python & Java | Cybersecurity & AI',
  },
  location: {
    es: 'Bogotá, Colombia',
    en: 'Bogotá, Colombia',
  },
  email: 'alan.sastre1@gmail.com',
  githubUrl: 'https://github.com/Alan-sastre',
  githubUser: 'Alan-sastre',
  linkedinUrl: 'https://linkedin.com/in/alan-sastre',
  cvEs: asset('/cv-alan-sastre-es.pdf'),
  cvEn: asset('/cv-alan-sastre-en.pdf'),
  about: {
    es: [
      'Soy desarrollador de software con más de 3 años de experiencia diseñando y construyendo APIs REST con Python y Java, trabajando con bases de datos SQL y NoSQL. Mi pasión reside en el desarrollo backend, la ciberseguridad ofensiva y la integración de inteligencia artificial en productos reales.',
      'He participado como ponente en charlas y eventos universitarios sobre Linux, promoviendo el uso de software libre y el ecosistema open source en la comunidad estudiantil. Creo que compartir conocimiento es la mejor forma de crecer como desarrollador.',
      'En cada proyecto busco escribir código limpio, escalable y bien documentado. Me interesa explorar cómo la IA puede resolver problemas prácticos y mejorar la experiencia de desarrollo, siempre manteniendo estándares técnicos rigurosos.',
    ],
    en: [
      'I am a software developer with over 3 years of experience designing and building REST APIs with Python and Java, working with SQL and NoSQL databases. My passion lies in backend development, offensive cybersecurity, and integrating artificial intelligence into real-world products.',
      'I have participated as a speaker in university talks and events about Linux, promoting free software and the open source ecosystem within the student community. I believe sharing knowledge is the best way to grow as a developer.',
      'In every project, I aim to write clean, scalable, and well-documented code. I am interested in exploring how AI can solve practical problems and improve the development experience, always maintaining rigorous technical standards.',
    ],
  },
  keyFacts: [
    { label: { es: 'años de experiencia', en: 'years of experience' }, value: '3+' },
    { label: { es: 'proyectos publicados', en: 'shipped projects' }, value: '10+' },
  ],
};
