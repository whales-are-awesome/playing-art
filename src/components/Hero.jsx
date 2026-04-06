export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 right-8 md:right-24 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(114,154,205,0.45)' }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-52 md:w-72 h-52 md:h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(245,220,144,0.50)' }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-40 md:w-60 h-40 md:h-60 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(229,103,135,0.35)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-blue mb-8 md:mb-12">
          Детский арт-интенсив
        </p>

        <h1 className="font-inter text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-foreground">
          Играем<br />
          <span className="text-blue">в искусство</span>
        </h1>

        <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-y-3">
          <span className="text-base md:text-lg font-semibold text-foreground">15–26 июня</span>
          <span className="mx-3 md:mx-4 w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: '#E56787' }} />
          <span className="text-base md:text-lg font-medium text-muted-foreground">Ереван</span>
          <span className="mx-3 md:mx-4 w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: '#F18C1F' }} />
          <span className="text-base md:text-lg font-medium text-muted-foreground">10:00–14:00</span>
          <span className="mx-3 md:mx-4 w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: '#B4B534' }} />
          <span className="text-base md:text-lg font-medium text-muted-foreground">Дети 7–13 лет</span>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-blue transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">подробнее</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
