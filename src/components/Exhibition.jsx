import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Lightbox from './Lightbox';

const items = [
  { text: 'первый опыт публичного признания', bg: 'rgba(114,154,205,0.15)', color: '#729ACD', rotate: '-2deg' },
  { text: 'развитие уверенности в себе', bg: 'rgba(229,103,135,0.15)', color: '#E56787', rotate: '1.5deg' },
  { text: 'гордость за собственный результат', bg: 'rgba(180,181,52,0.15)', color: '#B4B534', rotate: '-1deg' },
];

const photos = [
  { src: '/images/afb547c3c_.jpg', alt: 'Дети у своей картины на выставке', pos: 'center 20%', rotate: '-2.5deg', gridArea: '1 / 1 / 3 / 2', speed: 0.05 },
  { src: '/images/0d5cac379_.jpg', alt: 'Посетители рассматривают работы', pos: 'center 60%', rotate: '2deg', gridArea: '1 / 2 / 2 / 3', speed: 0.04 },
  { src: '/images/5df452749_1.jpg', alt: 'Ребёнок с папой смотрит на картину', pos: 'center 42%', rotate: '-1.5deg', gridArea: '2 / 2 / 3 / 3', speed: 0.13 },
];

export default function Exhibition() {
  const textRef = useReveal();
  const imgRef = useReveal();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const photoRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * photos[i].speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-14 overflow-hidden relative">
      {/* Decorative shapes */}
      <div className="absolute top-1/4 right-6 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 6s ease-in-out infinite' }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><polygon points="18,2 21,13 32,13 23,20 27,31 18,24 9,31 13,20 4,13 15,13" fill="#E56787" fillOpacity="0.6"/></svg>
      </div>
      <div className="absolute bottom-1/3 left-4 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 8s ease-in-out infinite', animationDelay: '1.5s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#F5DC90" fillOpacity="0.8"/></svg>
      </div>
      <div className="absolute top-2/3 right-1/4 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5s ease-in-out infinite', animationDelay: '0.8s' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="3" fill="#729ACD" fillOpacity="0.7" transform="rotate(20 9 9)"/></svg>
      </div>
      <div className="absolute top-10 left-1/4 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 7s ease-in-out infinite', animationDelay: '2.1s' }}>
        <svg width="30" height="17" viewBox="0 0 30 17" fill="none"><ellipse cx="15" cy="8.5" rx="15" ry="8.5" fill="#B4B534" fillOpacity="0.45" transform="rotate(-10 15 8.5)"/></svg>
      </div>
      <div className="absolute bottom-12 right-12 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5.5s ease-in-out infinite', animationDelay: '0.3s' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#F18C1F" fillOpacity="0.55"/></svg>
      </div>

      <div style={{ maxWidth: '74rem' }} className="mx-auto relative z-10">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Polaroid photos */}
          <div ref={imgRef} className="reveal">
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px' }}
            >
              {photos.map((p, i) => (
                <div key={i} style={{ gridArea: p.gridArea, position: 'relative' }}>
                  {/* Parallax wrapper */}
                  <div
                    ref={el => photoRefs.current[i] = el}
                    style={{ height: '100%', willChange: 'transform' }}
                  >
                    <div
                      role="button"
                      onClick={() => setLightboxIndex(i)}
                      style={{
                        height: '100%',
                        background: 'white',
                        padding: i === 0 ? '7px 7px 22px 7px' : '6px 6px 14px 6px',
                        boxShadow: '3px 6px 18px rgba(0,0,0,0.12)',
                        transform: `rotate(${p.rotate})`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'zoom-in',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)';
                        e.currentTarget.style.boxShadow = '6px 12px 28px rgba(0,0,0,0.16)';
                        e.currentTarget.style.zIndex = '10';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = `rotate(${p.rotate})`;
                        e.currentTarget.style.boxShadow = '3px 6px 18px rgba(0,0,0,0.12)';
                        e.currentTarget.style.zIndex = 'auto';
                      }}
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: i === 0 ? '400px' : 'auto',
                          objectFit: 'cover',
                          objectPosition: p.pos,
                          display: 'block',
                        }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="reveal">
            <div className="mb-5">
              <span
                className="sticker text-xs tracking-[0.2em] uppercase"
                style={{ background: '#B9CFDA', color: '#1a1a1a', transform: 'rotate(-1deg)', display: 'inline-flex' }}
              >
                Финал интенсива
              </span>
            </div>

            <h2 className="font-black mb-8">
              <span className="block text-3xl md:text-4xl text-foreground" style={{ lineHeight: 1, marginBottom: '-4px' }}>Настоящая</span>
              <span className="block text-5xl md:text-7xl" style={{ color: '#729ACD', lineHeight: 1 }}>выставка</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              Работы детей будут представлены<br />на настоящей выставке.
            </p>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Для ребёнка это:
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex self-start rounded-xl px-4 py-2.5 border-2 text-sm font-semibold"
                  style={{
                    background: item.bg,
                    borderColor: item.color,
                    color: item.color,
                    transform: `rotate(${item.rotate})`,
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = `rotate(${item.rotate})`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + photos.length) % photos.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % photos.length)}
        />
      )}
    </section>
  );
}
