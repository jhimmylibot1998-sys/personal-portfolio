import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ArrowUpRight, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultScope?: string;
  recipientEmail: string;
}

export function ContactModal({
  isOpen,
  onClose,
  defaultScope,
  recipientEmail,
}: ContactModalProps) {
  const [scope, setScope] = useState(defaultScope || 'AI Video Production');
  const [budget, setBudget] = useState('$15,000 – $30,000');
  const [timeline, setTimeline] = useState('2–4 Weeks');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultScope) {
      setScope(defaultScope);
    }
  }, [defaultScope]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous graceful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  const scopeOptions = [
    'AI Video Production',
    'AI Social Video System',
    'Workflow Automation',
    'Content Automation Engine',
    'AI Creative Systems',
    'Strategic Advisory',
  ];

  const budgetOptions = [
    '< $10,000',
    '$10,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000+',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0E0E14] border border-white/[0.12] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-[#E8E8ED]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#8E8E9A] flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-white/70" />
              <span>Project Brief & Inquiry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              LET'S BUILD TOGETHER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-[#A0A0B0] max-w-md mx-auto leading-relaxed">
              Thank you for reaching out! Your project brief has been received. I review briefs within 24 hours and will respond with technical scopes and availability.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-white text-black text-xs uppercase font-semibold tracking-wider rounded-lg hover:bg-[#EDEDED] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-6">
            {/* Scope selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#8E8E9A] mb-2.5">
                Primary Focus Area
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {scopeOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setScope(opt)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left truncate transition-colors border cursor-pointer ${
                      scope === opt
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.03] text-white/80 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget options */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#8E8E9A] mb-2.5">
                Approximate Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium text-center transition-colors border cursor-pointer ${
                      budget === b
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.03] text-white/80 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#8E8E9A] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#8E8E9A] mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            {/* Project description */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-[#8E8E9A] mb-1.5">
                Project Overview & Goals *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your vision, video concept, or automation bottleneck..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 resize-none"
              />
            </div>

            {/* Submission notice */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-[11px] font-mono text-[#767684]">
                Inquiry routed directly to <span className="text-white/80">{recipientEmail}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#EDEDED] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Submit Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
