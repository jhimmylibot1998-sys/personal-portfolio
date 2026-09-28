import { useState, useMemo } from 'react';
import { Play, Eye, Sparkles, X, ArrowUpRight, Grid3X3, Film, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';

interface RecentGalleryProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry?: (projectTitle: string) => void;
}

export function RecentGallery({
  projects,
  onSelectProject,
  onOpenInquiry,
}: RecentGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [quickInspectProject, setQuickInspectProject] = useState<ProjectItem | null>(null);

  // Filter tabs definition
  const filterTabs = useMemo(() => {
    const counts: Record<string, number> = {
      all: projects.length,
      video: projects.filter(
        (p) => p.categorySlug === 'ai-video' || p.categorySlug === 'ugc-commercial'
      ).length,
      product: projects.filter((p) => p.categorySlug === 'ecommerce-product-demo').length,
      automation: projects.filter((p) => p.categorySlug === 'intelligent-automation').length,
    };

    return [
      { id: 'all', label: 'All Media', count: counts.all },
      { id: 'video', label: 'Commercials & Video', count: counts.video },
      { id: 'product', label: 'Product Demos', count: counts.product },
      { id: 'automation', label: 'Automations', count: counts.automation },
    ].filter((tab) => tab.count > 0 || tab.id === 'all');
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'video') {
      return projects.filter(
        (p) => p.categorySlug === 'ai-video' || p.categorySlug === 'ugc-commercial'
      );
    }
    if (activeFilter === 'product') {
      return projects.filter((p) => p.categorySlug === 'ecommerce-product-demo');
    }
    if (activeFilter === 'automation') {
      return projects.filter((p) => p.categorySlug === 'intelligent-automation');
    }
    return projects;
  }, [projects, activeFilter]);

  return (
    <section id="gallery" className="py-24 md:py-32 relative bg-[#0B0B0F] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
              <Grid3X3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visual Archive & Quick Preview</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
              RECENT GALLERY
            </h2>
            <p className="text-sm sm:text-base text-[#9E9EA8] leading-relaxed">
              A rapid visual scan across recent commercial spots, motion studies, product renders, and agentic workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#14141C] border border-white/[0.08] rounded-xl self-start lg:self-end">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-[#9E9EA8] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
                      isActive
                        ? 'bg-black/15 text-black font-bold'
                        : 'bg-white/[0.08] text-white/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rapid Visual Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#14141C] border border-white/[0.08] hover:border-white/[0.25] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/70 will-change-transform"
                onClick={() => onSelectProject(project)}
              >
                {/* Thumbnail Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle default gradient base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/95 group-hover:via-black/50 group-hover:to-black/60 transition-colors duration-300" />

                {/* Top badges: Project Number & Media duration badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-white/90 border border-white/10">
                    {project.number}
                  </span>

                  {project.duration ? (
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-emerald-300" />
                      <span>{project.duration}</span>
                    </span>
                  ) : (
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white/70 border border-white/10">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Bottom Card Preview info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end z-10 pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0A0B0] truncate mb-1">
                    {project.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  {project.client && (
                    <span className="text-xs text-[#8E8E9A] truncate mt-0.5">
                      {project.client}
                    </span>
                  )}

                  {/* Hover action bar */}
                  <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <span className="text-[11px] font-mono text-white font-medium flex items-center gap-1">
                      View Case Study <ArrowUpRight className="w-3 h-3" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickInspectProject(project);
                      }}
                      title="Quick inspect thumbnail"
                      className="pointer-events-auto p-1.5 rounded-lg bg-white/15 hover:bg-white text-white hover:text-black transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Center Hover Floating Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-[#8E8E9A] font-mono text-sm">
            No gallery items found in this filter.
          </div>
        )}

        {/* Gallery Quick Inspect Lightbox */}
        <AnimatePresence>
          {quickInspectProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
              onClick={() => setQuickInspectProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full rounded-2xl bg-[#101016] border border-white/15 overflow-hidden shadow-2xl flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button
                  onClick={() => setQuickInspectProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/10 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Media Side */}
                <div className="md:w-1/2 aspect-[4/5] bg-black relative overflow-hidden">
                  <img
                    src={quickInspectProject.image}
                    alt={quickInspectProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-white border border-white/15">
                      {quickInspectProject.number}
                    </span>
                  </div>
                </div>

                {/* Details Side */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E9A] uppercase tracking-wider">
                      <span>{quickInspectProject.category}</span>
                      <span>·</span>
                      <span>{quickInspectProject.year}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      {quickInspectProject.title}
                    </h3>

                    {quickInspectProject.client && (
                      <p className="text-xs font-mono text-white/70">
                        Client: <span className="text-white">{quickInspectProject.client}</span>
                      </p>
                    )}

                    <p className="text-sm text-[#9E9EA8] leading-relaxed pt-1">
                      {quickInspectProject.description}
                    </p>

                    {quickInspectProject.tools && quickInspectProject.tools.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-mono uppercase text-[#8E8E9A] tracking-wider block mb-2">
                          Production Stack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {quickInspectProject.tools.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono text-white/70 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => {
                        const target = quickInspectProject;
                        setQuickInspectProject(null);
                        onSelectProject(target);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {onOpenInquiry && (
                      <button
                        onClick={() => {
                          const target = quickInspectProject;
                          setQuickInspectProject(null);
                          onOpenInquiry(`Production inquiry for ${target.title}`);
                        }}
                        className="py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
