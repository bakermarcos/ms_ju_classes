import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h2>Vamos começar essa jornada juntos?</h2>
        <p>Entre em contato para tirar suas dúvidas e garantir sua vaga!</p>
        <a href={generateWhatsAppLink(messages.general)} target="_blank" rel="noopener noreferrer" className="cta-button">
          <i className="fab fa-whatsapp"></i> Falar com a Ms. Ju
        </a>
        <div className="social-links">
           <a href="https://www.instagram.com/julia_tamietti/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Ms. Ju - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;