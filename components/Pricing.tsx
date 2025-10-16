import React from 'react';
import { generateWhatsAppLink, messages } from '../lib/whatsapp';

const Pricing = () => {
  return (
    <section id="pricing">
      <div className="container">
        <h2 className="section-title">Planos para Crianças</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>1x por Semana</h3>
            <div className="price">R$ 680,00<span>/mês</span></div>
            <p>Presencial</p>
            <a href={generateWhatsAppLink(messages.kids_1x)} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fab fa-whatsapp"></i> Quero esse!
            </a>
          </div>
          <div className="pricing-card">
            <h3>2x por Semana</h3>
            <div className="price">R$ 960,00<span>/mês</span></div>
            <p>Presencial</p>
            <a href={generateWhatsAppLink(messages.kids_2x)} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fab fa-whatsapp"></i> Quero esse!
            </a>
          </div>
          <div className="pricing-card">
            <h3>3x por Semana</h3>
            <div className="price">R$ 1.340,00<span>/mês</span></div>
            <p>Presencial</p>
            <a href={generateWhatsAppLink(messages.kids_3x)} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fab fa-whatsapp"></i> Quero esse!
            </a>
          </div>
          <div className="pricing-card">
            <h3>2x por Semana</h3>
            <div className="price">R$ 580,00<span>/mês</span></div>
            <p>Online</p>
            <a href={generateWhatsAppLink(messages.kids_online)} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fab fa-whatsapp"></i> Quero esse!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
