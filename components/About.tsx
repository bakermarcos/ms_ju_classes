import React from 'react';
import { teaching } from '@/lib/images';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">Uma Metodologia Única</h2>
        <div className="about-content">
          <div className="about-image">
            <img src={teaching} alt="Ensinando crianças em ambiente de aula" />
          </div>
          <div className="about-text">
            <p>As aulas particulares têm duração de 1 hora e 10 minutos e são totalmente personalizadas de acordo com o perfil e os objetivos de cada aluno. A proposta é criar um ambiente de aprendizado dinâmico e envolvente, que estimule a curiosidade, o interesse e a vivência real da língua em diferentes contextos.</p>
            <p>Por meio de atividades interativas e conteúdos significativos, o aluno é incentivado a desenvolver suas habilidades de forma natural, prazerosa e eficaz. Não usamos material didático como apostila, as aulas são práticas e diversificadas com uso de materiais diversos produzidos pela professora.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
