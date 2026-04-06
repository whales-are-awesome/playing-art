import { useState, useEffect } from 'react';

const links = [
  { label: 'О программе', href: '#about', color: '#729ACD' },
  { label: 'Наш день', href: '#process', color: '#E56787' },
  { label: 'Как было', href: '#gallery', color: '#F18C1F' },
  { label: 'Команда', href: '#team', color: '#B4B534' },
  { label: 'Стоимость', href: '#pricing', color: '#F5DC90' },
  { label: 'Контакты', href: '#contacts', color: '#729ACD' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`hidden sm:blockfixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14 md:h-16">
          <a href="#" className="hidden md:block text-sm font-bold tracking-[0.15em] uppercase text-foreground">
            Играем в искусство
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScT4j-pI-We8oZfWggw2dByhtiyJW1ATWSBrTBfvrOwcuNZWA/viewform?usp=preview"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sticker hidden md:inline-flex items-center px-5 py-2 text-xs tracking-widest uppercase text-white"
              style={{ background: '#729ACD' }}
            >
              Подать заявку
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 ml-auto sm:ml-0 flex items-center justify-center rounded-full hover:bg-softblue/30 transition-colors cursor-pointer"
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
      </header>

      {/* Fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-start justify-center px-10 md:px-20 transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(185,207,218,0.97)',
          backdropFilter: 'blur(24px)',
          clipPath: menuOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="flex flex-col items-start gap-4 md:gap-5 mb-10">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-3xl md:text-5xl font-black text-foreground hover:text-blue transition-colors leading-none"
              style={{
                transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease ${0.05 + i * 0.06}s, opacity 0.4s ease ${0.05 + i * 0.06}s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
