import { useReveal } from '../hooks/useReveal';

export default function CTA() {
  const ref = useReveal();

  return (
    <section id="pricing" className="py-16 md:py-24 px-6 md:px-14">
      <div ref={ref} className="reveal max-w-4xl mx-auto rounded-3xl px-8 md:px-16 py-14 md:py-20 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(114,154,205,0.18) 0%, rgba(229,103,135,0.13) 40%, rgba(245,220,144,0.20) 100%)',
          border: '1.5px solid rgba(114,154,205,0.25)',
        }}
      >
        {/* Decorative blobs inside */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"
          style={{ background: 'rgba(229,103,135,0.25)' }} />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4"
          style={{ background: 'rgba(180,181,52,0.20)' }} />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Присоединяйтесь
          </h2>
          <p className="text-muted-foreground text-base mb-8">
            15–26 июня · Ереван · 10:00–14:00 · дети 7–13 лет
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sticker text-white px-10 py-4 text-base tracking-wide"
            style={{ background: '#729ACD' }}
          >
            Подать заявку
          </a>

          <p className="mt-4 text-sm text-muted-foreground">Ответим в течение дня</p>
        </div>
      </div>
    </section>
  );
}
