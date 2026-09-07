import React from 'react';
import { generateWhatsAppLink, messages } from '@/lib/whatsapp';
import { robotsTraveling } from '@/lib/images';
import { useSiteConfig } from '@/lib/useSiteConfig';
import { WhatsAppIcon } from './Icons';

const steps = [
  {
    title: 'O kit chega antes da unidade começar',
    text: 'A cada nova unidade eu envio para a casa do aluno o material físico daquele bloco: jogos, cartelas, livrinhos e as atividades produzidas por mim.',
  },
  {
    title: 'A aula online usa o material de verdade',
    text: 'A criança manuseia, recorta e joga junto comigo, do mesmo jeito que faria no presencial. A tela é só a janela entre nós.',
  },
  {
    title: 'O que sobra vira repertório em casa',
    text: 'Terminada a unidade, o material fica com a família. Dá para retomar a brincadeira, revisar o vocabulário e mostrar o que aprendeu.',
  },
];

const OnlineKit = () => {
  const { kidsPlans } = useSiteConfig();
  const plan = kidsPlans.find((item) => item.messageKey === 'kids_online_kit');

  return (
    <section id="online-kit" className="section section-amber">
      <div className="container">
        <div className="split">
          <div className="split-text" data-reveal="out">
            <p className="eyebrow">Online para crianças</p>
            <h2 className="section-title">Aula online com material físico em casa</h2>
            <p className="lede">
              Morar longe não deveria custar a parte concreta do aprendizado. Por isso o plano
              online infantil inclui o envio do kit de materiais para a sua casa a cada troca de
              unidade, sem custo extra.
            </p>

            <ol className="steps">
              {steps.map(({ title, text }, index) => (
                <li key={title}>
                  <span className="step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="steps-note">
              {plan ? `${plan.title} · ${plan.price}/mês, com o kit incluso.` : 'Kit incluso no plano online.'}
            </p>

            <a
              href={generateWhatsAppLink(messages.kids_online_kit)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <WhatsAppIcon />
              Quero o plano online com kit
            </a>
          </div>

          <div className="split-media" data-reveal="out">
            <img
              src={robotsTraveling}
              alt="Materiais e mascotes que compõem o kit enviado para casa"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineKit;
