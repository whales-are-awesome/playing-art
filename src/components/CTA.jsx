import { useReveal } from '../hooks/useReveal';

export default function CTA() {
  const ref = useReveal();

  return (
    <section id="pricing" className="py-16 md:py-20 px-6 md:px-14">
      <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
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
          className="inline-flex items-center gap-3 bg-blue text-white px-10 py-4 rounded-full text-base font-bold tracking-wide hover:opacity-90 transition-all"
        >
          Подать заявку
        </a>

        <p className="mt-4 text-sm text-muted-foreground">Ответим в течение дня</p>
      </div>
    </section>
  );
}
