import { useState } from 'react';
import { TechTool } from '../types';
import { Video, Sparkles, Workflow, Database, Layers } from 'lucide-react';

interface TechStackProps {
  tools: TechTool[];
}

export function TechStack({ tools }: TechStackProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI Video',
    'AI / Creative',
    'Automation',
    'Productivity / Data',
  ];

  const categoryIcons: Record<string, typeof Video> = {
    'AI Video': Video,
    'AI / Creative': Sparkles,
    'Automation': Workflow,
    'Productivity / Data': Database,
  };

  const filteredTools = activeCategory === 'All'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24 md:py-32 relative bg-[#08080A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading & Category Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span>Technology & Infrastructure</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
              TOOLS & PLATFORMS
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#9E9EA8] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pt-12">
          {filteredTools.map((tool, index) => {
            const Icon = categoryIcons[tool.category] || Layers;

            return (
              <div
                key={`${tool.name}-${index}`}
                className="group p-5 rounded-xl bg-[#0E0E14] border border-white/[0.07] hover:border-white/[0.22] hover:bg-[#12121A] transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D6D78]">
                    {tool.category.replace(' / ', '/')}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-display font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>{tool.name}</span>
                    {tool.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Primary Core Tool" />
                    )}
                  </h3>
                  <p className="text-xs text-[#8E8E9B] mt-1 line-clamp-2">
                    {tool.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Capability Summary */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8E9B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white">Continuous Model Benchmarking:</span>
            <span>Evaluating new generative video and diffusion updates weekly.</span>
          </div>
          <div className="text-[#6B6B76]">
            API-FIRST · ZERO-LOCKIN · PRODUCTION-GRADE
          </div>
        </div>

      </div>
    </section>
  );
}
