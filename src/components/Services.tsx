import { useState } from 'react';
import {
  Clapperboard,
  Sparkles,
  Cpu,
  Workflow,
  Layers,
  Compass,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { useFadeInObserver } from '../hooks/useFadeInObserver';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
}

const iconMap: Record<string, typeof Clapperboard> = {
  Clapperboard,
  Sparkles,
  Cpu,
  Workflow,
  Layers,
  Compass,
};

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggleExpand,
  onSelect,
}: {
  service: ServiceItem;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
}) {
  const { ref, isInView } = useFadeInObserver({ margin: '-40px' });
  const IconComponent = iconMap[service.iconName] || Clapperboard;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`rounded-2xl bg-[#101017] border transition-colors duration-300 p-6 sm:p-7 flex flex-col justify-between group will-change-transform ${
        isExpanded
          ? 'border-white/30 shadow-2xl bg-[#13131B]'
          : 'border-white/[0.08] hover:border-white/[0.18]'
      }`}
    >
      <div>
        {/* Card top bar with fine-line icon and index */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/20 transition-colors">
            <IconComponent className="w-5 h-5 stroke-[1.5]" />
          </div>
          <span className="text-xs font-mono text-white/30">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Title & Short description */}
        <h3 className="text-xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[#9A9AA6] leading-relaxed mb-4">
          {service.shortDesc}
        </p>

        {/* Expanded Deep Dive Details */}
        {isExpanded && (
          <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-[#BCBCC8] leading-relaxed">
              {service.fullDesc}
            </p>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E8C] mb-2">
                Deliverables & Milestones
              </div>
              <ul className="space-y-1.5">
                {service.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#E1E1E8] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer action toggle & inquiry */}
      <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
        <button
          onClick={onToggleExpand}
          className="text-xs font-mono text-[#9E9EA8] hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
        >
          <span>{isExpanded ? 'Show Less' : 'Scope & Specs'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <button
          onClick={onSelect}
          className="text-xs font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Book Capability</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export function Services({ services, onSelectService }: ServicesProps) {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 md:py-32 relative bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
            WHAT I DO
          </h2>
          <p className="text-base text-[#9E9EA8] leading-relaxed">
            Bridging cinematic visual storytelling with enterprise automation to build resilient, high-volume production operations.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedServiceId === service.id}
              onToggleExpand={() => toggleExpand(service.id)}
              onSelect={() => onSelectService(service.title)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
