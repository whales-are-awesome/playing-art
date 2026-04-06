import { useReveal } from '../hooks/useReveal';

const items = [
  'первый опыт публичного признания',
  'развитие уверенности в себе',
  'гордость за собственный результат',
];

export default function Exhibition() {
  const textRef = useReveal();
  const imgRef = useReveal();

  return (
    <section className="py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photos grid */}
          <div ref={imgRef} className="reveal grid gap-3 md:gap-4" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
            <div className="rounded-2xl overflow-hidden" style={{ gridArea: '1 / 1 / 3' }}>
              <img
                src="https://media.base44.com/images/public/69c774076c93ae569fec24ce/afb547c3c_.jpg"
                alt="Дети у своей картины на выставке"
                className="w-full h-full object-cover"
                style={{ minHeight: '280px', objectPosition: 'center 20%' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ gridArea: '1 / 2' }}>
              <img
                src="https://media.base44.com/images/public/69c774076c93ae569fec24ce/0d5cac379_.jpg"
                alt="Посетители рассматривают работы"
                className="w-full h-full object-cover"
                style={{ minHeight: '130px', objectPosition: 'center 60%' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ gridArea: '2 / 2' }}>
              <img
                src="https://media.base44.com/images/public/69c774076c93ae569fec24ce/5df452749_1.jpg"
                alt="Ребёнок с папой смотрит на картину"
                className="w-full h-full object-cover"
                style={{ minHeight: '130px', objectPosition: 'center 30%' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="reveal">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue mb-6">
              Финал интенсива
            </p>
            <div className="w-12 h-px bg-blue mb-8" />
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Настоящая выставка
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Работы детей будут представлены<br />на настоящей выставке.
            </p>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Для ребёнка это:
            </p>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-blue shrink-0">—</span>
                  <span className="font-medium text-base md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
