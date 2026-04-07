import { useEffect, useRef } from 'react';

const stickers = [
  { label: '15–26 июня', bg: '#B9CFDA', color: '#1a1a1a', rotate: '-2deg' },
  { label: 'Ереван', bg: '#F5DC90', color: '#1a1a1a', rotate: '1.5deg' },
  { label: '10:00–14:00', bg: '#E56787', color: '#fff', rotate: '-1.5deg' },
  { label: 'Дети 7–13 лет', bg: '#B4B534', color: '#fff', rotate: '2deg' },
];

const floats = [
  {
    style: { top: '18%', right: '12%', width: 56, height: 56, animation: 'floatTiny 5s ease-in-out infinite', animationDelay: '0s' },
    svg: <svg viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#E56787" fillOpacity="0.7" /></svg>,
  },
  {
    style: { top: '42%', right: '6%', width: 36, height: 36, animation: 'floatTiny 7s ease-in-out infinite', animationDelay: '1.2s' },
    svg: <svg viewBox="0 0 36 36" fill="none"><rect x="4" y="4" width="28" height="28" rx="6" fill="#F18C1F" fillOpacity="0.75" transform="rotate(15 18 18)" /></svg>,
  },
  {
    style: { bottom: '28%', right: '22%', width: 28, height: 28, animation: 'floatTiny 6s ease-in-out infinite', animationDelay: '0.6s' },
    svg: <svg viewBox="0 0 28 28" fill="none"><polygon points="14,2 17,11 26,11 19,17 22,26 14,20 6,26 9,17 2,11 11,11" fill="#B4B534" fillOpacity="0.8" /></svg>,
  },
  {
    style: { top: '30%', left: '3%', width: 44, height: 44, animation: 'floatTiny 8s ease-in-out infinite', animationDelay: '2s' },
    svg: <svg viewBox="0 0 44 44" fill="none"><ellipse cx="22" cy="22" rx="22" ry="14" fill="#F5DC90" fillOpacity="0.85" transform="rotate(-20 22 22)" /></svg>,
  },
  {
    style: { bottom: '35%', left: '8%', width: 22, height: 22, animation: 'floatTiny 4.5s ease-in-out infinite', animationDelay: '1.8s' },
    svg: <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#729ACD" fillOpacity="0.6" /></svg>,
  },
];

// Per-element scroll parallax speeds (positive = stays behind, negative = races ahead)
const ELEMENT_SPEEDS = {
  subtitle: 0.18,
  titleFirst: 0.22,
  titleSecond: 0.19,
  stickers: 0.18,
};

export default function Hero() {
  const word = 'Играем';
  const blob1 = useRef(null);
  const blob2 = useRef(null);
  const blob3 = useRef(null);
  const contentRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);

  // Scroll parallax refs for each element
  const subtitleWrapRef = useRef(null);
  const titleFirstWrapRef = useRef(null);
  const titleSecondWrapRef = useRef(null);
  const stickersWrapRef = useRef(null);

  useEffect(() => {
    const onMouse = (e) => {
      mx.current = (e.clientX / window.innerWidth - 0.5);
      my.current = (e.clientY / window.innerHeight - 0.5);
      if (blob1.current) blob1.current.style.transform = `translate(${mx.current * 50}px, ${my.current * 35}px)`;
      if (blob2.current) blob2.current.style.transform = `translate(${mx.current * -35}px, ${my.current * 45}px)`;
      if (blob3.current) blob3.current.style.transform = `translate(${mx.current * 40}px, ${my.current * -28}px)`;
      if (contentRef.current) contentRef.current.style.transform = `translate(${mx.current * -6}px, ${my.current * -4}px)`;
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  useEffect(() => {
    const elements = [
      { ref: subtitleWrapRef, speed: ELEMENT_SPEEDS.subtitle },
      { ref: titleFirstWrapRef, speed: ELEMENT_SPEEDS.titleFirst },
      { ref: titleSecondWrapRef, speed: ELEMENT_SPEEDS.titleSecond },
      { ref: stickersWrapRef, speed: ELEMENT_SPEEDS.stickers },
    ];
    const onScroll = () => {
      const scrollY = window.scrollY;
      elements.forEach(({ ref, speed }) => {
        if (!ref.current) return;
        ref.current.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-14">
      {/* Background blobs — mouse parallax */}
      <div ref={blob1} className="absolute top-1/4 right-8 md:right-24 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl" style={{ background: 'rgba(114,154,205,0.40)', animation: 'floatSlow 6s ease-in-out infinite' }} />
      </div>
      <div ref={blob2} className="absolute bottom-1/3 left-0 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="w-52 md:w-72 h-52 md:h-72 rounded-full blur-3xl" style={{ background: 'rgba(245,220,144,0.45)', animation: 'floatY 7s ease-in-out infinite', animationDelay: '2s' }} />
      </div>
      <div ref={blob3} className="absolute top-2/3 right-1/3 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="w-40 md:w-56 h-40 md:h-56 rounded-full blur-3xl" style={{ background: 'rgba(229,103,135,0.30)', animation: 'floatSlow 5s ease-in-out infinite', animationDelay: '1s' }} />
      </div>

      {/* Floating shapes */}
      {floats.map((f, i) => (
        <div key={i} className="absolute pointer-events-none hidden md:block" style={f.style}>
          {f.svg}
        </div>
      ))}

      {/* Content — mouse parallax wrapper */}
      <div ref={contentRef} className="relative z-10 max-w-4xl" style={{ willChange: 'transform' }}>

        {/* Subtitle — own parallax speed */}
        <div ref={subtitleWrapRef} style={{ willChange: 'transform' }}>
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-blue mb-8 md:mb-12"
            style={{ animation: 'fadeInUp 0.7s ease both', animationDelay: '0.1s', opacity: 0 }}
          >
            Детский арт-интенсив
          </p>
        </div>

        <h1 className="font-inter text-[40px] sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-foreground">
          {/* "Играем" — own parallax speed */}
          <div ref={titleFirstWrapRef} style={{ display: 'inline-block', willChange: 'transform' }}>
            <span className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
              {word.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: `letterIn 0.55s cubic-bezier(0.22,1,0.36,1) both`,
                    animationDelay: `${0.2 + i * 0.055}s`,
                    opacity: 0,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
          <br />
          {/* "в искусство" — own parallax speed */}
          <div ref={titleSecondWrapRef} style={{ display: 'inline-block', willChange: 'transform' }}>
            <span
              className="text-blue inline-block whitespace-nowrap"
              style={{ animation: 'fadeInUp 0.7s ease both', animationDelay: '0.65s', opacity: 0 }}
            >
              в искусство
            </span>
          </div>
        </h1>

        {/* Stickers — own parallax speed */}
        <div ref={stickersWrapRef} style={{ willChange: 'transform' }}>
          <div
            className="mt-10 md:mt-14 flex flex-wrap gap-3"
            style={{ animation: 'fadeInUp 0.6s ease both', animationDelay: '0.85s', opacity: 0 }}
          >
            {stickers.map((s) => (
              <span
                key={s.label}
                className="sticker"
                style={{ background: s.bg, color: s.color, transform: `rotate(${s.rotate})` }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-blue transition-colors"
          style={{ animation: 'fadeInUp 0.6s ease 1.1s both, scrollFloat 2.8s ease-in-out 1.7s infinite' }}
        >
          <span className="text-xs tracking-widest uppercase">подробнее</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
