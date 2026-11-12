import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-6 border-t no-print" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
