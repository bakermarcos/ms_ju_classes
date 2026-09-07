import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import { juliaBookCover } from '@/lib/images';
import { INSTAGRAM_URL } from '@/lib/config';
import { InstagramIcon, PurposeIcon, StrategyIcon, TeamIcon, WhatsAppIcon } from './Icons';

const pillars = [
  {
    Icon: TeamIcon,
    title: 'Formação para equipes pedagógicas',
    text: 'Encontros desenhados para o time inteiro da escola, alinhando linguagem, critérios e prática.',
  },
  {
    Icon: StrategyIcon,
    title: 'Estratégias práticas para sala de aula',
    text: 'Objetivo, contexto, mediação, scaffolding e protagonismo aplicados ao que acontece na aula real.',
  },
  {
    Icon: PurposeIcon,
    title: 'Ensino de inglês com propósito',
    text: 'Sair da aula divertida porém passiva e criar situações em que o aluno precisa pensar, decidir e usar a língua.',
  },
];

const MasterClass = () => (
  <section id="masterclass" className="section section-dark">
    <div className="container">
      <div className="masterclass">
        <div className="masterclass-text" data-reveal="out">
          <p className="eyebrow">Para escolas e professores</p>
          <h2 className="section-title">Leve uma master class para a sua equipe</h2>
          <p className="lede">
            Ensinar inglês exige mais do que dominar o idioma. Levo formações e master classes
            para escolas e equipes pedagógicas que querem entrar em cada aula sabendo exatamente o
            que o aluno vai conseguir fazer ao sair dela.
          </p>

          <ul className="pillars">
            {pillars.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="pillar-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="masterclass-actions">
            <a
              href={generateWhatsAppLink(messages.masterclass)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-accent"
            >
              <WhatsAppIcon />
              Quero levar para a minha escola
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-ghost-light"
            >
              <InstagramIcon />
              Chamar no direct
            </a>
          </div>
        </div>

        <div className="masterclass-media" data-reveal="out">
          <img
            src={juliaBookCover}
            alt="Ms. Ju apresentando material próprio em uma formação"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
);

export default MasterClass;
