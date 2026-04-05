import { useReveal } from '../hooks/useReveal';

const photos = [
  { src: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=800&q=80', alt: 'Дети рисуют большой холст на улице', gridArea: '1 / 1 / 3' },
  { src: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=500&q=80', alt: 'Яркая абстрактная картина', gridArea: '1 / 2' },
  { src: 'https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=500&q=80', alt: 'Руки ребёнка с краской', gridArea: '1 / 3' },
  { src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&q=80', alt: 'Дети работают вместе в студии', gridArea: '2 / 2' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', alt: 'Дети рисуют акварелью', gridArea: '2 / 3' },
];

export default function Gallery() {
  const titleRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="gallery" className="py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-4">
            Как это было
          </p>
          <h2 ref={titleRef} className="reveal text-3xl md:text-5xl font-black">
            В прошлом году
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '280px 280px',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ gridArea: photo.gridArea }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
