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
          ? 'bg-white/80 backdrop-blur-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14 md:h-16">
        <a href="#" className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
          Играем в искусство
        </a>

        <div className="flex items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white transition-all duration-300"
            style={{ background: '#729ACD' }}
          >
            Подать заявку
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-softblue/30 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white/95 backdrop-blur border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {['#about', '#process', '#team', '#gallery', '#pricing', '#contacts'].map((href, i) => {
            const labels = ['О программе', 'Программа дня', 'Команда', 'Как это было', 'Записаться', 'Контакты'];
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              >
                {labels[i]}
              </a>
            );
          })}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white w-fit mt-2"
            style={{ background: '#729ACD' }}
          >
            Подать заявку
          </a>
        </div>
      )}
    </header>
  );
}
