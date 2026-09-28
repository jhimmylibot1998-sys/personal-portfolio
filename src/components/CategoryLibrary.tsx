import { ArrowLeft, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { CategoryInfo } from '../lib/projectRegistry';
import { ProjectCard } from './ProjectCard';

interface CategoryLibraryProps {
  currentCategory: CategoryInfo;
  allCategories: CategoryInfo[];
  onSelectProject: (project: ProjectItem) => void;
  onNavigateCategory: (categorySlug: string) => void;
  onBackToHome: () => void;
}

export function CategoryLibrary({
  currentCategory,
  allCategories,
  onSelectProject,
  onNavigateCategory,
  onBackToHome,
}: CategoryLibraryProps) {
  return (
    <div className="min-h-screen bg-[#08080A] text-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#8E8E9A] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Homepage</span>
          </button>

          <div className="text-xs font-mono text-[#8E8E9A] flex items-center gap-2">
            <span>/projects/{currentCategory.slug}</span>
          </div>
        </div>

        {/* Section Header with Category Title & Switcher Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 py-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Category Project Library</span>
              <span className="text-white/20">/</span>
              <span>{currentCategory.count} {currentCategory.count === 1 ? 'Production' : 'Productions'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase">
              {currentCategory.name}
            </h1>
            
            <p className="text-sm sm:text-base text-[#9E9EA8] max-w-2xl leading-relaxed">
              Explore the complete archive of {currentCategory.name.toLowerCase()} productions, neural models, and commercial deliverables.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl max-w-full overflow-x-auto">
            {allCategories.map((cat) => {
              const isActive = cat.slug === currentCategory.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onNavigateCategory(cat.slug)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-[#9E9EA8] hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-emerald-400'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid Layout matching the exact Selected Work design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-12">
          {currentCategory.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              badgeText={project.featured ? 'Featured' : undefined}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>

        {/* Bottom Navigation footer */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <div className="text-xs font-mono text-[#8E8E9A]">
            Auto-synced from GitHub directory: <span className="text-white/60">projects/{currentCategory.slug}/</span>
          </div>
        </div>

      </div>
    </div>
  );
}
