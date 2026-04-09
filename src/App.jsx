import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Exhibition from './components/Exhibition';
import Team from './components/Team';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function BookingBadge() {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
      const footer = document.getElementById('contacts');
      if (footer && window.innerWidth < 640) {
        const rect = footer.getBoundingClientRect();
        setNearFooter(rect.top < window.innerHeight * 0.5);
      } else {
        setNearFooter(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed right-6 z-50"
      style={{
        bottom: nearFooter ? '90px' : '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), bottom 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-sticker px-5 py-3 text-white text-sm tracking-wide"
        style={{ background: '#729ACD' }}
      >
        Забронировать место
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </a>
    </div>
  );
}

function useRipple() {
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest('.btn-sticker');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

function App() {
  useRipple();
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Exhibition />
        <Team />
        <Gallery />
        <CTA />
      </main>
      <Footer />
      <BookingBadge />
      <CustomCursor />
    </div>
  );
}

export default App;
