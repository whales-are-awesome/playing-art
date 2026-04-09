export default function Footer() {
  return (
    <footer id="contacts" className="py-7 md:py-20 px-6 md:px-14 border-t border-border">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div>
            <span
              className="sticker text-xs tracking-[0.2em] uppercase mb-6 inline-flex"
              style={{ background: '#E56787', color: '#fff', transform: 'rotate(-1deg)' }}
            >
              Контакты
            </span>
            <p className="font-black text-foreground mt-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
              Есть вопросы?<br />
              <span style={{ color: '#729ACD' }}>Напишите нам</span>
            </p>
          </div>

          <a
            href="https://t.me/lillilia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sticker text-white px-7 py-3.5 tracking-wide text-sm inline-flex self-start md:self-auto"
            style={{ background: '#729ACD' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
            </svg>
            Написать в Telegram
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground tracking-wide">
            ИГРАЕМ В ИСКУССТВО · Ереван · 2026
          </p>
          <p className="text-sm text-muted-foreground">
            Сделано для будущего поколения авторов
          </p>
        </div>

      </div>
    </footer>
  );
}
