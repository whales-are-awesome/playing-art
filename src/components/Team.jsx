import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const members = [
  {
    name: 'Лилия',
    role: 'Организатор и педагог',
    bio: 'Более 8 лет работаю с детьми как педагог искусства и руководитель проектов дополнительного образования, организатор детских лагерей и образовательных программ.',
    quote: '«Мне важно дать детям пространство, где они могут свободно проявляться, изобретать и раскрывать свою творческую инициативу.»',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Анастасия',
    role: 'Педагог по изобразительному искусству',
    bio: 'Художник и преподаватель с опытом работы в детских студиях. Специализируется на акварели, коллаже и смешанных техниках.',
    quote: '«Каждый ребёнок — уже художник. Моя задача — помочь ему это увидеть.»',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Мария',
    role: 'Куратор выставки',
    bio: 'Куратор и арт-менеджер. Организовывала выставки в Армении, России и Европе. Помогает детям представить свои работы профессионально.',
    quote: '«Выставка — это не финал, это начало. Начало разговора о том, кем ты хочешь быть.»',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
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
    <section id="team" className="py-20 md:py-28 px-6 md:px-14 bg-[#F8F8F8]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-4">
            Команда
          </p>
          <h2 ref={titleRef} className="reveal text-3xl md:text-5xl font-black">
            Наша команда
          </h2>
        </div>

        <div ref={cardRef} className="reveal">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
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
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Предыдущий"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="text-sm text-muted-foreground font-medium">
              {index + 1} / {members.length}
            </span>

            <button
              onClick={next}
              aria-label="Следующий"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
