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
    dotColor: '#729ACD',
    imgPos: '0 60%',
  },
  {
    name: 'Валерия',
    role: 'Автор идеи и методист',
    bio: 'Художница. Соединяю арт-терапию, живую историю искусства и практику рисования. Для меня главное — зажечь в ребёнке искренний интерес, а не научить копировать.',
    quote: 'Творчество — это не про «правильно» или «красиво», а про себя, свободу и удовольствие.',
    photo: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/e80abfcf8_.jpg',
    bgColor: '#F5DC90',
    dotColor: '#c8a800',
      imgPos: '0 60%',
  },
  {
    name: 'Ксения',
    role: 'Координатор',
    bio: 'Решаю все организационные вопросы, договариваюсь с партнёрами и площадками — чтобы всё прошло гладко для детей и родителей.',
    quote: 'Моя задача — чтобы все детали были на своём месте и ничто не мешало творческому процессу.',
    photo: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/843e77d58_.jpg',
    bgColor: '#FFE0C8',
    dotColor: '#F18C1F',
    imgPos: '0 80%',
  },
];

export default function Team() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [dir, setDir] = useState(1);
  const titleRef = useReveal();
  const cardRef = useReveal();

  const switchTo = (newIndex, direction) => {
    setDir(direction);
    setFading(true);
    setTimeout(() => {
      setIndex(newIndex);
      setFading(false);
    }, 220);
  };

  const prev = () => switchTo((index - 1 + members.length) % members.length, -1);
  const next = () => switchTo((index + 1) % members.length, 1);

  const member = members[index];

  return (
    <section id="team" className="py-12 md:py-16 px-6 md:px-14 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span
            className="sticker text-xs tracking-[0.2em] uppercase"
            style={{ background: '#E56787', color: '#fff', transform: 'rotate(-1deg)', display: 'inline-flex' }}
          >
            Команда
          </span>
        </div>

        {/* Card */}
        <div ref={cardRef} className="reveal">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch">

            {/* Photo */}
            <div
              className="rounded-2xl overflow-hidden min-h-[280px] md:min-h-[420px]"
              style={{
                background: member.bgColor,
                position: 'relative',
                outline: `6px solid ${member.bgColor}`,
                outlineOffset: '4px',
                transition: 'outline-color 0.5s ease, background 0.5s ease',
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover absolute inset-0"
                style={{
                  objectPosition: member.imgPos,
                  opacity: fading ? 0 : 1,
                  transform: fading ? 'scale(1.04)' : 'scale(1)',
                  transition: `opacity ${fading ? '0.25s' : '0.5s'} ease, transform ${fading ? '0.25s' : '0.5s'} ease`,
                }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Info — outer wrapper, not animated */}
            <div className="flex flex-col md:min-h-[442px]">
              {/* Animated content */}
              <div
                style={{
                  opacity: fading ? 0 : 1,
                  transform: fading ? `translateX(${dir * 20}px)` : 'translateX(0)',
                  transition: `opacity ${fading ? '0.2s' : '0.35s'} cubic-bezier(0.22,1,0.36,1), transform ${fading ? '0.2s' : '0.35s'} cubic-bezier(0.22,1,0.36,1)`,
                }}
              >
                {/* Role sticker */}
                <div className="mb-3 w-fit">
                  <span
                    className="sticker text-xs tracking-[0.15em] uppercase"
                    style={{
                      background: member.bgColor,
                      color: '#1a1a1a',
                      transform: 'rotate(1deg)',
                      display: 'inline-flex',
                      transition: 'background 0.4s ease',
                    }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Big name */}
                <h3
                  className="font-black mb-6 leading-none"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                >
                  {member.name}
                </h3>

                <p className="text-base text-muted-foreground leading-relaxed mb-6">{member.bio}</p>

                {/* Quote — big, no border */}
                <p className="text-lg md:text-xl font-semibold leading-snug mb-10" style={{ color: member.dotColor }}>
                  «{member.quote}»
                </p>
              </div>

              {/* Controls — separate, never animated */}
              <div className="flex items-center gap-5 mt-auto">
                <button onClick={prev} aria-label="Предыдущий" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  {members.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? '24px' : '8px',
                        height: '8px',
                        background: i === index ? m.dotColor : '#d0d0d0',
                      }}
                      aria-label={m.name}
                    />
                  ))}
                </div>

                <button onClick={next} aria-label="Следующий" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-blue transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
