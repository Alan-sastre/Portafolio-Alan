import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { profile } from '../../data/profile';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const roles = [
  { es: 'Desarrollador de Software', en: 'Software Developer' },
  { es: 'Desarrollador Backend', en: 'Backend Developer' },
  { es: 'Entusiasta de Ciberseguridad', en: 'Cybersecurity Enthusiast' },
  { es: 'Integrador de IA', en: 'AI Integrator' },
];

export default function Hero() {
  const { lang } = useLanguage();
  const ref = useScrollReveal(0.1);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex][lang];
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, lang]);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div ref={ref} className="max-w-6xl mx-auto px-6 w-full reveal">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-mono mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'es' ? 'Hola, soy' : 'Hello, I\'m'}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              {profile.name.split(' ').slice(0, 2).join(' ')}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-4" style={{ color: 'var(--primary-600)' }}>
              {displayedText}
              <span className="animate-blink" style={{ color: 'var(--primary-600)' }}>|</span>
            </p>
            <p className="text-base mb-8 max-w-lg mx-auto md:mx-0" style={{ color: 'var(--text-muted)' }}>
              {profile.tagline[lang]}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 bg-primary-600"
              >
                {lang === 'es' ? 'Ver proyectos' : 'View projects'}
              </a>
              <a
                href="#about"
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                {lang === 'es' ? 'Descargar CV' : 'Download CV'}
              </a>
            </div>
            {/* Key facts */}
            <div className="flex gap-8 mt-10 justify-center md:justify-start">
              {profile.keyFacts.map((fact, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {fact.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {fact.label[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar 3D Isometric */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Isometric cube background */}
                <defs>
                  <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="cubeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Back cube */}
                <polygon points="100,30 150,55 150,105 100,80" fill="url(#cubeGrad2)" />
                <polygon points="100,30 50,55 50,105 100,80" fill="url(#cubeGrad2)" opacity="0.7" />
                <polygon points="50,55 100,80 100,130 50,105" fill="url(#cubeGrad2)" opacity="0.5" />
                {/* Front cube */}
                <polygon points="100,50 145,72 145,117 100,95" fill="url(#cubeGrad)" />
                <polygon points="100,50 55,72 55,117 100,95" fill="url(#cubeGrad)" opacity="0.8" />
                <polygon points="55,72 100,95 100,140 55,117" fill="url(#cubeGrad)" opacity="0.6" />
                {/* Initials */}
                <text x="100" y="108" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui">
                  AS
                </text>
                {/* Floating dots */}
                <circle cx="30" cy="40" r="3" fill="#3b82f6" opacity="0.4">
                  <animate attributeName="cy" values="40;35;40" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="170" cy="60" r="2" fill="#60a5fa" opacity="0.5">
                  <animate attributeName="cy" values="60;55;60" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="160" cy="140" r="4" fill="#3b82f6" opacity="0.3">
                  <animate attributeName="cy" values="140;135;140" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="150" r="2" fill="#60a5fa" opacity="0.4">
                  <animate attributeName="cy" values="150;145;150" dur="3.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
