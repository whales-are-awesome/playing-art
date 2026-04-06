import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="hidden sm:visible fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        style={{
          width: '0%',
          height: '100%',
          background: '#729ACD',
        }}
      />
    </div>
  );
}
