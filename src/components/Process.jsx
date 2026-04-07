import { useEffect, useRef, useState } from 'react';

const steps = [
  { num: '01', title: 'Погружение', desc: 'Знакомство с художником дня — его идеями, приёмами и историей', color: '#729ACD', bg: 'rgba(114,154,205,0.13)', rotate: '-2deg', speed: 0.12 },
  { num: '02', title: 'Диалог', desc: 'Обсуждение работ: каждый высказывается, каждое мнение ценно', color: '#E56787', bg: 'rgba(229,103,135,0.13)', rotate: '1.5deg', speed: -0.08 },
  { num: '03', title: 'Практика', desc: 'Акварель, акрил, коллаж, инсталляция — свобода выбора', color: '#F18C1F', bg: 'rgba(241,140,31,0.13)', rotate: '-1deg', speed: 0.04 },
  { num: '04', title: 'Команда', desc: 'Активные игры и совместные проекты', color: '#B4B534', bg: 'rgba(180,181,52,0.13)', rotate: '2deg', speed: -0.11 },
  { num: '05', title: 'Выставка', desc: 'Каждый день — шаг к финальной экспозиции авторских работ', color: '#c8a800', bg: 'rgba(245,220,144,0.30)', rotate: '-1.5deg', speed: 0.09 },
];

const caption = [
  { text: '4 часа', size: 'text-5xl md:text-7xl', weight: 'font-bold', charColors: ['#F18C1F', null, '#729ACD', '#729ACD', '#729ACD', '#729ACD'] },
  { text: 'которые меняют', size: 'text-2xl md:text-3xl', weight: 'font-medium', color: '#1a1a1a' },
  { text: 'взгляд ребёнка на мир', size: 'text-lg md:text-2xl', weight: 'font-medium', color: '#595959' },
];

function useInView(threshold = 0.2) {
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

function AnimatedCaption() {
  const [ref, visible] = useInView(0.3);
  let globalIndex = 0;

  return (
    <div ref={ref} className="mt-12 md:mt-16 text-center" style={{ lineHeight: 1.15 }}>
      {caption.map((line, li) => (
        <div key={li} className={`block ${line.weight} ${line.size}`}>
          {line.text.split('').map((char, ci) => {
            const idx = globalIndex++;
            const delay = idx * 0.028;
            const color = line.charColors?.[ci] ?? line.color;
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  color: color || 'inherit',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(60%) rotate(-5deg)',
                  transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Process() {
  const [containerRef, containerVisible] = useInView(0.1);
  const cardRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * steps[i].speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-14 relative overflow-hidden" style={{ background: '#F8F8F8' }}>
      {/* Floating shapes */}
      <div className="absolute top-12 right-16 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5.5s ease-in-out infinite', animationDelay: '0.3s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#E56787" fillOpacity="0.45"/></svg>
      </div>
      <div className="absolute top-1/2 left-8 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 7s ease-in-out infinite', animationDelay: '1.5s' }}>
        <svg width="30" height="18" viewBox="0 0 30 18" fill="none"><ellipse cx="15" cy="9" rx="15" ry="9" fill="#729ACD" fillOpacity="0.4" transform="rotate(10 15 9)"/></svg>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Sticker label */}
        <div className="mb-10 md:mb-12">
          <span
            className="sticker text-xs tracking-[0.2em] uppercase"
            style={{ background: '#F5DC90', color: '#1a1a1a', transform: 'rotate(1deg)', display: 'inline-flex' }}
          >
            Программа дня
          </span>
        </div>

        {/* Steps */}
        <div ref={containerRef}>
          {/* Desktop */}
          <div className="hidden md:flex items-start gap-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 flex-1">
                {/* Parallax wrapper — receives scroll translateY */}
                <div
                  ref={el => cardRefs.current[i] = el}
                  style={{ flex: 1, willChange: 'transform' }}
                >
                  <div
                    className="rounded-2xl p-5 border-2 relative overflow-hidden"
                    style={{
                      background: step.bg,
                      borderColor: `${step.color}40`,
                      minHeight: '200px',
                      opacity: containerVisible ? 1 : 0,
                      transform: containerVisible
                        ? `rotate(${step.rotate})`
                        : `rotate(${step.rotate}) translateY(30px)`,
                      transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, box-shadow 0.25s ease`,
                    }}
                    onMouseMove={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
                      e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
                      e.currentTarget.style.boxShadow = `4px 5px 0px ${step.color}50`;
                      e.currentTarget.style.zIndex = '10';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = `rotate(${step.rotate})`;
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.zIndex = '0';
                    }}
                  >
                    <span
                      className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none"
                      style={{ fontSize: '88px', color: step.color, opacity: 0.15, lineHeight: 1 }}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-base font-black mb-2" style={{ color: step.color }}>{step.title}</h3>
                    <p className="text-[13px] font-medium text-muted-foreground leading-relaxed pr-4">{step.desc}</p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className="flex items-center pt-5 shrink-0"
                    style={{
                      color: steps[i + 1].color,
                      opacity: containerVisible ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 0.1 + 0.2}s`,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex items-start gap-3 border-2 relative overflow-hidden"
                style={{
                  background: step.bg,
                  borderColor: `${step.color}40`,
                  opacity: containerVisible ? 1 : 0,
                  transform: containerVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
                }}
              >
                <span
                  className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '64px', color: step.color, opacity: 0.15, lineHeight: 1 }}
                >
                  {step.num}
                </span>
                <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: step.color }} />
                <div className="pr-10">
                  <h3 className="text-base font-black mb-1" style={{ color: step.color }}>{step.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimatedCaption />

      </div>
    </section>
  );
}
