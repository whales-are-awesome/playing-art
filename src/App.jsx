import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
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

function BookingBadge() {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [btnPhase, setBtnPhase] = useState('default'); // 'default' | 'achieve' | 'done'
  const [popperVisible, setPopperVisible] = useState(false);
  const btnRef = useRef(null);

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

  useEffect(() => {
    const onCtaVisible = () => {
      // 1. 🎉 появляется из угла кнопки
      setPopperVisible(true);

      // 2. Конфетти стреляет справа чуть позже
      setTimeout(() => {
        const rect = btnRef.current?.getBoundingClientRect();
        const x = rect ? rect.left / window.innerWidth : 0.9;
        const y = rect ? rect.top / window.innerHeight : 0.9;
        confetti({
          particleCount: 90,
          spread: 55,
          angle: 135,
          origin: { x, y },
          colors: ['#729ACD', '#E56787', '#F18C1F', '#B4B534', '#F5DC90'],
          scalar: 1.0,
        });
      }, 300);

      // 3. Поппер исчезает, кнопка трансформируется
      setTimeout(() => setPopperVisible(false), 2900);
      setTimeout(() => setBtnPhase('achieve'), 1300);
      setTimeout(() => setBtnPhase('done'), 5000);
    };
    window.addEventListener('ctaVisible', onCtaVisible);
    return () => window.removeEventListener('ctaVisible', onCtaVisible);
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
      {/* 🎉 из левого верхнего угла кнопки */}
      {popperVisible && (
        <div
          className="absolute pointer-events-none select-none z-10"
          style={{
            top: '-18px',
            left: '-18px',
            animation: 'popperBurst 2.9s cubic-bezier(0.22,1,0.36,1) forwards',
          }}
        >
          <div style={{ fontSize: '1.8rem', transform: 'scaleX(-1)' }}>🎉</div>
        </div>
      )}

      <a
        ref={btnRef}
        href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-sticker relative overflow-hidden"
        style={{
          background: btnPhase === 'default' ? '#729ACD' : '#F5DC90',
          color: btnPhase === 'default' ? '#fff' : '#1a1a1a',
          padding: '12px 20px',
          transition: 'background 0.6s cubic-bezier(0.22,1,0.36,1), color 0.4s ease, transform 0.22s ease, box-shadow 0.22s ease',
        }}
      >
        {/* Основной текст */}
        <span
          className="flex items-center gap-2 text-sm tracking-wide"
          style={{
            opacity: btnPhase !== 'achieve' ? 1 : 0,
            transform: btnPhase === 'achieve' ? 'translateY(6px) scale(0.9)' : 'translateY(0) scale(1)',
            transition: btnPhase === 'done'
              ? 'opacity 0.3s ease 0.25s, transform 0.3s ease 0.25s'
              : 'opacity 0.25s ease, transform 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          Забронировать место
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>

        {/* Ачивка */}
        <span
          className="absolute inset-0 flex items-center gap-2 px-3"
          style={{
            opacity: btnPhase === 'achieve' ? 1 : 0,
            transform: btnPhase === 'achieve' ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.9)',
            transition: btnPhase === 'achieve'
              ? 'opacity 0.3s ease 0.2s, transform 0.35s ease 0.15s'
              : 'opacity 0.2s ease, transform 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '1.3rem', lineHeight: 1, flexShrink: 0 }}>🏅</span>
          <div>
            <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, lineHeight: 1, marginBottom: '3px' }}>
              Достижение получено
            </p>
            <p style={{ fontSize: '13px', fontWeight: 900, lineHeight: 1 }}>
              Узнать всё об интенсиве
            </p>
          </div>
        </span>
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
    </div>
  );
}

export default App;
