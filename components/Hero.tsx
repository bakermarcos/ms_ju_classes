import React from 'react';
import { generateWhatsAppLink, messages } from '../lib/whatsapp';
import { classroomScene, juliaInBookstore } from '../lib/images';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <h1>Aulas de Inglês Lúdicas e Personalizadas</h1>
          <p>Com a Teacher Júlia Tamietti, você ou seu filho(a) aprende inglês de forma natural, divertida e eficaz. Desperte a curiosidade e o amor por um novo idioma!</p>
          <a href={generateWhatsAppLink(messages.general)} target="_blank" rel="noopener noreferrer" className="cta-button">
            <i className="fab fa-whatsapp"></i> Agende uma conversa
          </a>
        </div>
        <div className="hero-image">
          <img src={classroomScene} alt="Professora Júlia Tamietti em uma sala de aula" />
        </div>
      </div>
    </section>
  );
};

export default Hero;