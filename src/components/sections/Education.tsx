import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { education, certifications, featuredCertifications } from '../../data/education';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

// Category badge colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  Coursera: { bg: '#1e3a5f', text: '#60a5fa' },
  Platzi: { bg: '#2d1b4e', text: '#a78bfa' },
  'MIC TIC': { bg: '#1a3d2e', text: '#34d399' },
  Cisco: { bg: '#1a2d3d', text: '#38bdf8' },
};

function getCategoryColor(category: string) {
  return categoryColors[category] || { bg: '#1e293b', text: '#3b82f6' };
}

function CertificateModal({ cert, onClose, lang }: { cert: any; onClose: () => void; lang: 'es' | 'en' }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden border"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              {cert.name[lang]}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {cert.issuer[lang]} · {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}
            aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {cert.certificateUrl ? (
            <iframe
              src={cert.certificateUrl}
              className="w-full rounded-lg"
              style={{ height: '70vh', borderColor: 'var(--border-color)' }}
              title={cert.name[lang]}
            />
          ) : (
            <div className="flex items-center justify-center" style={{ height: '70vh' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                {lang === 'es' ? 'Certificado no disponible' : 'Certificate not available'}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3 p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          {cert.certificateUrl && (
            <a
              href={cert.certificateUrl}
              download
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: '#3b82f6' }}
            >
              {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
            </a>
          )}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium border"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              {lang === 'es' ? 'Verificar' : 'Verify'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const { lang } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.04);
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const featured = featuredCertifications.map((i) => certifications[i]);
  const rest = certifications.filter((_, i) => !featuredCertifications.includes(i));
  const displayCerts = showAll ? certifications : featured;

  return (
    <section id="education" className="py-20">
      <div ref={revealRef} className="max-w-5xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          {lang === 'es' ? 'Formación' : 'Background'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
          {lang === 'es' ? 'Educación y Certificaciones' : 'Education & Certifications'}
        </h2>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'es' ? 'Educación' : 'Education'}
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {edu.degree[lang]}
                  </h4>
                  <span className="text-sm font-mono px-3 py-1 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {edu.institution[lang]}
                </p>
                {edu.description && (
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {edu.description[lang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {lang === 'es' ? 'Certificaciones' : 'Certifications'}
          </h3>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            {certifications.length} {lang === 'es' ? 'certificados obtenidos' : 'certificates earned'}
          </p>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayCerts.map((cert, i) => {
              const cat = typeof cert.category === 'string' ? cert.category : cert.category[lang];
              const colors = getCategoryColor(cat);
              const isFeatured = featuredCertifications.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedCert(cert)}
                  className="rounded-xl border text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group overflow-hidden"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: isFeatured ? '#3b82f640' : 'var(--border-color)',
                  }}
                >
                  {/* Cover image */}
                  <div className="relative h-28 overflow-hidden" style={{ backgroundColor: colors.bg }}>
                    <img
                      src={cert.coverImage}
                      alt={cert.name[lang]}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    {isFeatured && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold bg-yellow-500 text-yellow-900">
                        ★
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                        }}
                      >
                        {cat}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {cert.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold leading-snug mb-1 group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {cert.name[lang]}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {cert.issuer[lang]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Toggle button */}
          {rest.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-200 hover:border-primary-500 hover:text-primary-500"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                {showAll
                  ? (lang === 'es' ? 'Ver menos' : 'See less')
                  : (lang === 'es' ? 'Ver más' : 'See more')}
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {showAll ? '(-' + rest.length + ')' : '(+' + rest.length + ')'}
                </span>
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          lang={lang}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
