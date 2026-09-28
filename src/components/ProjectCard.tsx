import { ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../types';
import { useFadeInObserver } from '../hooks/useFadeInObserver';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelect: () => void;
  badgeText?: string;
}

export function ProjectCard({
  project,
  index = 0,
  onSelect,
  badgeText,
}: ProjectCardProps) {
  const { ref, isInView } = useFadeInObserver({ margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onClick={onSelect}
      className="group relative flex flex-col rounded-2xl bg-[#0E0E14] border border-white/[0.08] hover:border-white/[0.22] transition-colors duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-black/60 will-change-transform w-full"
    >
      {/* Media image container with hover zoom and overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#14141C]">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Top metadata tags */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white/90 border border-white/10">
              {project.number}
            </span>
            {badgeText && (
              <span className="bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded text-emerald-300 border border-emerald-500/30 uppercase tracking-wider text-[10px] font-semibold">
                {badgeText}
              </span>
            )}
          </div>

          <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white/70 border border-white/10">
            {project.year}
          </span>
        </div>

        {/* Hover Quick-Inspect Pill */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="px-4 py-2 bg-white/95 text-black font-semibold text-xs tracking-wider uppercase rounded-full flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-200">
            <Eye className="w-3.5 h-3.5" />
            <span>View Case Study</span>
          </div>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E9A] uppercase tracking-wider mb-2">
            <span>{project.category}</span>
            {project.duration && (
              <>
                <span>·</span>
                <span>{project.duration}</span>
              </>
            )}
          </div>

          <h3 className="text-2xl font-display font-bold text-white group-hover:text-white transition-colors tracking-tight flex items-center justify-between">
            <span>{project.title}</span>
            <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-white text-white/70 group-hover:text-black flex items-center justify-center transition-all duration-200">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </h3>

          <p className="text-sm text-[#9E9EA8] leading-relaxed mt-3 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tool Pills at card footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-mono text-white/60 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[11px] font-mono text-white/40 px-1 py-0.5">
                +{project.tools.length - 3}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-white/80 group-hover:text-white flex items-center gap-1">
            Explore <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
