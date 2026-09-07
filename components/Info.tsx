import React from 'react';
import { brinquedoteca } from '@/lib/images';
import { useSiteConfig } from '@/lib/useSiteConfig';

const Info = () => {
  const { enrollmentFee, location } = useSiteConfig();

  const items = [
    { term: 'Local', text: `As aulas presenciais acontecem no meu espaço em ${location}. Aulas em outros locais podem ser negociadas.` },
    { term: 'Calendário', text: 'As aulas seguem o calendário escolar: início em fevereiro, 15 dias de férias em julho e término em dezembro.' },
    { term: 'Pagamento', text: 'Via PIX ou boleto até o quinto dia útil do mês. O contrato é de 12 parcelas do pacote escolhido.' },
    { term: 'Matrícula', text: `Taxa de ${enrollmentFee} para reserva da vaga.` },
  ];

  return (
    <section id="informacoes" className="section">
      <div className="container">
        <header className="section-head" data-reveal="out">
          <p className="eyebrow">Antes de começar</p>
          <h2 className="section-title">Informações importantes</h2>
        </header>

        <div className="split split-reverse">
          <div className="split-text" data-reveal="out">
            <dl className="info-list">
              {items.map(({ term, text }) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="split-media" data-reveal="out">
            <img src={brinquedoteca} alt="Ambiente da brinquedoteca da Ms. Ju" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
