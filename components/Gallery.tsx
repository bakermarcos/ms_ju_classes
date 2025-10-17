import React from 'react';
import classroomScene from '@/images/classroom.png';
import juliaBookCover from '@/images/julia-book.png';
import juliaInBookstoreReading from '@/images/julia-in-bookstore-reading.png';
import juliaStainedGlass from '@/images/julia-vitral.png';
import juliaWithRobot from '@/images/julia-with-robot-and-book.png';
import robotsTraveling from '@/images/robots.png';

const Gallery = () => {
  const galleryItems = [
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
            <img key={src} src={src} alt={alt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
