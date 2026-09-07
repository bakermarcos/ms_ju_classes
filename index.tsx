import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import OnlineKit from './components/OnlineKit';
import MasterClass from './components/MasterClass';
import Info from './components/Info';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { SiteConfigContext, useRemoteSiteConfig } from './lib/useSiteConfig';
import { useReveal } from './lib/useReveal';
import { initAnalytics } from './lib/analytics';
import { useCtaTracking } from './lib/useCtaTracking';

function App() {
  const config = useRemoteSiteConfig();
  useReveal();
  useCtaTracking();

  return (
    <SiteConfigContext.Provider value={config}>
      <Header />
      <main>
        <Hero />
        <About />
        <Pricing />
        <OnlineKit />
        <MasterClass />
        <Info />
        <Gallery />
      </main>
      <Footer />
    </SiteConfigContext.Provider>
  );
}

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root não encontrado.');
ReactDOM.createRoot(container).render(<App />);

// Depois do primeiro paint, para não disputar banda com a renderização.
window.addEventListener('load', () => { void initAnalytics(); });
