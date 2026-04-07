import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const el = cursorRef.current;
    if (!el) return;

    const setHover = (active) => {
      if (active) {
        el.style.width = '22px';
        el.style.height = '22px';
        el.style.marginLeft = '-11px';
        el.style.marginTop = '-11px';
        el.style.background = 'transparent';
        el.style.border = '2px solid #F18C1F';
        el.style.mixBlendMode = 'normal';
      } else {
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.marginLeft = '-6px';
        el.style.marginTop = '-6px';
        el.style.background = '#F18C1F';
        el.style.border = 'none';
        el.style.mixBlendMode = 'multiply';
      }
    };

    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"]');
      setHover(!!isInteractive);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
      style={{
        width: '12px',
        height: '12px',
        marginLeft: '-6px',
        marginTop: '-6px',
        background: '#F18C1F',
        mixBlendMode: 'multiply',
        transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), margin 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border 0.35s ease',
        willChange: 'transform',
      }}
    />
  );
}
