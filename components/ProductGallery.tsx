'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [current, setCurrent]   = useState(0);
  const pointerStart             = useRef<{ x: number; y: number } | null>(null);
  const didDrag                  = useRef(false);
  const single                   = images.length <= 1;

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (single) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [single, prev, next]);

  function onPointerDown(e: React.PointerEvent) {
    // Don't initiate swipe when the event started inside a button
    if ((e.target as HTMLElement).closest('button')) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointerStart.current) return;
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    if (dx > 6 || dy > 6) didDrag.current = true;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    if (didDrag.current && Math.abs(dx) > 44) {
      dx < 0 ? next() : prev();
    }
    pointerStart.current = null;
    didDrag.current = false;
  }

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main image ───────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden border border-[#E4DDD2] bg-[#F8F7F3] aspect-[4/3] relative max-h-[480px] select-none"
        onPointerDown={single ? undefined : onPointerDown}
        onPointerMove={single ? undefined : onPointerMove}
        onPointerUp={single ? undefined : onPointerUp}
        style={{ touchAction: single ? 'auto' : 'pan-y' }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? alt : `${alt} — תמונה ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            draggable={false}
          />
        ))}

        {/* Desktop arrows — stopPropagation prevents the swipe container from capturing their pointer events */}
        {!single && (
          <>
            <button
              onClick={prev}
              onPointerDown={e => e.stopPropagation()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md items-center justify-center hover:bg-white transition-colors cursor-pointer hidden md:flex z-10"
              aria-label="תמונה קודמת"
            >
              <ChevronRight className="w-4 h-4 text-[#333]" />
            </button>
            <button
              onClick={next}
              onPointerDown={e => e.stopPropagation()}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md items-center justify-center hover:bg-white transition-colors cursor-pointer hidden md:flex z-10"
              aria-label="תמונה הבאה"
            >
              <ChevronLeft className="w-4 h-4 text-[#333]" />
            </button>
          </>
        )}

        {/* Mobile dots */}
        {!single && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                onPointerDown={e => e.stopPropagation()}
                className={`h-1.5 rounded-full transition-all bg-white ${
                  i === current ? 'w-4 opacity-100' : 'w-1.5 opacity-50'
                }`}
                aria-label={`תמונה ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip (desktop only) ───────────── */}
      {!single && (
        <div className="hidden md:flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`w-[72px] h-[72px] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                i === current
                  ? 'border-tn-600 opacity-100 scale-[1.04]'
                  : 'border-[#E4DDD2] opacity-65 hover:opacity-100 hover:border-[#B8B8B8]'
              }`}
              aria-label={`תמונה ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            >
              <img
                src={src}
                alt={`${alt} — תמונה ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
