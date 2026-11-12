import { useLanguage } from '../../i18n/LanguageContext';
import { profile } from '../../data/profile';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

export default function About() {
  const { lang } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.08);

  return (
    <section id="about" className="py-12">
      <div ref={revealRef} className="max-w-4xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          {lang === 'es' ? 'Conóceme' : 'Get to know me'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
          {lang === 'es' ? 'Sobre mí' : 'About Me'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {profile.about[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <a
            href={lang === 'es' ? profile.cvEs : profile.cvEn}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#2563eb' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {lang === 'es' ? 'Descargar CV' : 'Download CV'}
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
