import { useLanguage } from '../../i18n/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const technologies = [
  { name: 'Python', slug: 'python' },
  { name: 'Java', slug: 'java' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Spring Boot', slug: 'spring' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Linux', slug: 'linux' },
  { name: 'Bash', slug: 'bash' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'React', slug: 'react' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Django', slug: 'django' },
  { name: 'SQL', slug: 'sql' },
];

export default function Technologies() {
  const { lang, t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section id="technologies" className="py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6 reveal">
        <div className="text-center mb-12">
          <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
            {t('technologies.subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('technologies.title')}
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('technologies.description')}
          </p>
        </div>

        {/* Marquee carousel */}
        <div className="overflow-hidden">
          <div className="marquee-track flex items-center gap-8">
            {[...technologies, ...technologies, ...technologies].map((tech, i) => (
              <div
                key={`${tech.slug}-${i}`}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
                title={tech.name}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                    alt={tech.name}
                    className="w-8 h-8 object-contain dark:invert"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span style="font-size:12px;font-weight:600;color:var(--text-muted)">${tech.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <span className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
