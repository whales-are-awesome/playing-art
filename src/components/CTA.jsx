import { useReveal } from '../hooks/useReveal';

const details = [
  { label: '15–26 июня', bg: '#B9CFDA', color: '#1a1a1a', rotate: '-1.5deg' },
  { label: 'Ереван', bg: '#F5DC90', color: '#1a1a1a', rotate: '1deg' },
  { label: '10:00–14:00', bg: '#E56787', color: '#fff', rotate: '-1deg' },
  { label: 'Дети 7–13 лет', bg: '#B4B534', color: '#fff', rotate: '2deg' },
];

export default function CTA() {
  const r1 = useReveal();

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-14 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={r1} className="reveal grid md:grid-cols-2 rounded-3xl overflow-hidden" style={{ boxShadow: '6px 8px 0px rgba(114,154,205,0.3)' }}>

          {/* Left — colored */}
          <div className="flex flex-col gap-10 p-10 md:p-14 relative overflow-hidden min-h-[220px]" style={{ background: '#B9CFDA' }}>
            <span
              className="sticker text-xs tracking-[0.2em] uppercase self-start"
              style={{ background: 'rgba(255,255,255,0.6)', color: '#1a1a1a', transform: 'rotate(-1deg)', display: 'inline-flex' }}
            >
              Присоединяйтесь
            </span>

            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-50 mb-2">дней творчества</p>
              <p className="font-black text-foreground" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1 }}>
                десять<br />дней
              </p>
            </div>

            {/* Decorative number */}
            <span
              className="absolute right-0 bottom-0 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(120px, 18vw, 180px)', color: 'rgba(255,255,255,0.3)', lineHeight: 1, transform: 'translate(10%, 10%)' }}
            >
              10
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
