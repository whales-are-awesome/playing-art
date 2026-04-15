import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';

const detailStyles = [
  { bg: '#B9CFDA', color: '#1a1a1a', rotate: '-1.5deg' },
  { bg: '#F5DC90', color: '#1a1a1a', rotate: '1deg' },
  { bg: '#E56787', color: '#fff', rotate: '-1deg' },
  { bg: '#B4B534', color: '#fff', rotate: '2deg' },
];

export default function CTA() {
  const { t } = useLang();
  const details = t.cta.details.map((label, i) => ({ label, ...detailStyles[i] }));

  const blockRef = useRef(null);
  const fired = useRef(false);
  const [shadowVisible, setShadowVisible] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const revealObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          revealObs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    revealObs.observe(el);

    const rewardThreshold = window.innerWidth < 640 ? 0.5 : 0.9;
    const rewardObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          rewardObs.disconnect();
          setShadowVisible(true);
          window.dispatchEvent(new CustomEvent('ctaVisible'));
        }
      },
      { threshold: rewardThreshold }
    );
    rewardObs.observe(el);

    return () => { revealObs.disconnect(); rewardObs.disconnect(); };
  }, []);

  return (
    <section id="pricing" className="py-10 md:py-28 px-6 md:px-14 overflow-hidden relative">
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

      <div className="max-w-6xl mx-auto">
        <div
          ref={blockRef}
          className="reveal grid md:grid-cols-2 rounded-3xl overflow-hidden"
          style={{
            boxShadow: shadowVisible ? '6px 8px 0px rgba(114,154,205,0.35)' : '0 0 0 rgba(114,154,205,0)',
            transition: 'box-shadow 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >

          {/* Left — pricing */}
          <div className="flex flex-col justify-between p-10 md:p-14 relative overflow-hidden" style={{ background: '#B9CFDA' }}>
            <span
              className="sticker text-xs tracking-[0.2em] uppercase self-start"
              style={{ background: 'rgba(255,255,255,0.6)', color: '#1a1a1a', transform: 'rotate(-1deg)', display: 'inline-flex' }}
            >
              {t.cta.sectionLabel}
            </span>

            <div className="flex flex-col gap-6 my-8 relative z-10">

              {/* Full intensive */}
              <div
                className="rounded-2xl p-5 relative"
                style={{ background: 'rgba(255,255,255,0.55)', border: '2px solid rgba(255,255,255,0.8)', transform: 'rotate(-1deg)' }}
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-2">{t.cta.fullLabel}</p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="font-black text-foreground"
                    style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', lineHeight: 1 }}
                  >
                    100 000 ֏
                  </span>
                  <span
                    className="font-bold opacity-40 line-through"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
                  >
                    120 000 ֏
                  </span>
                </div>
                <span
                  className="absolute -top-3 -right-2 sticker text-[10px] tracking-[0.1em] uppercase"
                  style={{ background: '#E56787', color: '#fff', transform: 'rotate(3deg)', padding: '4px 10px' }}
                >
                  −17%
                </span>
              </div>

              {/* One week */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.35)', border: '2px solid rgba(255,255,255,0.6)', transform: 'rotate(1deg)' }}
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-2">{t.cta.weekLabel}</p>
                <span
                  className="font-black text-foreground"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1 }}
                >
                  63 000 ֏
                </span>
              </div>
            </div>

            {/* Decorative */}
            <span
              className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(90px, 14vw, 140px)', color: 'rgba(255,255,255,0.2)', lineHeight: 1, transform: 'translate(8%, 12%)' }}
            >
              ֏
            </span>
          </div>

          {/* Right — white */}
          <div className="flex flex-col justify-between p-10 md:p-14 bg-white">
            <div>
              <h2 className="font-black mb-8" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}>
                {t.cta.headingLine1}<br />
                <span style={{ color: '#729ACD' }}>{t.cta.headingLine2}</span>
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
                {t.cta.apply}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <p className="text-xs text-muted-foreground pl-1">{t.cta.responseTime}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
