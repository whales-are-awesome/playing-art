import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-14 flex items-center justify-between h-16 md:h-[72px]">
        <a href="#" className="text-sm md:text-[13px] font-extrabold tracking-[0.18em] uppercase text-foreground">
          Играем в искусство
        </a>

        <div className="flex items-center gap-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
            style={{ background: '#729ACD' }}
          >
            Подать заявку
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="20" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white/98 backdrop-blur border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {['#about', '#process', '#gallery', '#team', '#pricing', '#contacts'].map((href, i) => {
            const labels = ['О программе', 'Наш день', 'Как было', 'Команда', 'Стоимость', 'Контакты'];
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-[#729ACD] transition-colors"
              >
                {labels[i]}
              </a>
            );
          })}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white w-fit mt-2"
            style={{ background: '#729ACD' }}
          >
            Подать заявку
          </a>
        </div>
      )}
    </header>
  );
}
