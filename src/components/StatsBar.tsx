import { StatItem } from '../types';

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative z-20 -mt-6 md:-mt-10 max-w-7xl mx-auto px-6 md:px-12">
      <div className="rounded-2xl bg-[#0F0F14]/90 backdrop-blur-xl border border-white/[0.09] shadow-2xl p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col justify-center ${
                index > 0 ? 'pt-4 md:pt-0 md:pl-8' : ''
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white tabular-nums">
                  {stat.value}
                </span>
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-widest font-mono text-[#9D9DA8]">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="mt-1 text-xs text-[#6A6A76]">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
