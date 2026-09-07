import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import { msJuLogo } from '@/lib/images';
import { INSTAGRAM_URL } from '@/lib/config';
import { InstagramIcon, WhatsAppIcon } from './Icons';

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-cta" data-reveal="out">
        <img className="footer-logo" src={msJuLogo} alt="Ms. Ju — Pedagogia Bilíngue" loading="lazy" decoding="async" />
        <h2>Vamos marcar a primeira aula?</h2>
        <p>Me chama no WhatsApp para tirar dúvidas e reservar a vaga.</p>
        <a
          href={generateWhatsAppLink(messages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          <WhatsAppIcon />
          Falar com a Ms. Ju
        </a>
      </div>

      <div className="footer-bottom">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
          aria-label="Instagram da Ms. Ju"
        >
          <InstagramIcon />
        </a>
        <p className="copyright">© {new Date().getFullYear()} Ms. Ju · Pedagogia Bilíngue</p>
      </div>
    </div>
  </footer>
);

export default Footer;
