import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  initials: string;
  name: string;
  onOpenContact: () => void;
  onToggleEdit?: () => void;
  isEditOpen?: boolean;
  onNavigateHome?: (sectionHash?: string) => void;
  isSubpage?: boolean;
}

export function Navbar({
  initials,
  name,
  onOpenContact,
  onToggleEdit,
  isEditOpen,
  onNavigateHome,
  isSubpage = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isSubpage && onNavigateHome) {
      onNavigateHome(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubpage && onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080A]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-display font-bold text-sm tracking-wider text-white group-hover:bg-white group-hover:text-black transition-colors duration-200">
            {initials || 'KV'}
          </div>
          <span className="font-display font-semibold tracking-tight text-white/95 text-base md:text-lg group-hover:text-white transition-colors">
            {name || 'Specialist Portfolio'}
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9E9EA8]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-white transition-colors duration-150 relative py-1 focus:outline-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Let's Talk & Mobile toggle) */}
        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={onOpenContact}
            strength={0.3}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-[#EDEDED] rounded-lg transition-colors duration-200 shadow-sm hover:shadow-white/15 hover:shadow-md whitespace-nowrap active:scale-[0.98]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white/80 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D11] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-base font-medium text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-black bg-white rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
