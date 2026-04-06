import { useReveal } from '../hooks/useReveal';

const benefits = [
  { label: 'Смелость ошибаться', hex: '#729ACD', bg: 'rgba(114,154,205,0.12)', rotate: '-2deg' },
  { label: 'Умение придумывать', hex: '#E56787', bg: 'rgba(229,103,135,0.12)', rotate: '1.5deg' },
  { label: 'Навык презентовать', hex: '#F18C1F', bg: 'rgba(241,140,31,0.12)', rotate: '-1.5deg' },
  { label: 'Уверенность в идеях', hex: '#B4B534', bg: 'rgba(180,181,52,0.12)', rotate: '2deg' },
];

const listItems = [
  { text: 'знакомятся с приёмами и подходами современных художников', color: '#729ACD' },
  { text: 'развивают креативное и нестандартное мышление', color: '#E56787' },
  { text: 'экспериментируют с разными материалами и техниками', color: '#F18C1F' },
  { text: 'создают уникальные работы, которые отражают их взгляд на мир', color: '#B4B534' },
];

export default function About() {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          {/* Sticker label */}
          <div className="mb-6">
            <span
              className="sticker text-xs tracking-[0.2em] uppercase"
              style={{ background: '#B9CFDA', color: '#1a1a1a', transform: 'rotate(-1.5deg)', display: 'inline-flex' }}
            >
              О программе
            </span>
          </div>

          {/* Editorial heading */}
          <h2 ref={r1} className="reveal text-4xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight">
            Это <span style={{ color: '#E56787' }}>больше</span>,<br />
              чем
            {' '}кружок рисования
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: text */}
          <div ref={r2} className="reveal">
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              <p>
                Мы учим детей не просто повторять картинку. На занятиях дети обсуждают идеи, задают вопросы и ищут собственные решения.
              </p>
              <p>
                Через знакомство с современным искусством ребёнок учится смотреть на мир по-новому и смело выражать свои мысли.
              </p>
            </div>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              На интенсиве дети:
            </p>
            <div className="space-y-3">
              {listItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-[6px] w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-base font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + benefits */}
          <div>
            {/* Tilted image */}
            <div
              ref={r3}
              className="reveal mb-8"
              style={{ transform: 'rotate(-1.5deg)', transformOrigin: 'center center' }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  boxShadow: '6px 8px 0px rgba(114,154,205,0.35)',
                  border: '3px solid rgba(114,154,205,0.3)',
                }}
              >
                <img
                  src="https://media.base44.com/images/public/69c774076c93ae569fec24ce/fddb28445_.jpg"
                  alt="Дети на занятии"
                  className="w-full h-full object-cover object-center"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            {/* Scattered benefit cards */}
            <div ref={r4} className="reveal">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Ребёнок получает:
              </p>
              <div className="grid grid-cols-2 gap-3" style={{ padding: '8px' }}>
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3 border-2"
                    style={{
                      background: b.bg,
                      borderColor: b.hex,
                      transform: `rotate(${b.rotate})`,
                      transition: 'transform 0.25s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = `rotate(${b.rotate})`}
                  >
                    <span className="text-sm font-bold" style={{ color: b.hex }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
