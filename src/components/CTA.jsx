import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useReveal } from '../hooks/useReveal';

const details = [
  { label: '15–26 июня', bg: '#B9CFDA', color: '#1a1a1a', rotate: '-1.5deg' },
  { label: 'Ереван', bg: '#F5DC90', color: '#1a1a1a', rotate: '1deg' },
  { label: '10:00–14:00', bg: '#E56787', color: '#fff', rotate: '-1deg' },
  { label: 'Дети 7–13 лет', bg: '#B4B534', color: '#fff', rotate: '2deg' },
];

const TARGET = new Date('2026-06-15T00:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function useCountdown() {
  const calc = () => {
    const diff = TARGET - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function CTA() {
  const r1 = useReveal();
  const { days, hours, minutes, seconds } = useCountdown();
  const blockRef = useRef(null);
  const fired = useRef(false);
  const [shadowVisible, setShadowVisible] = useState(false);
  const [popperVisible, setPopperVisible] = useState(false);
  const [achievePhase, setAchievePhase] = useState(null); // null | 'in' | 'out'

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          obs.disconnect();
          setShadowVisible(true);
          setPopperVisible(true);
          // Fire confetti from bottom-left after emoji pops
          setTimeout(() => {
            confetti({
              particleCount: 90,
              spread: 55,
              angle: 55,
              origin: { x: 0.05, y: 0.95 },
              colors: ['#729ACD', '#E56787', '#F18C1F', '#B4B534', '#F5DC90'],
              scalar: 1.0,
            });
          }, 350);
          // Hide emoji
          setTimeout(() => setPopperVisible(false), 1200);
          // Show achievement
          setTimeout(() => setAchievePhase('in'), 900);
          setTimeout(() => setAchievePhase('out'), 6000);
          setTimeout(() => setAchievePhase(null), 6900);
        }
      },
      { threshold: 0.9 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-14 overflow-hidden relative">
      {/* Floating shapes */}
      <div className="absolute top-8 left-12 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 6s ease-in-out infinite', animationDelay: '0.4s' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#F5DC90" fillOpacity="0.6"/></svg>
      </div>
      <div className="absolute top-1/3 right-8 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 7.5s ease-in-out infinite', animationDelay: '1.6s' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="9,1 10.8,6.4 16.5,6.4 12,9.8 13.8,15.2 9,11.8 4.2,15.2 6,9.8 1.5,6.4 7.2,6.4" fill="#E56787" fillOpacity="0.55"/></svg>
      </div>
      <div className="absolute bottom-10 left-1/3 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5s ease-in-out infinite', animationDelay: '2.3s' }}>
        <svg width="26" height="15" viewBox="0 0 26 15" fill="none"><ellipse cx="13" cy="7.5" rx="13" ry="7.5" fill="#729ACD" fillOpacity="0.4" transform="rotate(8 13 7.5)"/></svg>
      </div>

      {/* Party popper emoji */}
      {popperVisible && (
        <div
          className="fixed bottom-8 left-8 z-[60] pointer-events-none select-none"
          style={{ fontSize: '3rem', animation: 'popperBurst 1.2s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          🎉
        </div>
      )}

      {/* Achievement toast */}
      {achievePhase && (
        <div
          className="fixed bottom-8 left-8 z-[59] pointer-events-none select-none flex items-center gap-3 rounded-2xl px-5 py-3.5"
          style={{
            background: 'white',
            boxShadow: '3px 4px 0px rgba(114,154,205,0.3)',
            border: '2px solid rgba(114,154,205,0.25)',
            animation: achievePhase === 'in'
              ? 'achieveIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards'
              : 'achieveOut 0.6s ease forwards',
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>🏅</span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase opacity-50" style={{ lineHeight: 1 }}>Достижение разблокировано</p>
            <p className="text-sm font-black text-foreground mt-0.5">Вы узнали всё об интенсиве</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div
          ref={el => { blockRef.current = el; r1.current = el; }}
          className="reveal grid md:grid-cols-2 rounded-3xl overflow-hidden"
          style={{
            boxShadow: shadowVisible ? '0px 0px 0px 8px rgba(114,154,205,0.35)' : '0 0 0 rgba(114,154,205,0)',
            transition: 'box-shadow 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >

          {/* Left — colored */}
          <div className="flex flex-col gap-8 p-10 pt-24 pb-14 md:p-14 relative overflow-hidden min-h-[220px] justify-center items-center text-center" style={{ background: '#B9CFDA' }}>
            <span
              className="sticker text-xs tracking-[0.2em] uppercase absolute top-8 left-8 md:top-10 md:left-10"
              style={{ background: 'rgba(255,255,255,0.6)', color: '#1a1a1a', transform: 'rotate(-1deg)', display: 'inline-flex' }}
            >
              Дней до старта
            </span>

            {/* Countdown */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-end justify-center gap-3 leading-none">
                <span className="font-black text-foreground" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1 }}>
                  {days}
                </span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="font-black text-foreground" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1 }}>{pad(hours)}</span>
                </div>
                <span className="font-black text-foreground opacity-40" style={{ fontSize: '1.5rem' }}>:</span>
                <div className="flex flex-col items-center">
                  <span className="font-black text-foreground" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1 }}>{pad(minutes)}</span>
                </div>
                <span className="font-black text-foreground opacity-40" style={{ fontSize: '1.5rem' }}>:</span>
                <div className="flex flex-col items-center">
                  <span className="font-black text-foreground" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1 }}>{pad(seconds)}</span>
                </div>
              </div>
            </div>

            <span
              className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(120px, 18vw, 180px)', color: 'rgba(255,255,255,0.25)', lineHeight: 1, transform: 'translate(10%, 10%)' }}
            >
              {days}
            </span>
          </div>

          {/* Right — white */}
          <div className="flex flex-col justify-between p-10 md:p-14 bg-white">
            <div>
              <h2 className="font-black mb-8" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}>
                Забронируй<br />
                <span style={{ color: '#729ACD' }}>место</span>
              </h2>

              <div className="flex flex-wrap gap-2 mb-10">
                {details.map((d) => (
                  <span
                    key={d.label}
                    className="sticker text-xs"
                    style={{ background: d.bg, color: d.color, transform: `rotate(${d.rotate})` }}
                  >
                    {d.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sticker text-white px-8 py-3.5 text-sm tracking-wide"
                style={{ background: '#729ACD' }}
              >
                Подать заявку
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <p className="text-xs text-muted-foreground pl-1">Ответим в течение дня</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
