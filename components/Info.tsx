import React from 'react';
import robotsTraveling from '@/images/robots.png';

const Info = () => {
  return (
    <section id="info">
      <div className="container">
        <h2 className="section-title">Informações Importantes</h2>
        <div className="info-content">
          <div className="info-text">
            <p><strong>📍 Local:</strong> As aulas presenciais acontecem no meu espaço em Lagoa Santa/MG. A possibilidade de aulas em outros locais pode ser negociada.</p>
            <p><strong>🗓️ Calendário:</strong> As aulas seguem o calendário escolar, com início em fevereiro, 15 dias de férias em julho e término em dezembro.</p>
            <p><strong>💳 Pagamento:</strong> O pagamento pode ser feito via PIX ou boleto até o quinto dia útil do mês. O contrato é de 12 parcelas do pacote escolhido.</p>
            <p><strong>✏️ Matrícula:</strong> É cobrada uma taxa de matrícula de R$ 200,00 para reserva da vaga.</p>
          </div>
          <div className="info-image">
            <img src={robotsTraveling} alt="Mascotes da aula em uma viagem" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
