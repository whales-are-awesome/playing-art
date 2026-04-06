export default function Footer() {
  return (
    <footer id="contacts" className="py-16 md:py-24 px-6 md:px-14 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue mb-4">
            Контакты
          </p>
          <div className="w-16 h-px bg-blue mx-auto mb-8" />
          <p className="text-muted-foreground mb-6 text-base md:text-lg">
            Вопросы, предложения, связь
          </p>
          <a
            href="https://t.me/lillilia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sticker bg-blue text-white px-8 py-4 tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
            </svg>
            Написать в Telegram
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="font-playfair text-lg md:text-xl text-muted-foreground italic">
            Сделано для будущего поколения авторов
          </p>
          <p className="text-xs text-muted-foreground mt-4 tracking-wide">
            ИГРАЕМ В ИСКУССТВО · Ереван · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
