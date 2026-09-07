import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import type { Plan } from '@/lib/config';
import { WhatsAppIcon } from './Icons';

const PlanCard = ({ title, price, modality, messageKey, description, featured }: Plan) => (
  <article className="plan-card" data-featured={featured ? 'true' : 'false'} data-reveal="out">
    {featured && <span className="plan-badge">Mais procurado</span>}
    <h3>{title}</h3>
    <p className="plan-price">
      {price}
      <span>/mês</span>
    </p>
    <p className="plan-modality">{modality}</p>
    {description && <p className="plan-description">{description}</p>}
    <a
      href={generateWhatsAppLink(messages[messageKey])}
      target="_blank"
      rel="noopener noreferrer"
      className={featured ? 'button button-primary button-block' : 'button button-outline button-block'}
    >
      <WhatsAppIcon />
      Quero esse
    </a>
  </article>
);

export default PlanCard;
