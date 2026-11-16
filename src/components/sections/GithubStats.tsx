import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { profile } from "../../data/profile";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useParallax } from "../../hooks/useParallax";
import { asset } from "../../lib/asset";

export default function GithubStats() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.05);
  const [hasError, setHasError] = useState(false);

  // Si hay error (ej. el SVG no existe todavía), no renderizamos la sección
  if (hasError) return null;

  const wideStats = asset("/assets/github-stats.svg");
  const phoneStats = asset("/assets/github-stats-phone.svg");

  return (
    <section id="stats" className="py-12">
      <div ref={revealRef} className="max-w-4xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: "transform" }}>
          <p
            className="text-sm font-mono mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            GitHub
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {t("github.stats_title")}
          </h2>

          <div className="flex flex-col items-center space-y-6">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block hover:opacity-95 transition-opacity"
            >
              <picture>
                <source media="(min-width: 768px)" srcSet={wideStats} />
                <img
                  src={phoneStats}
                  alt="Alan-sastre's GitHub Stats"
                  loading="lazy"
                  className="w-full h-auto rounded-xl shadow-lg border border-white/5"
                  onError={() => setHasError(true)}
                />
              </picture>
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
              style={{ color: "#2563eb" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t("github.view_profile")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
