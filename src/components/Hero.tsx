import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Activity, Workflow } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  eyebrow: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4?: string;
  professionalTitle?: string;
  supportingText: string;
  availabilityText: string;
  portraitUrl: string;
  onViewWork: () => void;
  onContact: () => void;
  onUpdatePortrait?: (url: string) => void;
}

export function Hero({
  eyebrow,
  heading1,
  heading2,
  heading3,
  heading4,
  professionalTitle,
  supportingText,
  availabilityText,
  portraitUrl,
  onViewWork,
  onContact,
}: HeroProps) {

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:py-32 flex items-center bg-tech-grid overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Editorial Oversized Typography */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 relative z-20 min-w-0">
            
            {/* Eyebrow & Category */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/90 text-xs font-mono tracking-wider uppercase backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{eyebrow || 'AI-POWERED CREATIVE TECHNOLOGY'}</span>
              </div>
            </div>

            {/* Editorial Headline with Responsive Scaling */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[3.25rem] 2xl:text-[3.6rem] font-display font-extrabold tracking-tight leading-[0.96] text-white break-normal">
                <span className="block whitespace-nowrap">{heading1 || 'AI VIDEO'}</span>
                <span className="block text-white/40 italic font-normal my-0.5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] xl:text-[2.6rem] tracking-tight">
                  {heading2 || '&'}
                </span>
                <span className="block text-white whitespace-nowrap">{heading3 || 'AUTOMATION'}</span>
                <span className="block text-white whitespace-nowrap">{heading4 || 'SPECIALIST'}</span>
              </h1>
            </div>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-[#A5A5B2] max-w-xl font-normal leading-relaxed text-balance">
              {supportingText ||
                'I design AI-powered video experiences and automation systems that turn ideas into scalable digital production.'}
            </p>

            {/* Buttons & CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={onViewWork}
                strength={0.25}
                className="px-6 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#EAEAEA] transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </MagneticButton>

              <MagneticButton
                onClick={onContact}
                strength={0.25}
                className="px-6 py-3.5 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-200 flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
              </MagneticButton>
            </div>

            {/* Micro proof indicator */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#7A7A86] border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-white/50" />
                <span>End-to-End Generative Pipelines</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white/50" />
                <span>Broadcast 4K Render Resolution</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Container & Technical Atmosphere */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative z-10 w-full">
            
            {/* Outer container with technical diagram borders and coords */}
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[340px] xl:max-w-[390px] group">
              
              {/* Technical framing lines & crosshairs */}
              <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-white/25 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-white/25 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-white/25 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-white/25 pointer-events-none" />

              {/* Technical coordinates label */}
              <div className="absolute -top-7 right-0 text-[10px] font-mono text-[#7A7A86] tracking-wider">
                SYS.SPEC // 01.VIDEO_CORE
              </div>

              {/* Glowing backplate frame */}
              <div className="relative rounded-2xl overflow-hidden bg-[#121217] border border-white/[0.12] shadow-2xl shadow-black/80">
                
                {/* Hero Portrait Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-[#16161D]">
                  <img
                    src={portraitUrl}
                    alt="AI Video & Automation Specialist Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Gradient scrim for depth integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-black/20 pointer-events-none" />

                  {/* Subtle technical HUD lines overlay */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 m-3 rounded-xl">
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE FEED</span>
                    </div>

                    <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/40">
                      ISO 100 · 35MM · F/1.4
                    </div>
                  </div>

                </div>

                {/* Floating Availability Indicator Badge at bottom */}
                <div className="p-4 bg-[#0E0E14] border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#8A8A96]">
                        Status Indicator
                      </div>
                      <div className="text-xs font-semibold text-white tracking-tight">
                        {availabilityText || 'AVAILABLE FOR FREELANCE & COLLABORATION'}
                      </div>
                    </div>
                  </div>

                  <Activity className="w-4 h-4 text-emerald-400/70" />
                </div>
              </div>

              {/* Background ambient diagram arcs */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 border border-dashed border-white/10 rounded-full pointer-events-none" />
              <div className="absolute -top-8 -left-8 w-20 h-20 border border-white/[0.06] rounded-full pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
