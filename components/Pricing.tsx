import React from 'react';
import { useSiteConfig } from '@/lib/useSiteConfig';
import PlanCard from './PlanCard';

const Pricing = () => {
  const { kidsPlans, adultPlans } = useSiteConfig();

  return (
    <section id="planos" className="section section-tinted">
      <div className="container">
        <header className="section-head" data-reveal="out">
          <p className="eyebrow">Planos</p>
          <h2 className="section-title">Escolha o ritmo que cabe na sua rotina</h2>
        </header>

        <h3 className="group-title" data-reveal="out">Para crianças</h3>
        <div className="plan-grid">
          {kidsPlans.map((plan) => (
            <PlanCard key={`${plan.title}-${plan.modality}`} {...plan} />
          ))}
        </div>

        <h3 className="group-title" data-reveal="out">Para adultos</h3>
        <p className="group-subtitle" data-reveal="out">
          Para quem precisa destravar a conversação, viajar ou usar o inglês no trabalho.
        </p>
        <div className="plan-grid plan-grid-adults">
          {adultPlans.map((plan) => (
            <PlanCard key={`${plan.title}-${plan.modality}`} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
