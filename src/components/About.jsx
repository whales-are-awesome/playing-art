import { useReveal } from '../hooks/useReveal';
import { useLang } from '../i18n/LangContext';

const benefitStyles = [
  { hex: '#729ACD', bg: 'rgba(114,154,205,0.12)', rotate: '-2deg' },
  { hex: '#E56787', bg: 'rgba(229,103,135,0.12)', rotate: '1.5deg' },
  { hex: '#F18C1F', bg: 'rgba(241,140,31,0.12)', rotate: '-1.5deg' },
  { hex: '#B4B534', bg: 'rgba(180,181,52,0.12)', rotate: '2deg' },
];

const listColors = ['#729ACD', '#E56787', '#F18C1F', '#B4B534'];

export default function About() {
  const { t } = useLang();
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();

  const benefits = t.about.benefits.map((label, i) => ({ label, ...benefitStyles[i] }));
  const listItems = t.about.list.map((text, i) => ({ text, color: listColors[i] }));

  return (
    <section id="about" className="pt-5 pb-10 md:py-28 px-6 md:px-14 overflow-hidden relative">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-50 hidden md:block"
        style={{ background: 'rgba(229,103,135,0.18)', animation: 'floatSlow 9s ease-in-out infinite' }} />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40 hidden md:block"
        style={{ background: 'rgba(245,220,144,0.35)', animation: 'floatY 11s ease-in-out infinite', animationDelay: '3s' }} />

      {/* Floating shapes */}
      <div className="absolute top-16 left-[18%] pointer-events-none hidden md:block" style={{ animation: 'floatTiny 6s ease-in-out infinite', animationDelay: '0.4s' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,1 12,7.5 19,7.5 13.5,12 15.5,18.5 10,14 4.5,18.5 6.5,12 1,7.5 8,7.5" fill="#729ACD" fillOpacity="0.55"/></svg>
      </div>
      <div className="absolute top-1/3 right-10 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 7s ease-in-out infinite', animationDelay: '1.8s' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" fill="#F18C1F" fillOpacity="0.45" transform="rotate(22 14 14)"/></svg>
      </div>
      <div className="absolute bottom-20 left-[40%] pointer-events-none hidden md:block" style={{ animation: 'floatTiny 5s ease-in-out infinite', animationDelay: '0.9s' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#E56787" fillOpacity="0.6"/></svg>
      </div>
      <div className="absolute bottom-32 right-1/3 pointer-events-none hidden md:block" style={{ animation: 'floatTiny 8s ease-in-out infinite', animationDelay: '2.5s' }}>
        <svg width="34" height="20" viewBox="0 0 34 20" fill="none"><ellipse cx="17" cy="10" rx="17" ry="10" fill="#B4B534" fillOpacity="0.4" transform="rotate(-15 17 10)"/></svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-12 md:mb-16">
          <div className="mb-6">
            <span
              className="sticker text-xs tracking-[0.2em] uppercase"
              style={{ background: '#B9CFDA', color: '#1a1a1a', transform: 'rotate(-1.5deg)', display: 'inline-flex' }}
            >
              {t.about.sectionLabel}
            </span>
          </div>
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-stretch">
                <div>
                    <h2 ref={r1} className="reveal text-4xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6 sm:mb-12">
                        {t.about.headingPre}{' '}
                        <span style={{ color: '#E56787' }}>{t.about.headingHighlight}</span>
                        {t.about.headingPost}
                        {t.about.headingPost2 && (
                          <>
                            <br />
                            {t.about.headingPost2}
                          </>
                        )}
                    </h2>
                    <div ref={r2} className="reveal">
                        <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
                            <p>{t.about.p1}</p>
                            <p>{t.about.p2}</p>
                        </div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5">
                            {t.about.listLabel}
                        </p>
                        <div className="space-y-3">
                            {listItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="mt-[6px] w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                                    <span className="text-base font-medium text-foreground">{item.text}</span>
                                </div>
                            ))}
                        </div>
                  </div>
                </div>
                <div ref={r3} className="reveal h-full" style={{ transform: 'rotate(-1.5deg)', transformOrigin: 'center center' }}>
                    <div
                        className="rounded-2xl overflow-hidden h-full relative"
                        style={{
                            boxShadow: '6px 8px 0px rgba(114,154,205,0.35)',
                            border: '3px solid rgba(114,154,205,0.3)',
                        }}
                    >
                        <img
                            src="/images/fddb28445_.jpg"
                            alt="Дети на занятии"
                            className="w-full h-auto xl:absolute md:inset-0 md:max-w-full md:max-h-full md:h-full md:object-cover object-[0_99%]"
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Benefit cards */}
        <div ref={r4} className="reveal mt-10 md:mt-14 flex justify-end">
          <div className="w-full md:w-1/2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {t.about.benefitsLabel}
            </p>
            <div className="grid grid-cols-2 gap-3" style={{ padding: '8px' }}>
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 border-2"
                  style={{
                    background: b.bg,
                    borderColor: b.hex,
                    transform: `rotate(${b.rotate})`,
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = `rotate(${b.rotate})`}
                >
                  <span className="text-sm font-bold" style={{ color: b.hex }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
