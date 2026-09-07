import React from 'react';
import { teaching } from '@/lib/images';
import { useSiteConfig } from '@/lib/useSiteConfig';

const About = () => {
  const { classDuration } = useSiteConfig();

  return (
    <section id="metodologia" className="section">
      <div className="container">
        <header className="section-head" data-reveal="out">
          <p className="eyebrow">Metodologia</p>
          <h2 className="section-title">Cada aula começa por uma pergunta</h2>
          <p className="section-subtitle">
            Não “o que eu vou ensinar hoje?”, mas “o que meu aluno será capaz de fazer com o inglês
            ao final desta aula?”
          </p>
        </header>

        <div className="split">
          <div className="split-media" data-reveal="out">
            <img src={teaching} alt="Ensinando crianças em ambiente de aula" loading="lazy" decoding="async" />
          </div>
          <div className="split-text" data-reveal="out">
            <p>
              As aulas particulares têm duração de {classDuration} e são montadas a partir do perfil
              e dos objetivos de cada aluno. O inglês aparece em situações de uso real: pedir, contar,
              discordar, combinar, brincar. Não em listas de vocabulário para decorar.
            </p>
            <p>
              Não usamos apostila. Cada aula sai de material que eu mesma produzo: jogos, cartelas,
              livrinhos e atividades desenhadas para o que aquele aluno precisa naquela semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
