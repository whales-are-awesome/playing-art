export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 right-8 md:right-24 w-48 md:w-72 h-48 md:h-72 rounded-full bg-softblue/25 blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-1/3 left-0 w-40 md:w-56 h-40 md:h-56 rounded-full bg-sunny/30 blur-3xl pointer-events-none"
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

        <div className="mt-10 md:mt-14 flex flex-wrap gap-x-8 gap-y-3">
          <span className="text-base md:text-lg font-medium text-muted-foreground">15–26 июня</span>
          <span className="text-base md:text-lg font-medium text-muted-foreground">·&nbsp;Ереван</span>
          <span className="text-base md:text-lg font-medium text-muted-foreground">·&nbsp;10:00–14:00</span>
          <span className="text-base md:text-lg font-medium text-muted-foreground">·&nbsp;Дети 7–13 лет</span>
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
