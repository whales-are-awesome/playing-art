import { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ru');
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function LangSwitcher({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center ${className}`}>
      {['ru', 'hy'].map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-muted-foreground opacity-30 mx-0.5 text-[10px]">/</span>}
          <button
            onClick={() => setLang(l)}
            className={`px-1.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded transition-all cursor-pointer ${
              lang === l
                ? 'text-foreground'
                : 'text-muted-foreground opacity-40 hover:opacity-80'
            }`}
          >
            {l === 'ru' ? 'RU' : 'ՀԱՅ'}
          </button>
        </span>
      ))}
    </div>
  );
}
