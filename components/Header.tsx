import React, { useEffect, useState } from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import { msJuWordmark } from '@/lib/images';
import { INSTAGRAM_URL } from '@/lib/config';
import { InstagramIcon, WhatsAppIcon } from './Icons';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="container header-content">
        <a href="#top" className="logo" aria-label="Ms. Ju — Pedagogia Bilíngue">
          <img src={msJuWordmark} alt="Ms. Ju" width={160} height={73} />
        </a>

        <nav className="header-nav" aria-label="Seções">
          <a href="#metodologia">Metodologia</a>
          <a href="#planos">Planos</a>
          <a href="#masterclass">Para escolas</a>
        </nav>

        <div className="header-actions">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label="Instagram da Ms. Ju"
          >
            <InstagramIcon />
          </a>
          <a
            href={generateWhatsAppLink(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary button-sm"
          >
            <WhatsAppIcon />
            Fale comigo
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
