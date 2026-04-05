import { useReveal } from '../hooks/useReveal';

const benefits = [
  'Смелость ошибаться',
  'Умение придумывать',
  'Навык презентовать',
  'Уверенность в идеях',
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
            <div ref={r3} className="reveal rounded-2xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&q=80"
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
                  <div key={i} className="rounded-xl px-4 py-3 border border-border bg-white">
                    <span className="text-sm font-semibold">{b}</span>
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
