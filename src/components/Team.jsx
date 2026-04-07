import { useState, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const members = [
  {
    name: 'Лилия',
    role: 'Организатор и педагог',
    bio: 'Более 8 лет работаю с детьми как педагог искусства и руководитель проектов дополнительного образования, организатор детских лагерей и образовательных программ.',
    quote: 'Мне важно дать детям пространство, где они могут свободно проявляться, изобретать и раскрывать свою творческую инициативу.',
    photo: '/images/ebe3f81d4_.jpg',
    bgColor: 'rgba(185,207,218,0.22)',
    ringColor: 'rgba(185,207,218,0.35)',
    dotColor: '#729ACD',
    stickerBg: '#B9CFDA',
    imgPos: '0 80%',
  },
  {
    name: 'Валерия',
    role: 'Автор идеи и методист',
    bio: 'Художница. Соединяю арт-терапию, живую историю искусства и практику рисования. Для меня главное — зажечь в ребёнке искренний интерес, а не научить копировать.',
    quote: 'Творчество — это не про «правильно» или «красиво», а про себя, свободу и удовольствие.',
    photo: '/images/e80abfcf8_.jpg',
    bgColor: 'rgba(245,220,144,0.20)',
    ringColor: 'rgba(245,220,144,0.35)',
    dotColor: '#c8a800',
    stickerBg: '#F5DC90',
    imgPos: '0 70%',
  },
  {
    name: 'Ксения',
    role: 'Координатор',
    bio: 'Решаю все организационные вопросы, договариваюсь с партнёрами и площадками — чтобы всё прошло гладко для детей и родителей.',
    quote: 'Моя задача — чтобы все детали были на своём месте и ничто не мешало творческому процессу.',
    photo: '/images/843e77d58_.jpg',
    bgColor: 'rgba(255,224,200,0.20)',
    ringColor: 'rgba(255,224,200,0.40)',
    dotColor: '#F18C1F',
    stickerBg: '#FFE0C8',
    imgPos: '0 100%',
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

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const member = members[index];

  return (
    <section id="team" className="py-12 md:py-16 px-6 md:px-14 bg-[#F8F8F8] relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-10 right-12 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 6s ease-in-out infinite', animationDelay: '0.7s' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F5DC90" fillOpacity="0.6"/></svg>
      </div>
      <div className="absolute bottom-16 left-10 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 7.5s ease-in-out infinite', animationDelay: '2s' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,1 12,7.5 19,7.5 13.5,12 15.5,18.5 10,14 4.5,18.5 6.5,12 1,7.5 8,7.5" fill="#E56787" fillOpacity="0.5"/></svg>
      </div>
      <div className="absolute top-1/2 left-1/4 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5s ease-in-out infinite', animationDelay: '1.2s' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" fill="#729ACD" fillOpacity="0.45" transform="rotate(18 8 8)"/></svg>
      </div>

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
          <div
            className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* Photo */}
            <div
              className="rounded-2xl overflow-hidden min-h-[320px] md:min-h-[500px]"
              style={{
                background: member.bgColor,
                position: 'relative',
                outline: `4px solid ${member.ringColor}`,
                outlineOffset: '3px',
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
                    className="sticker tracking-[0.15em] uppercase"
                    style={{
                      background: member.stickerBg,
                      color: '#1a1a1a',
                      transform: 'rotate(1deg)',
                      display: 'inline-flex',
                      transition: 'background 0.4s ease',
                    }}
                  >
                      <span className="text-[12px] sm:text-xs">
                           {member.role}
                      </span>

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
