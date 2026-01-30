import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';

const plans = [
  { title: '2x por Semana', price: 'R$ 580,00', modality: 'Online', messageKey: 'adults_online_2x' },
] as const;

const AdultPricing = () => {
  return (
    <section id="adult-pricing">
      <div className="container">
        <h2 className="section-title">Planos para Adultos</h2>
        <p className="section-subtitle">Planos flexíveis para você alcançar seus objetivos, seja para viagens, trabalho ou simplesmente para destravar a conversação.</p>
        <div className="pricing-grid">
          {plans.map(({ title, price, modality, messageKey }) => (
            <div className="pricing-card" key={title + modality}>
              <h3>{title}</h3>
              <div className="price">
                {price}
                <span>/mês</span>
              </div>
              <p>{modality}</p>
              <a
                href={generateWhatsAppLink(messages[messageKey])}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                <i className="fab fa-whatsapp"></i> Quero esse!
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdultPricing;
