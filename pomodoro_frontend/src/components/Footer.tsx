// Footer.tsx
import React from 'react';
import Icon from '@mdi/react';
import { mdiGithub, mdiLinkedin, mdiPaletteOutline } from '@mdi/js';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: mdiGithub, label: 'GitHub', url: 'https://github.com/EmiLzLz' },
    { icon: mdiLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/emiliano-lopez-lopez/' },
    { icon: mdiPaletteOutline, label: 'Behance', url: 'https://behance.net/emilianolopez218' }
  ];

  return (
    <footer className="w-full bg-white/46 backdrop-blur-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Nombre */}
        <p className="text-gray-800 font-medium text-sm sm:text-base">
          Emiliano López López
        </p>

        {/* Social Links */}
        <nav className="flex items-center gap-4" aria-label="Social media links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link transition-transform duration-300 hover:scale-110"
              aria-label={link.label}
            >
              <Icon path={link.icon} size={1} className="text-[#B56C00]" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
