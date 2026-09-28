import { CheckCircle, Lightbulb, Zap, GitBranch, Maximize2, FlaskConical } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface AboutProps {
  name: string;
  title: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  portraitUrl: string;
  onOpenContact: () => void;
}

export function About({
  name,
  title,
  bioHeadline,
  bioParagraph1,
  bioParagraph2,
  portraitUrl,
  onOpenContact,
}: AboutProps) {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Creative Problem Solving',
      desc: 'Approaching visual narratives with artistic intentionality, ensuring technology serves the story—never the reverse.',
    },
    {
      icon: Zap,
      title: 'AI-First Workflows',
      desc: 'Integrating diffusion, neural video renderers, and multimodal LLMs from the ground up for 10x production speed.',
    },
    {
      icon: GitBranch,
      title: 'Autonomous Orchestration',
      desc: 'Linking disconnected creative assets, webhooks, and project pipelines into resilient, self-triggering sequences.',
    },
    {
      icon: Maximize2,
      title: 'Scalable Systems',
      desc: 'Constructing standardized SOPs and prompt repositories so growing creative teams reproduce high fidelity at volume.',
    },
    {
      icon: FlaskConical,
      title: 'Continuous Experimentation',
      desc: 'Rapidly prototyping emerging frontier models and video synthesis weights before they become industry standard.',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#09090D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span>Philosophy & Background</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]">
            {bioHeadline || 'CREATIVE THINKING. AUTOMATED EXECUTION.'}
          </h2>
        </div>

        {/* Content Split: Left bio & Pillars, Right Secondary Portrait Vignette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#B2B2C0] leading-relaxed font-normal">
              <p>
                {bioParagraph1 ||
                  'I combine AI video production, creative direction, automation, and workflow design to help businesses produce content and operate more efficiently.'}
              </p>
              <p className="text-[#8E8E9E] text-base">
                {bioParagraph2 ||
                  'By merging studio art direction with modern autonomous pipelines, I help founders, creative directors, and marketing leaders scale their visual output without exponential headcount costs.'}
              </p>
            </div>

            {/* Core 5 Pillars Grid */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <div className="text-xs uppercase font-mono tracking-wider text-[#8A8A96]">
                Core Operational Tenets
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/80">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-display font-bold text-white tracking-tight">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#8E8E9B] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Profile Card with Visual Framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111118] border border-white/[0.09] p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/15 bg-black shrink-0">
                  <img
                    src={portraitUrl}
                    alt={name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    {name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8E8E9B]">
                    {title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Active on Client Pipelines</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-2 text-xs font-mono text-[#A2A2B0]">
                <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-[#6D6D78]">Focus</span>
                  <span className="text-white">AI Video & Automation</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-[#6D6D78]">Production Model</span>
                  <span className="text-white">AI Creative & Automation Specialist</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
                  <span className="text-[#6D6D78]">Turnaround</span>
                  <span className="text-white">3–5 Day Production</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D6D78]">Engagement</span>
                  <span className="text-white">Projects / Short-Term / Ongoing</span>
                </div>
              </div>

              <MagneticButton
                onClick={onOpenContact}
                strength={0.2}
                className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#EDEDED] transition-colors"
              >
                <span>Schedule Strategy Session</span>
              </MagneticButton>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
