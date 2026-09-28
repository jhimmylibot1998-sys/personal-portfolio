import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CtaSectionProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export function CtaSection({ onStartProject, onViewWork }: CtaSectionProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-tech-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Large Premium CTA Panel */}
        <div className="relative rounded-3xl bg-[#0D0D13] border border-white/[0.12] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          
          {/* Ambient lighting effects */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Technical subtle corner markings */}
          <div className="absolute top-6 left-6 text-[10px] font-mono text-white/30 tracking-widest uppercase">
            ENGAGEMENT // READY FOR PRODUCTION
          </div>

          <div className="max-w-3xl space-y-8 relative z-10">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span className="tracking-wider uppercase">Open for Select Q4 / 2026 Collaborations</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[0.95]">
              LET'S BUILD <br />
              SOMETHING <br />
              INTELLIGENT.
            </h2>

            <p className="text-base sm:text-xl text-[#A6A6B4] max-w-xl leading-relaxed">
              Have a project, content system, or automation workflow in mind? Let's turn it into something scalable.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton
                onClick={onStartProject}
                strength={0.25}
                className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#EDEDED] transition-colors duration-200 flex items-center gap-2 shadow-xl shadow-white/5 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={onViewWork}
                strength={0.25}
                className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200 flex items-center gap-2 active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-white/60" />
              </MagneticButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
