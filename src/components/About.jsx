import { useReveal } from '../hooks/useReveal';

const benefits = [
  { label: 'Смелость ошибаться', hex: '#729ACD' },
  { label: 'Умение придумывать', hex: '#E56787' },
  { label: 'Навык презентовать', hex: '#F18C1F' },
  { label: 'Уверенность в идеях', hex: '#B4B534' },
];

const listItems = [
  'знакомятся с приёмами и подходами современных художников',
  'развивают креативное и нестандартное мышление',
  'экспериментируют с разными материалами и техниками',
  'создают уникальные работы, которые отражают их взгляд на мир',
];

export default function About() {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-4">
            О программе
          </p>
          <h2 ref={r1} className="reveal text-3xl md:text-5xl font-black leading-tight">
            Это больше,<br />чем кружок рисования
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

              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                На интенсиве дети:
              </p>
              <div className="space-y-3">
                {listItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-blue mt-1 shrink-0">—</span>
                    <span className="text-base font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image + benefits */}
          <div>
            <div ref={r3} className="reveal rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://media.base44.com/images/public/69c774076c93ae569fec24ce/fddb28445_.jpg"
                alt="Дети на занятии"
                className="w-full h-full object-cover object-top"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            <div ref={r4} className="reveal">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Вместо просто рисования ребёнок получает:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {benefits.map((b, i) => (
                  <div key={i} className="rounded-xl px-4 py-3 border border-border bg-white" style={{ borderLeft: `3px solid ${b.hex}` }}>
                    <span className="text-sm font-semibold">{b.label}</span>
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
