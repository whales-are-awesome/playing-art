import { useReveal } from '../hooks/useReveal';

const steps = [
  { num: '01', title: 'Погружение', desc: 'Знакомство с художником дня — его идеями, приёмами и историей', color: '#729ACD' },
  { num: '02', title: 'Диалог', desc: 'Обсуждение работ: каждый высказывается, каждое мнение ценно', color: '#E56787' },
  { num: '03', title: 'Практика', desc: 'Акварель, акрил, коллаж, инсталляция — свобода выбора', color: '#F18C1F' },
  { num: '04', title: 'Команда', desc: 'Активные игры и совместные проекты', color: '#B4B534' },
  { num: '05', title: 'Выставка', desc: 'Каждый день — шаг к финальной экспозиции авторских работ', color: '#F5DC90' },
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

        <div ref={gridRef} className="reveal relative">
          {/* Horizontal connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-0">
            {steps.map((step, i) => (
              <div key={i} className="relative flex md:flex-col items-start md:items-start gap-5 md:gap-0 pb-8 md:pb-0 md:pr-6">
                {/* Vertical connector line (mobile only) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute left-4 top-10 w-px bg-border" style={{ height: 'calc(100% - 2rem)' }} />
                )}

                {/* Circle */}
                <div
                  className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: step.color }}
                >
                  <span className="text-white text-[10px] md:text-xs font-bold">{step.num}</span>
                </div>

                <div className="pt-0.5">
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
