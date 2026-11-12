import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { projects } from '../../data/projects';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTilt } from '../../hooks/useTilt';

// SVG icon placeholders for project images
function ProjectImage({ title, color }: { title: string; color: string }) {
  const iconMap: Record<string, React.ReactElement> = {
    'Gestor de Salones': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'Radar de Prácticas': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    'Extensión Chrome': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    'Git-Mastery': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    'API Reservas': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    'API Gestión': (
      <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  };

  // Find matching icon
  const icon = Object.entries(iconMap).find(([key]) => title.includes(key))?.[1] || (
    <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m0-3.626l-2.25 1.313" />
    </svg>
  );

  return (
    <div
      className="w-full h-40 rounded-lg flex items-center justify-center mb-4"
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        color: color,
      }}
    >
      {icon}
    </div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const tiltRef = useTilt(6);
  return (
    <div
      ref={tiltRef}
      className="rounded-xl p-6 border"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--card-shadow)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const { lang, t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section id="projects" className="py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6 reveal">
        <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          {t('projects.subtitle')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={i}>
              {/* Project Image */}
              {project.image ? (
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title[lang]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <ProjectImage title={project.title[lang]} color={project.imageColor || '#3b82f6'} />
              )}

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {project.title[lang]}
                </h3>
                {project.featured && (
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                  >
                    {t('projects.featured')}
                  </span>
                )}
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description[lang]}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{
                      backgroundColor: `${project.imageColor || '#3b82f6'}18`,
                      color: project.imageColor || '#3b82f6',
                      border: `1px solid ${project.imageColor || '#3b82f6'}30`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium flex items-center gap-1.5 transition-colors hover:text-primary-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {t('projects.code')}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium flex items-center gap-1.5 transition-colors hover:text-primary-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('projects.live')}
                  </a>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
