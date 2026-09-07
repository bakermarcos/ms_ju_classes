import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import { teacherAndKid } from '@/lib/images';
import { useSiteConfig } from '@/lib/useSiteConfig';
import { ArrowIcon, WhatsAppIcon } from './Icons';

const Hero = () => {
  const { classDuration, location } = useSiteConfig();

  return (
    <section className="hero" id="top">
      <div className="container hero-container">
        <div className="hero-text" data-reveal="out">
          <p className="eyebrow">Inglês com propósito · Infância com sentido</p>
          <h1>
            Aulas de inglês <em>lúdicas</em> e personalizadas
          </h1>
          <p className="lede">
            Aulas particulares para crianças e adultos, presenciais em Lagoa Santa/MG e online no
            Brasil todo. Cada aula é montada para o perfil de um aluno só: o seu.
          </p>

          <div className="hero-actions">
            <a
              href={generateWhatsAppLink(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <WhatsAppIcon />
              Agende uma conversa
            </a>
            <a href="#planos" className="button button-ghost">
              Ver planos
              <ArrowIcon />
            </a>
          </div>

          <dl className="hero-facts">
            <div>
              <dt>Aulas de</dt>
              <dd>{classDuration}</dd>
            </div>
            <div>
              <dt>Presencial em</dt>
              <dd>{location}</dd>
            </div>
            <div>
              <dt>Também</dt>
              <dd>Online, no Brasil todo</dd>
            </div>
          </dl>
        </div>

        <div className="hero-image" data-reveal="out">
          <img
            src={teacherAndKid}
            alt="Ms. Ju ao lado de uma aluna segurando a atividade que produziram juntas"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
