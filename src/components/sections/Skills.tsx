import { useLanguage } from '../../i18n/LanguageContext';
import { skillAreas } from '../../data/skills';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { useState, useEffect } from 'react';
import { Settings, Palette, Wrench } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  settings: Settings,
  palette: Palette,
  wrench: Wrench,
};

function useRadarSize() {
  const [size, setSize] = useState(340);
  useEffect(() => {
    const update = () => setSize(window.innerWidth < 640 ? 260 : 340);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

function RadarChart({ data, size = 340 }: { data: { name: string; value: number; color: string }[]; size?: number }) {
  const [animated, setAnimated] = useState(false);
  const center = size / 2;
  const radius = size / 2 - 55;
  const levels = [0.25, 0.5, 0.75, 1.0];

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data.length]);

  const getPoint = (index: number, total: number, value: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius + 36;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle,
    };
  };

  // Build gradient IDs
  const gradientId = 'radar-gradient';

  const points = data.map((d, i) => {
    const p = getPoint(i, data.length, animated ? d.value : 0);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={data[0]?.color || '#3b82f6'} stopOpacity="0.25" />
          <stop offset="100%" stopColor={data[data.length - 1]?.color || '#8b5cf6'} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {levels.map((level, li) => (
        <polygon
          key={li}
          points={data.map((_, i) => {
            const p = getPoint(i, data.length, level * 100);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth={1}
        />
      ))}
      {data.map((_, i) => {
        const p = getPoint(i, data.length, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="var(--border-color)"
            strokeWidth={0.5}
          />
        );
      })}
      <polygon
        points={points}
        fill={`url(#${gradientId})`}
        stroke="var(--primary-500)"
        strokeWidth={2}
        style={{ transition: 'all 0.8s ease-out' }}
      />
      {data.map((d, i) => {
        const p = getPoint(i, data.length, animated ? d.value : 0);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill={d.color}
            stroke="var(--bg-primary)"
            strokeWidth={2}
            style={{ transition: 'all 0.8s ease-out' }}
          />
        );
      })}
      {data.map((d, i) => {
        const lp = getLabelPoint(i, data.length);
        const isLeft = lp.angle > Math.PI * 0.3 && lp.angle < Math.PI * 0.7;
        const isRight = lp.angle > -Math.PI * 0.3 && lp.angle < -Math.PI * 0.7 + Math.PI * 2;
        const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fontSize="10"
            style={{ fill: 'var(--text-secondary)', fontWeight: 500 }}
          >
            {d.name}
          </text>
        );
      })}
    </svg>
  );
}

export default function Skills() {
  const { lang, t } = useLanguage();
  const revealRef = useScrollReveal();
  const parallaxRef = useParallax(0.05);
  const [activeArea, setActiveArea] = useState('backend');
  const radarSize = useRadarSize();

  const area = skillAreas.find((a) => a.key === activeArea) || skillAreas[0];
  const radarData = area.skills.map((s) => ({ name: s.name, value: s.level, color: area.color }));

  return (
    <section id="skills" className="py-20">
      <div ref={revealRef} className="max-w-6xl mx-auto px-6 reveal">
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <p className="text-sm font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          {t('skills.subtitle')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: 'var(--text-primary)' }}>
          {t('skills.title')}
        </h2>

        {/* Area selection tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillAreas.map((a) => {
            const IconComponent = iconMap[a.icon];
            return (
              <button
                key={a.key}
                onClick={() => setActiveArea(a.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
                style={{
                  backgroundColor: activeArea === a.key ? `${a.color}15` : 'var(--bg-tertiary)',
                  borderColor: activeArea === a.key ? a.color : 'var(--border-color)',
                  color: activeArea === a.key ? a.color : 'var(--text-secondary)',
                }}
              >
                <IconComponent size={16} strokeWidth={2} />
                <span>{a.label[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Radar chart - shows selected area only */}
        <div className="mb-12 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <RadarChart data={radarData} size={radarSize} />
            </div>
            <div className="flex-1 w-full">
              {(() => {
                const IconComponent = iconMap[area.icon];
                return (
                  <>
                    <h3 className="text-xl font-bold mb-4" style={{ color: area.color }}>
                      <IconComponent size={20} strokeWidth={2} /> {area.label[lang]}
                    </h3>
              <div className="space-y-3">
                {area.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: area.color }} />
                    <span className="text-sm flex-1" style={{ color: 'var(--text-secondary)' }}>
                      {skill.name}
                    </span>
                    <span className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tags grouped by category */}
        <div>
          {skillAreas.map((a) => (
            <div key={a.key} className="mb-6">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                {a.label[lang]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {a.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="text-sm px-4 py-2 rounded-lg font-medium border transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: `${a.color}10`,
                      color: a.color,
                      border: `1px solid ${a.color}30`,
                    }}
                  >
                    {skill.name}
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
