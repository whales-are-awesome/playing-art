import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Lightbox from './Lightbox';

const photos = [
  { src: '/images/kak_bilo_1.jpg',  alt: 'Дети рисуют',        rotate: '-2deg',  speed: 0.04 },
  { src: '/images/kak_bilo_2.jpeg', alt: 'Занятие в студии',   rotate: '2.5deg', speed: 0.05 },
  { src: '/images/kak_bilo_3.jpeg', alt: 'Творческий процесс', rotate: '-1.5deg', speed: 0.10 },
  { src: '/images/kak_bilo_4.jpeg', alt: 'Дети на интенсиве',  rotate: '1.5deg', speed: 0.08 },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function PolaroidPhoto({ photo, index, visible, onClick }) {
  const delay = index * 0.09;
  return (
    <div>
        <div
            role="button"
            onClick={onClick}
            style={{
                display: 'inline-block',
                background: 'white',
                padding: '6px 6px 20px 6px',
                boxShadow: '3px 6px 18px rgba(0,0,0,0.11)',
                opacity: visible ? 1 : 0,
                transform: visible ? `rotate(${photo.rotate})` : `rotate(${photo.rotate}) translateY(28px)`,
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, box-shadow 0.3s ease`,
                cursor: 'zoom-in',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)';
                e.currentTarget.style.boxShadow = '6px 14px 30px rgba(0,0,0,0.15)';
                e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                e.currentTarget.style.transform = `rotate(${photo.rotate})`;
                e.currentTarget.style.boxShadow = '3px 6px 18px rgba(0,0,0,0.11)';
                e.currentTarget.style.zIndex = 'auto';
            }}
        >
            <div className="overflow-hidden">
                <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    style={{ width: 'auto', height: '300px', display: 'block', transform: index === 0 && 'scale(1.3)' }}
                    onError={e => { e.target.style.display = 'none'; }}
                />
            </div>
        </div>
    </div>
  );
}

export default function Gallery() {
  const [containerRef, visible] = useInView(0.1);
  const titleRef = useReveal();
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
    <section id="gallery" className="py-10 md:py-28 px-6 md:px-14 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-12 left-8 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 6s ease-in-out infinite', animationDelay: '0.5s' }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><polygon points="13,1 15.5,9 24,9 17.5,14.5 20,22.5 13,17.5 6,22.5 8.5,14.5 2,9 10.5,9" fill="#F18C1F" fillOpacity="0.5"/></svg>
      </div>
      <div className="absolute bottom-16 right-10 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 8s ease-in-out infinite', animationDelay: '1.8s' }}>
        <svg width="36" height="20" viewBox="0 0 36 20" fill="none"><ellipse cx="18" cy="10" rx="18" ry="10" fill="#E56787" fillOpacity="0.4" transform="rotate(-12 18 10)"/></svg>
      </div>
      <div className="absolute top-1/2 right-1/4 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5.5s ease-in-out infinite', animationDelay: '0.9s' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#B4B534" fillOpacity="0.55"/></svg>
      </div>

      <div className="max-w-7xl mx-auto">

        <div className="mb-10 md:mb-14">
          <div className="mb-5">
            <span className="sticker text-xs tracking-[0.2em] uppercase" style={{ background: '#FFE0C8', color: '#1a1a1a', transform: 'rotate(1.5deg)', display: 'inline-flex' }}>
              Как было
            </span>
          </div>
          <h2 ref={titleRef} className="reveal font-black">
            <span className="block text-3xl md:text-4xl text-foreground" style={{ lineHeight: 1, marginBottom: '-4px' }}>В прошлом</span>
            <span className="block text-5xl md:text-7xl" style={{ color: '#F18C1F', lineHeight: 1 }}>году</span>
          </h2>
        </div>

        <div ref={containerRef}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {photos.map((photo, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div ref={el => photoRefs.current[i] = el} style={{ willChange: 'transform' }}>
                  <PolaroidPhoto photo={photo} index={i} visible={visible} onClick={() => setLightboxIndex(i)} />
                </div>
              </div>
            ))}
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
