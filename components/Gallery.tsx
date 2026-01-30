import React from 'react';
import {
  classroomScene,
  juliaBookCover,
  juliaInBookstoreReading,
  juliaStainedGlass,
  juliaWithRobot,
  robotsTraveling,
  teacherAndKid,
  brinquedoteca,
  teaching
} from '@/lib/images';

const Gallery = () => {
  const galleryItems = [
    { src: brinquedoteca, alt: 'Ambiente de brinquedoteca da Ms. Ju' },
    { src: teaching, alt: 'Ensinando crianças em ambiente de aula' },
    { src: teacherAndKid, alt: 'Professor e criança em atividade de ensino' },
    { src: juliaInBookstoreReading, alt: 'Professora Júlia lendo em uma livraria infantil' },
    { src: juliaStainedGlass, alt: 'Júlia em frente a um vitral colorido' },
    { src: juliaWithRobot, alt: 'Júlia com mascote e livro' },
    { src: classroomScene, alt: 'Turma reunida na sala de aula da Ms. Ju' },
    { src: juliaBookCover, alt: 'Material didático produzido pela Ms. Ju' },
    { src: robotsTraveling, alt: 'Mascotes viajando com malas coloridas' },
  ];

  return (
    <section id="gallery">
      <div className="container">
        <h2 className="section-title">Um Pouco do Nosso Mundo</h2>
        <div className="gallery-grid">
          {galleryItems.map(({ src, alt }) => (
            <img
              key={src}
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
