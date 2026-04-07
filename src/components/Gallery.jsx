import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Lightbox from './Lightbox';

const photos = [
  { src: '/images/479cc02c2_.jpg', alt: 'Дети рисуют большой холст на улице', rotate: '-2deg', gridArea: '1 / 1 / 3 / 2', pos: 'center 30%', speed: 0.04 },
  { src: '/images/5f395ed5a_.jpg', alt: 'Яркая абстрактная картина', rotate: '2.5deg', gridArea: '1 / 2 / 2 / 3', pos: 'center center', speed: 0.10 },
  { src: '/images/0100fc3a5_.jpg', alt: 'Руки ребёнка с краской', rotate: '-2deg', gridArea: '2 / 2 / 3 / 3', pos: 'center 40%', speed: 0.07 },
  { src: '/images/25da8d595_.jpg', alt: 'Дети работают вместе в студии', rotate: '1.5deg', gridArea: '1 / 3 / 2 / 4', pos: 'center 20%', speed: 0.12 },
  { src: '/images/0070e06f2_.jpg', alt: 'Дети рисуют акварелью на улице', rotate: '-3deg', gridArea: '2 / 3 / 3 / 4', pos: 'center 25%', speed: 0.06 },
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

function PolaroidPhoto({ photo, index, visible, height = '100%', onClick }) {
  const delay = index * 0.09;
  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        height: '100%',
        background: 'white',
        padding: index === 0 ? '7px 7px 24px 7px' : '6px 6px 20px 6px',
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
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        style={{ width: '100%', height, objectFit: 'cover', objectPosition: photo.pos, display: 'block' }}
        onError={e => { e.target.style.display = 'none'; }}
      />
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
    <section id="gallery" className="py-20 md:py-28 px-6 md:px-14 overflow-hidden">
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
          {/* Desktop */}
          <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '240px 240px' }}>
            {photos.map((photo, i) => (
              <div key={i} style={{ gridArea: photo.gridArea, position: 'relative' }}>
                {/* Parallax wrapper */}
                <div ref={el => photoRefs.current[i] = el} style={{ height: '100%', willChange: 'transform' }}>
                  <PolaroidPhoto photo={photo} index={i} visible={visible} height="100%" onClick={() => setLightboxIndex(i)} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {photos.map((photo, i) => (
              <div key={i} className={i === 0 ? 'col-span-2' : ''}>
                <PolaroidPhoto photo={photo} index={i} visible={visible} height={i === 0 ? '220px' : '150px'} onClick={() => setLightboxIndex(i)} />
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
