import React from 'react';
import {
  brinquedoteca,
  classroomScene,
  juliaBookCover,
  juliaInBookstoreReading,
  juliaStainedGlass,
  juliaWithRobot,
  robotsTraveling,
  teacherAndKid,
  teaching,
} from '@/lib/images';

const galleryItems = [
  { src: brinquedoteca, alt: 'Ambiente de brinquedoteca da Ms. Ju' },
  { src: teaching, alt: 'Ensinando crianças em ambiente de aula' },
  { src: teacherAndKid, alt: 'Professora e criança em atividade de ensino' },
  { src: juliaInBookstoreReading, alt: 'Professora Júlia lendo em uma livraria infantil' },
  { src: juliaStainedGlass, alt: 'Júlia em frente a um vitral colorido' },
  { src: juliaWithRobot, alt: 'Júlia com mascote e livro' },
  { src: classroomScene, alt: 'Turma reunida na sala de aula da Ms. Ju' },
  { src: juliaBookCover, alt: 'Material didático produzido pela Ms. Ju' },
  { src: robotsTraveling, alt: 'Mascotes viajando com malas coloridas' },
];

const Gallery = () => (
  <section id="galeria" className="section section-tinted">
    <div className="container">
      <header className="section-head" data-reveal="out">
        <p className="eyebrow">Bastidores</p>
        <h2 className="section-title">Um pouco do nosso mundo</h2>
      </header>

      <div className="gallery-grid">
        {galleryItems.map(({ src, alt }) => (
          <figure key={src} data-reveal="out">
            <img src={src} alt={alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
