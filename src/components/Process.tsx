import { useState } from 'react';
import { ProcessStep } from '../types';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="py-24 md:py-32 relative bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span>Methodology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
            MY PROCESS
          </h2>
          <p className="text-base text-[#9E9EA8] leading-relaxed">
            A battle-tested five-stage framework that transforms ambitious creative visions into autonomous, measurable digital workflows.
          </p>
        </div>

        {/* 5-Step Horizontal Grid with Connecting Top Line */}
        <div className="relative">
          
          {/* Subtle connecting line across desktop steps */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-white/[0.08] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#12121A] border-white/30 shadow-xl'
                      : 'bg-[#0D0D12] border-white/[0.07] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Step indicator node */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-white text-black shadow-lg shadow-white/10'
                            : 'bg-white/[0.06] text-white/70 border border-white/10'
                        }`}
                      >
                        {step.step}
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D6D78]">
                        Phase 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-display font-bold text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#A0A0B0] mt-1.5 leading-relaxed font-normal">
                        {step.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#7E7E8E] leading-relaxed border-t border-white/[0.06] pt-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables snippet */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B77] mb-1.5">
                      Key Deliverables
                    </div>
                    <ul className="space-y-1">
                      {step.deliverables.slice(0, 2).map((del, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-[11px] text-[#C4C4D0] flex items-center gap-1.5 truncate"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                          <span className="truncate">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Phase Detail Focus Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-[#0F0F16] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Phase In-Depth Breakdown: {steps[activeStepIndex].title}</span>
            </div>
            <p className="text-sm text-[#BCBCC8]">
              {steps[activeStepIndex].description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {steps[activeStepIndex].deliverables.map((item, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] text-white/90 border border-white/[0.08]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
