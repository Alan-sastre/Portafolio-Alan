import { useLanguage } from '../../i18n/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

export default function Experience() {
  const { lang } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.06);

  const experiences = [
    {
      role: { es: 'Desarrollador de Videojuegos Educativos', en: 'Educational Game Developer' },
      company: { es: 'RobCodePlay', en: 'RobCodePlay' },
      location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
      period: 'Feb 2025 — Oct 2025',
      description: {
        es: 'Desarrollé videojuegos educativos con HTML5, CSS3, JavaScript y Phaser. Implementé diseños responsivos y optimicé el rendimiento en distintos dispositivos.',
        en: 'Developed educational games with HTML5, CSS3, JavaScript, and Phaser. Implemented responsive designs and optimized performance across different devices.',
      },
      technologies: ['JavaScript', 'Phaser', 'HTML5', 'CSS3'],
    },
    {
      role: { es: 'Programador Backend', en: 'Backend Programmer' },
      company: { es: 'InnovaTech', en: 'InnovaTech' },
      location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
      period: 'Nov 2024 — May 2025',
      description: {
        es: 'Implementé la lógica de disponibilidad y asignación de horarios para sistemas de gestión interna.',
        en: 'Implemented availability and schedule assignment logic for internal management systems.',
      },
      technologies: ['Python', 'Django REST', 'PostgreSQL'],
    },
    {
      role: { es: 'Desarrollador Backend Jr.', en: 'Junior Backend Developer' },
      company: { es: 'DataSoft Colombia', en: 'DataSoft Colombia' },
      location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
      period: 'Jan 2023 — Jan 2024',
      description: {
        es: 'Desarrollé una API REST con Java (Spring Boot) y MySQL para la gestión de inventarios. Documenté los endpoints CRUD con Swagger y mantuve contratos claros para el frontend.',
        en: 'Developed a REST API with Java (Spring Boot) and MySQL for inventory management. Documented CRUD endpoints with Swagger and maintained clear contracts for the frontend.',
      },
      technologies: ['Java', 'Spring Boot', 'MySQL', 'Swagger'],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div ref={revealRef} className="max-w-4xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          {lang === 'es' ? 'Mi trayectoria' : 'My journey'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
          {lang === 'es' ? 'Experiencia' : 'Experience'}
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l-2" style={{ borderColor: 'var(--border-color)' }}>
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              <div className="mb-1">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {exp.role[lang]}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {exp.company[lang]}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {exp.location[lang]}
                  </span>
                </div>
                <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                  {exp.period}
                </p>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                {exp.description[lang]}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{
                      backgroundColor: '#3b82f618',
                      color: '#3b82f6',
                      border: '1px solid #3b82f630',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
