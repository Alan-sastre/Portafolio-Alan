import { useLanguage } from '../../i18n/LanguageContext';
import { profile } from '../../data/profile';
import { fetchContributions, fetchPRs, type GitHubContribution, type GitHubPR } from '../../lib/github';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { useState, useEffect, useMemo } from 'react';

function getWeekday(index: number): string {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return days[index];
}

function getMonthLabel(index: number): string {
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', '', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];
  return months[index] || '';
}

function getContributionColor(count: number, maxCount: number): string {
  if (count === 0) return 'var(--cell-empty)';
  const ratio = count / Math.max(maxCount, 1);
  if (ratio < 0.25) return 'var(--cell-1)';
  if (ratio < 0.5) return 'var(--cell-2)';
  if (ratio < 0.75) return 'var(--cell-3)';
  return 'var(--cell-4)';
}

type GridCell = { date: Date; count: number };

function HeatmapCell({ date, count, maxCount }: { date: Date; count: number; maxCount: number }) {
  const { lang } = useLanguage();
  const color = getContributionColor(count, maxCount);
  const tooltip = `${date.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} — ${count} contribution${count !== 1 ? 's' : ''}`;

  return (
    <div
      className="w-3.5 h-3.5 rounded-sm transition-colors duration-150"
      style={{ backgroundColor: color }}
      title={tooltip}
    />
  );
}

export default function GitHubActivity() {
  const { lang } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.03);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [prs, setPrs] = useState<GitHubPR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.allSettled([
      fetchContributions(profile.githubUser),
      fetchPRs(profile.githubUser).catch(() => []),
    ]).then(([contribResult, prResult]) => {
      if (contribResult.status === 'fulfilled') {
        setContributions(contribResult.value.contributions);
      } else {
        setError(contribResult.reason?.message || 'Failed to load contributions');
      }

      if (prResult.status === 'fulfilled') {
        setPrs(prResult.value);
      }

      setLoading(false);
    }).catch(() => {
      setError('Network error');
      setLoading(false);
    });
  }, []);

  const { grid, months, maxCount } = useMemo(() => {
    if (contributions.length === 0) return { grid: [] as GridCell[][], months: [] as string[], maxCount: 1 };

    const contribMap = new Map<string, number>();
    contributions.forEach(c => contribMap.set(c.date, c.count));
    const maxCount = Math.max(...contributions.map(c => c.count), 1);

    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 364);
    // Adjust to the previous Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const grid: GridCell[][] = [];
    const currentWeek: GridCell[] = [];

    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      currentWeek.push({ date: new Date(d), count: contribMap.get(dateStr) || 0 });

      if (d.getDay() === 6 || d >= now) {
        grid.push([...currentWeek]);
        currentWeek.length = 0;
      }
    }

    // Generate month labels
    const months: string[] = [];
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].length > 0) {
        const weekDate = grid[i][0].date;
        const monthIndex = weekDate.getMonth();
        if (i === 0 || weekDate.getMonth() !== grid[i - 1][0].date.getMonth()) {
          months.push(getMonthLabel(monthIndex));
        } else {
          months.push('');
        }
      }
    }

    return { grid, months, maxCount };
  }, [contributions]);

  return (
    <section id="github" className="py-20">
      <div ref={revealRef} className="max-w-5xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {lang === 'es' ? 'Actividad en GitHub' : 'GitHub Activity'}
        </h2>
        <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
          {lang === 'es' ? 'Mis contribuciones y pull requests más recientes.' : 'My recent contributions and pull requests.'}
        </p>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full" style={{ borderColor: 'var(--primary-500)' }} />
          </div>
        )}

        {error && (
          <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              {lang === 'es' ? 'No se pudieron cargar las contribuciones de GitHub.' : 'Could not load GitHub contributions.'}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Heatmap */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {lang === 'es' ? 'Contribuciones del último año' : 'Contributions in the last year'}
              </h3>
              <div className="overflow-x-auto pb-2">
                <div className="inline-block">
                  {/* Month labels */}
                  <div className="flex mb-1 ml-5">
                    {months.map((month, i) => (
                      <div key={i} className="w-3.5 text-center" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {month}
                      </div>
                    ))}
                  </div>
                  {/* Grid */}
                  <div className="flex gap-[3px]">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[3px] mr-1">
                      {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-4 h-3.5 flex items-center justify-end" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                          {getWeekday(i)}
                        </div>
                      ))}
                    </div>
                    {/* Weeks */}
                    {grid.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
                          const cell = week[dayIndex];
                          return cell ? (
                            <HeatmapCell key={dayIndex} date={cell.date} count={cell.count} maxCount={maxCount} />
                          ) : (
                            <div key={dayIndex} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'transparent' }} />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="flex items-center justify-end gap-2 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{lang === 'es' ? 'Menos' : 'Less'}</span>
                    <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'var(--cell-empty)' }} />
                    <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'var(--cell-1)' }} />
                    <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'var(--cell-2)' }} />
                    <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'var(--cell-3)' }} />
                    <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: 'var(--cell-4)' }} />
                    <span>{lang === 'es' ? 'Más' : 'More'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PRs */}
            {prs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'es' ? 'Pull Requests recientes' : 'Recent Pull Requests'}
                </h3>
                <div className="space-y-3">
                  {prs.slice(0, 5).map((pr, i) => {
                    const statusColor = pr.merged ? '#28a745' : pr.state === 'open' ? '#0366d6' : '#6e7681';
                    const statusLabel = pr.merged
                      ? (lang === 'es' ? 'Fusionado' : 'Merged')
                      : pr.state === 'open'
                      ? (lang === 'es' ? 'Abierto' : 'Open')
                      : (lang === 'es' ? 'Cerrado' : 'Closed');

                    return (
                      <a
                        key={i}
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: statusColor }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                              {pr.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                              <span>{pr.repo_name}</span>
                              <span>·</span>
                              <span style={{ color: statusColor }}>{statusLabel}</span>
                            </div>
                          </div>
                          <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Profile link */}
            <div className="text-center mt-10">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--primary-600)', color: '#fff' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {lang === 'es' ? 'Ver perfil de GitHub' : 'View GitHub profile'}
              </a>
            </div>
          </>
        )}
        </div>
      </div>
    </section>
  );
}
