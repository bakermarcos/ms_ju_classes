import React from 'react';
import { juliaStainedGlass, juliaWithRobot, msJuFlyer } from '../lib/images';

const Gallery = () => {
  return (
    <section id="gallery">
      <div className="container">
        <h2 className="section-title">Um Pouco do Nosso Mundo</h2>
        <div className="gallery-grid">
          <img src={juliaStainedGlass} alt="Júlia em frente a um vitral" />
          <img src={juliaWithRobot} alt="Júlia com mascote e livro" />
          <img src={msJuFlyer} alt="Material didático da Ms. Ju" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
