import { useReveal } from '../hooks/useReveal';

const photos = [
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/479cc02c2_.jpg', alt: 'Дети рисуют большой холст на улице', gridColumn: '1', gridRow: '1 / 3', pos: 'center 30%' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/5f395ed5a_.jpg', alt: 'Яркая абстрактная картина, созданная детьми', gridColumn: '2', gridRow: '1', pos: 'center center' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/0100fc3a5_.jpg', alt: 'Руки ребёнка с краской', gridColumn: '2', gridRow: '2', pos: 'center 40%' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/25da8d595_.jpg', alt: 'Дети работают вместе в студии', gridColumn: '3', gridRow: '1', pos: 'center 20%' },
  { src: 'https://media.base44.com/images/public/69c774076c93ae569fec24ce/0070e06f2_.jpg', alt: 'Дети рисуют акварелью на улице', gridColumn: '3', gridRow: '2', pos: 'center 25%' },
];

export default function Gallery() {
  const titleRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="gallery" className="py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-4">
            Как было
          </p>
          <h2 ref={titleRef} className="reveal text-3xl md:text-5xl font-black">
            В прошлом году
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '260px 260px',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ gridColumn: photo.gridColumn, gridRow: photo.gridRow }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: photo.pos }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
