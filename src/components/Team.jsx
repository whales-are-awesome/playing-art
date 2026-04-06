import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const members = [
  {
    name: 'Лилия',
    role: 'Организатор и педагог',
    bio: 'Более 8 лет работаю с детьми как педагог искусства и руководитель проектов дополнительного образования, организатор детских лагерей и образовательных программ.',
    quote: 'Мне важно дать детям пространство, где они могут свободно проявляться, изобретать и раскрывать свою творческую инициативу.',
    photo: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/ebe3f81d4_.jpg',
    bgColor: '#B9CFDA',
    imgPos: 'center top',
  },
  {
    name: 'Валерия',
    role: 'Автор идеи и методист',
    bio: 'Художница. Соединяю арт-терапию, живую историю искусства и практику рисования. Для меня главное — зажечь в ребёнке искренний интерес, а не научить копировать.',
    quote: 'Творчество — это не про «правильно» или «красиво», а про себя, свободу и удовольствие.',
    photo: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/e80abfcf8_.jpg',
    bgColor: '#F5DC90',
    imgPos: 'center top',
  },
  {
    name: 'Ксения',
    role: 'Координатор',
    bio: 'Решаю все организационные вопросы, договариваюсь с партнёрами и площадками — чтобы всё прошло гладко для детей и родителей.',
    quote: 'Моя задача — чтобы все детали были на своём месте и ничто не мешало творческому процессу.',
    photo: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/843e77d58_.jpg',
    bgColor: '#F18C1F22',
    imgPos: 'center top',
  },
];

export default function Team() {
  const [index, setIndex] = useState(0);
  const titleRef = useReveal();
  const cardRef = useReveal();

  const prev = () => setIndex((i) => (i - 1 + members.length) % members.length);
  const next = () => setIndex((i) => (i + 1) % members.length);

  const member = members[index];

  return (
    <section id="team" className="py-20 md:py-28 px-6 md:px-20 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-4">
            Команда
          </p>
          <h2 ref={titleRef} className="reveal text-3xl md:text-5xl font-black">
            Наша команда
          </h2>
        </div>

        <div ref={cardRef} className="reveal">
          {/* Card with side arrows on desktop */}
          <div className="relative md:px-16">
            {/* Prev arrow — left side (desktop) */}
            <button
              onClick={prev}
              aria-label="Предыдущий"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border items-center justify-center hover:border-blue transition-colors bg-white z-10 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Photo */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ background: member.bgColor, minHeight: '420px' }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover absolute inset-0"
                  style={{ objectPosition: member.imgPos }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Info */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue mb-2">
                  {member.role}
                </p>
                <h3 className="text-3xl md:text-4xl font-black mb-6">
                  {member.name}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">{member.bio}</p>
                <blockquote className="border-l-2 border-blue pl-5 text-base md:text-lg font-medium leading-relaxed">
                  {member.quote}
                </blockquote>

                {/* Mobile controls */}
                <div className="flex items-center gap-4 mt-8 md:hidden">
                  <button onClick={prev} aria-label="Предыдущий" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <span className="text-sm text-muted-foreground font-medium">{index + 1} / {members.length}</span>
                  <button onClick={next} aria-label="Следующий" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Next arrow — right side (desktop) */}
            <button
              onClick={next}
              aria-label="Следующий"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-border items-center justify-center hover:border-blue transition-colors bg-white z-10 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Desktop counter */}
          <div className="hidden md:flex items-center gap-2 mt-8 md:px-16">
            <span className="text-sm text-muted-foreground font-medium">{index + 1} / {members.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
