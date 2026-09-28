import { useState, useMemo } from 'react';
import { ArrowUpRight, Play, Sparkles, Film, Cpu, ShoppingBag, Clapperboard, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';
import { ProjectCard } from './ProjectCard';

interface FeaturedWorkProps {
  categories: CategoryInfo[];
  projects?: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onNavigateCategory?: (categorySlug: string) => void;
}

export function FeaturedWork({
  categories,
  projects: customProjects,
  onSelectProject,
}: FeaturedWorkProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');

  // Consolidate all available projects across categories
  const allProjects = useMemo(() => {
    if (customProjects && customProjects.length > 0) {
      return customProjects;
    }
    const collected: ProjectItem[] = [];
    const seen = new Set<string>();

    for (const cat of categories) {
      for (const p of cat.projects) {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          collected.push(p);
        }
      }
    }
    return collected;
  }, [categories, customProjects]);

  // Filtered projects based on selected category tab
  const filteredProjects = useMemo(() => {
    if (activeCategorySlug === 'all') {
      return allProjects;
    }
    return allProjects.filter((p) => p.categorySlug === activeCategorySlug);
  }, [allProjects, activeCategorySlug]);

  // Find the primary featured production to spotlight
  const spotlightProject = useMemo(() => {
    if (activeCategorySlug === 'all') {
      return allProjects.find((p) => p.featured) || allProjects[0];
    }
    return (
      filteredProjects.find((p) => p.featured) || filteredProjects[0] || allProjects[0]
    );
  }, [allProjects, filteredProjects, activeCategorySlug]);

  // Secondary projects (excluding spotlight when viewing "All" to avoid duplication)
  const gridProjects = useMemo(() => {
    if (activeCategorySlug === 'all' && spotlightProject) {
      return allProjects.filter((p) => p.id !== spotlightProject.id);
    }
    return filteredProjects;
  }, [allProjects, filteredProjects, spotlightProject, activeCategorySlug]);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'ai-video':
        return <Film className="w-3.5 h-3.5" />;
      case 'ugc-commercial':
        return <Clapperboard className="w-3.5 h-3.5" />;
      case 'ecommerce-product-demo':
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'intelligent-automation':
        return <Cpu className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 relative bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
              <span>Selected Productions & Workflows</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
              FEATURED WORK
            </h2>
            <p className="text-sm sm:text-base text-[#9E9EA8] leading-relaxed">
              Broadcast-caliber AI commercials, high-converting product videos, and autonomous production pipelines engineered for modern brands.
            </p>
          </div>

          {/* In-Section Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121218] border border-white/[0.08] rounded-xl self-start lg:self-end">
            <button
              onClick={() => setActiveCategorySlug('all')}
              className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeCategorySlug === 'all'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-[#9E9EA8] hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span>All Work</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded ${
                  activeCategorySlug === 'all'
                    ? 'bg-black/15 text-black font-bold'
                    : 'bg-white/[0.08] text-white/70'
                }`}
              >
                {allProjects.length}
              </span>
            </button>

            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-[#9E9EA8] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-black/15 text-black font-bold'
                        : 'bg-white/[0.08] text-white/70'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Spotlight Card when viewing 'All' */}
        {activeCategorySlug === 'all' && spotlightProject && (
          <div className="pt-12 pb-14 border-b border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E8E9A] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Flagship Showcase</span>
              <span className="text-white/20">/</span>
              <span>{spotlightProject.category}</span>
            </div>

            <div
              onClick={() => onSelectProject(spotlightProject)}
              className="group relative rounded-3xl bg-[#0F0F16] border border-white/[0.1] hover:border-white/[0.25] overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-black/80 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Media Column */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-black">
                <img
                  src={spotlightProject.image}
                  alt={spotlightProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white border border-white/10 font-bold">
                      {spotlightProject.number}
                    </span>
                    <span className="bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded text-emerald-300 border border-emerald-500/30 uppercase tracking-wider text-[11px] font-semibold">
                      Spotlight Production
                    </span>
                  </div>
                  {spotlightProject.duration && (
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white/80 border border-white/10">
                      {spotlightProject.duration}
                    </span>
                  )}
                </div>

                {/* Play / Inspect prompt */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 group-hover:bg-white transition-all duration-300">
                    <Play className="w-6 h-6 fill-black ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8E8E9A] uppercase tracking-wider">
                    <span>{spotlightProject.category}</span>
                    <span>·</span>
                    <span>Client: {spotlightProject.client || 'Commercial Brand'}</span>
                    <span>·</span>
                    <span>{spotlightProject.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight group-hover:text-white transition-colors">
                    {spotlightProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#9E9EA8] leading-relaxed">
                    {spotlightProject.description}
                  </p>

                  {/* Highlights / Metrics */}
                  {spotlightProject.metrics && spotlightProject.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {spotlightProject.metrics.slice(0, 3).map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                        >
                          <div className="text-lg font-display font-bold text-white">
                            {m.value}
                          </div>
                          <div className="text-[11px] font-mono text-[#8E8E9A] uppercase tracking-wider">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tools & CTA */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {spotlightProject.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-mono text-white/70 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold group-hover:underline">
                    <span>View Production Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className="pt-12">
          {activeCategorySlug !== 'all' && (
            <div className="flex items-center justify-between mb-8">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8E8E9A] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Showing {gridProjects.length} {gridProjects.length === 1 ? 'Production' : 'Productions'}</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategorySlug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {gridProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  badgeText={project.featured ? 'Featured' : undefined}
                  onSelect={() => onSelectProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {gridProjects.length === 0 && (
            <div className="py-20 text-center text-[#8E8E9A] font-mono text-sm">
              No productions found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
