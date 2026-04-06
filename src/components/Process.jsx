import { useReveal } from '../hooks/useReveal';

const steps = [
  { num: '01', title: 'Погружение', desc: 'Знакомство с художником дня — его идеями, приёмами и историей', color: '#729ACD', bg: 'rgba(114,154,205,0.12)' },
  { num: '02', title: 'Диалог', desc: 'Обсуждение работ: каждый высказывается, каждое мнение ценно', color: '#E56787', bg: 'rgba(229,103,135,0.12)' },
  { num: '03', title: 'Практика', desc: 'Акварель, акрил, коллаж, инсталляция — свобода выбора', color: '#F18C1F', bg: 'rgba(241,140,31,0.12)' },
  { num: '04', title: 'Команда', desc: 'Активные игры и совместные проекты', color: '#B4B534', bg: 'rgba(180,181,52,0.12)' },
  { num: '05', title: 'Выставка', desc: 'Каждый день — шаг к финальной экспозиции авторских работ', color: '#F5DC90', bg: 'rgba(245,220,144,0.25)' },
];

export default function Process() {
  const titleRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="process" className="py-24 md:py-36 px-6 md:px-14" style={{ background: '#F8F8F8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-6">
            Программа дня
          </p>
          <h2 ref={titleRef} className="reveal text-3xl md:text-5xl font-black">
            Наш день
          </h2>
        </div>

        <div ref={gridRef} className="reveal">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 md:p-6 flex md:flex-col items-start gap-4 md:gap-0"
                style={{ background: step.bg }}
              >
                {/* Circle */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 md:mb-5"
                  style={{ background: step.color }}
                >
                  <span className="text-white text-xs md:text-sm font-black">{step.num}</span>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-black mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
