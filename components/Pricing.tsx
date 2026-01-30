import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';

const plans = [
  { title: '1x por Semana', price: 'R$ 680,00', modality: 'Presencial', messageKey: 'kids_1x' },
  { title: '2x por Semana', price: 'R$ 960,00', modality: 'Presencial', messageKey: 'kids_2x' },
  { title: '3x por Semana', price: 'R$ 1.340,00', modality: 'Presencial', messageKey: 'kids_3x' },
  { title: '2x por Semana', price: 'R$ 580,00', modality: 'Online', messageKey: 'kids_online' },
] as const;

const Pricing = () => {
  return (
    <section id="pricing">
      <div className="container">
        <h2 className="section-title">Planos para Crianças</h2>
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

export default Pricing;
