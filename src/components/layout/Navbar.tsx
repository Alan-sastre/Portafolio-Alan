import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { isDark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#education', label: t('nav.education') },
    { href: '#github', label: t('nav.github') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 no-print" style={{ backgroundColor: 'var(--navbar-bg)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Alan Sastre
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary-500"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="px-2 py-1 text-xs font-mono rounded border transition-colors hover:border-primary-500"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={toggle}
            className="p-2 rounded transition-colors hover:bg-primary-100 dark:hover:bg-primary-900"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
            <span className={`block h-0.5 w-6 transition-all ${open ? '-rotate-45 -translate-y-2.5' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden animate-slide-down" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="px-3 py-1.5 text-xs font-mono rounded border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
              <button
                onClick={toggle}
                className="px-3 py-1.5 text-xs rounded border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
