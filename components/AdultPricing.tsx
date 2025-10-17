import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';

const AdultPricing = () => {
  return (
    <section id="adult-pricing">
      <div className="container">
        <h2 className="section-title">Planos para Adultos</h2>
        <p className="section-subtitle">Planos flexíveis para você alcançar seus objetivos, seja para viagens, trabalho ou simplesmente para destravar a conversação.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>2x por Semana</h3>
            <div className="price">R$ 580,00<span>/mês</span></div>
            <p>Online</p>
            <a href={generateWhatsAppLink(messages.adults_online_2x)} target="_blank" rel="noopener noreferrer" className="cta-button">
              <i className="fab fa-whatsapp"></i> Quero esse!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdultPricing;