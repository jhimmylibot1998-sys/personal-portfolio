import React, { useRef } from 'react';
import { X, RotateCcw, Upload, Download, Sparkles, Check } from 'lucide-react';
import { PortfolioData } from '../types';

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
  onReset: () => void;
}

export function EditDrawer({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
}: EditDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleStatChange = (id: string, field: 'label' | 'value' | 'subtext', value: string) => {
    const updatedStats = data.stats.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({
      ...data,
      stats: updatedStats,
    });
  };

  const handleSocialChange = (key: keyof PortfolioData['socials'], value: string) => {
    onChange({
      ...data,
      socials: {
        ...data.socials,
        [key]: value,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleTextChange('portraitUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const exportConfig = () => {
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', 'portfolio-custom-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D0D12] border-l border-white/10 shadow-2xl flex flex-col text-[#E8E8ED] animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0F]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white/70" />
          <h3 className="font-display font-bold text-sm tracking-tight text-white">
            Portfolio Customizer
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close edit drawer"
          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content Form */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
        
        {/* Profile / Identity */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A96] border-b border-white/5 pb-1">
            01. Personal Identity & Portrait
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-[#9D9DA8] mb-1 font-mono">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleTextChange('name', e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Initials</label>
              <input
                type="text"
                value={data.initials}
                onChange={(e) => handleTextChange('initials', e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Professional Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleTextChange('title', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Hero Portrait</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 rounded overflow-hidden bg-black border border-white/15 shrink-0">
                <img
                  src={data.portraitUrl}
                  alt="Portrait preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Custom Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A96] border-b border-white/5 pb-1">
            02. Hero Section Headlines
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Hero Eyebrow</label>
            <input
              type="text"
              value={data.heroEyebrow}
              onChange={(e) => handleTextChange('heroEyebrow', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Line 1</label>
              <input
                type="text"
                value={data.heroHeadingLine1}
                onChange={(e) => handleTextChange('heroHeadingLine1', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Line 2</label>
              <input
                type="text"
                value={data.heroHeadingLine2}
                onChange={(e) => handleTextChange('heroHeadingLine2', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Line 3</label>
              <input
                type="text"
                value={data.heroHeadingLine3}
                onChange={(e) => handleTextChange('heroHeadingLine3', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Line 4</label>
              <input
                type="text"
                value={data.heroHeadingLine4 || 'SPECIALIST'}
                onChange={(e) => handleTextChange('heroHeadingLine4', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Supporting Statement</label>
            <textarea
              rows={3}
              value={data.heroSupportingText}
              onChange={(e) => handleTextChange('heroSupportingText', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Availability Badge</label>
            <input
              type="text"
              value={data.availabilityText}
              onChange={(e) => handleTextChange('availabilityText', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A96] border-b border-white/5 pb-1">
            03. Statistics Metrics
          </div>

          <div className="space-y-2">
            {data.stats.map((stat) => (
              <div key={stat.id} className="grid grid-cols-3 gap-2 items-center bg-white/[0.02] p-2 rounded border border-white/5">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                  placeholder="50+"
                  className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white font-bold font-display"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                  placeholder="AI VIDEO"
                  className="col-span-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-white font-mono text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A96] border-b border-white/5 pb-1">
            04. Contact & Links
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleTextChange('email', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9D9DA8] mb-1 font-mono">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleTextChange('location', e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">LinkedIn URL</label>
              <input
                type="text"
                value={data.socials.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none text-[11px]"
              />
            </div>
            <div>
              <label className="block text-[#9D9DA8] mb-1 font-mono">Instagram URL</label>
              <input
                type="text"
                value={data.socials.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white focus:outline-none text-[11px]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-white/10 bg-[#0A0A0F] flex items-center justify-between gap-3">
        <button
          onClick={onReset}
          className="px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>

        <button
          onClick={exportConfig}
          className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-white text-black font-semibold text-xs font-mono cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
