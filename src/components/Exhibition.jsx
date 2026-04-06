import { useReveal } from '../hooks/useReveal';

const items = [
  { text: 'первый опыт публичного признания', bg: 'rgba(114,154,205,0.15)', color: '#729ACD', rotate: '-2deg' },
  { text: 'развитие уверенности в себе', bg: 'rgba(229,103,135,0.15)', color: '#E56787', rotate: '1.5deg' },
  { text: 'гордость за собственный результат', bg: 'rgba(180,181,52,0.15)', color: '#B4B534', rotate: '-1deg' },
];

const photos = [
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/afb547c3c_.jpg', alt: 'Дети у своей картины на выставке', pos: 'center 20%', rotate: '-2.5deg', gridArea: '1 / 1 / 3 / 2' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/0d5cac379_.jpg', alt: 'Посетители рассматривают работы', pos: 'center 60%', rotate: '2deg', gridArea: '1 / 2 / 2 / 3' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/5df452749_1.jpg', alt: 'Ребёнок с папой смотрит на картину', pos: 'center 42%', rotate: '-1.5deg', gridArea: '2 / 2 / 3 / 3' },
];

export default function Exhibition() {
  const textRef = useReveal();
  const imgRef = useReveal();

  return (
    <section className="py-20 md:py-28 px-6 md:px-14 overflow-hidden">
      <div style={{ maxWidth: '74rem' }} className="mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Polaroid photos */}
          <div ref={imgRef} className="reveal">
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px' }}
            >
              {photos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    gridArea: p.gridArea,
                    background: 'white',
                    padding: i === 0 ? '7px 7px 22px 7px' : '6px 6px 14px 6px',
                    boxShadow: '3px 6px 18px rgba(0,0,0,0.12)',
                    transform: `rotate(${p.rotate})`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)';
                    e.currentTarget.style.boxShadow = '6px 12px 28px rgba(0,0,0,0.16)';
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = `rotate(${p.rotate})`;
                    e.currentTarget.style.boxShadow = '3px 6px 18px rgba(0,0,0,0.12)';
                    e.currentTarget.style.zIndex = 'auto';
                  }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    style={{
                      width: '100%',
                      height: i === 0 ? '100%' : '100%',
                      minHeight: i === 0 ? '400px' : 'auto',
                      objectFit: 'cover',
                      objectPosition: p.pos,
                      display: 'block',
                    }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="reveal">
            {/* Sticker label */}
            <div className="mb-5">
              <span
                className="sticker text-xs tracking-[0.2em] uppercase"
                style={{ background: '#B9CFDA', color: '#1a1a1a', transform: 'rotate(-1deg)', display: 'inline-flex' }}
              >
                Финал интенсива
              </span>
            </div>

            {/* Editorial heading */}
            <h2 className="font-black mb-8">
              <span className="block text-3xl md:text-4xl text-foreground" style={{ lineHeight: 1, marginBottom: '-4px' }}>Настоящая</span>
              <span className="block text-5xl md:text-7xl" style={{ color: '#729ACD', lineHeight: 1 }}>выставка</span>
            </h2>

            {/* Description as pull quote */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              Работы детей будут представлены<br />на настоящей выставке.
            </p>

            {/* Items as sticker tags */}
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Для ребёнка это:
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex self-start rounded-xl px-4 py-2.5 border-2 text-sm font-semibold"
                  style={{
                    background: item.bg,
                    borderColor: item.color,
                    color: item.color,
                    transform: `rotate(${item.rotate})`,
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = `rotate(${item.rotate})`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
