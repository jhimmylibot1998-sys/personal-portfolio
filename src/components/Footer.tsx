import { ArrowUp, ArrowUpRight, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  name: string;
  title: string;
  email: string;
  location: string;
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    behance: string;
    x: string;
  };
}

export function Footer({ name, title, email, location, socials }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'LinkedIn', href: socials.linkedin },
    { label: 'Instagram', href: socials.instagram },
    { label: 'YouTube', href: socials.youtube },
    { label: 'Behance', href: socials.behance },
    { label: 'X (Twitter)', href: socials.x },
  ];

  return (
    <footer id="contact" className="bg-[#060608] border-t border-white/[0.08] pt-20 pb-12 text-[#E8E8ED]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {name || 'YOUR NAME'}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-[#8E8E9A]">
              {title || 'AI VIDEO & AUTOMATION SPECIALIST'}
            </p>
            <p className="text-sm text-[#92929F] max-w-md leading-relaxed pt-2">
              Designing AI-powered video experiences, autonomous content engines, and intelligent operational workflows for global brands and creative studios.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7E7E8C]">
              Direct Inquiries
            </div>
            
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="group flex items-start gap-2 text-sm text-[#C4C4CF] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-white/50 mt-0.5 group-hover:text-white" />
                <span className="break-all">{email || 'hello@creativetech.studio'}</span>
              </a>

              <div className="flex items-start gap-2 text-sm text-[#8E8E9A]">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5" />
                <span>{location || 'San Francisco, CA / Global Remote'}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7E7E8C]">
              Network & Feeds
            </div>

            <ul className="space-y-2.5">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-[#9E9EA8] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, zero-pill info & back to top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6A6A78]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {name || 'Portfolio'}. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>AI Creative Studio</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#9E9EA8] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
