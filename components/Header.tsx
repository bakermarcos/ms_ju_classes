import React from 'react';
import { generateWhatsAppLink, messages } from '../lib/whatsapp';

const Header = () => {
  return (
    <header>
      <div className="container header-content">
        <a href="#" className="logo">Ms. Ju</a>
        <a href={generateWhatsAppLink(messages.general)} target="_blank" rel="noopener noreferrer" className="cta-button">
          <i className="fab fa-whatsapp"></i> Fale Comigo
        </a>
      </div>
    </header>
  );
};

export default Header;
