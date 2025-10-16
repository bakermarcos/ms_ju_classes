import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import AdultPricing from './components/AdultPricing';
import Info from './components/Info';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Pricing />
        <AdultPricing />
        <Info />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
