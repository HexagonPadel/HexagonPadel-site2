import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * PhotoCaroussel — défilement continu infini + drag + lightbox
 * - Défilement continu droite→gauche (1 image / 3 s)
 * - 7 vignettes visibles desktop (aspect ~8/7)
 * - 3 vignettes visibles mobile (aspect 2/3), hauteur auto
 * - Drag souris/tactile pour accélérer/inverser
 * - Clic sur une image => arrêt + lightbox
 * - Boucle infinie SANS discontinuité
 */

const VISIBLE = 7;
const INTERVAL_MS_PER_IMAGE = 3000;
const CLICK_DRAG_THRESHOLD = 6;

function loadImagesFromPublicFolder() {
  try {
    const ctx = require.context(
      "../../../public/photos-carousel",
      false,
      /\.(png|jpe?g|webp|gif|avif|svg|bmp|tiff|heic|heif)$/i
    );
    const keys = ctx.keys().sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    return keys.map((k) => `/photos-carousel/${k.replace(/^.\//, "")}`);
  } catch {
    return [];
  }
}

export default function PhotoCaroussel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" ? window.innerWidth < 768 : false
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [images] = useState(() => loadImagesFromPublicFolder());
  const list = useMemo(() => images ?? [], [images]);
  const total = list.length;

  // Préchargement
  useEffect(() => {
    list.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [list]);

  // Triple les images
  const trackItems = useMemo(() => {
    if (total === 0) return [];
    return [...list, ...list, ...list];
  }, [list, total]);

  const [offsetPx, setOffsetPx] = useState(0);
  const baseSpeedPxPerMsRef = useRef(0);
  const lastTsRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const itemRef = useRef(null);
  const itemWidthRef = useRef(0);
  const gapPxRef = useRef(12);

  const isMouseDownRef = useRef(false);
  const lastXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const touchStartX = useRef(0);
  const touchDragDistanceRef = useRef(0);

  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (isMobile) setOffsetPx(0);
  }, [isMobile]);

  const computeMetrics = () => {
    const itemEl = itemRef.current;
    const trackEl = trackRef.current;
    if (!itemEl || !trackEl) return;
    const w = itemEl.getBoundingClientRect().width;
    const cs = window.getComputedStyle(trackEl);
    const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
    itemWidthRef.current = w;
    gapPxRef.current = gap;
    const step = w + gap;
    baseSpeedPxPerMsRef.current = step / INTERVAL_MS_PER_IMAGE;
  };

  useEffect(() => {
    computeMetrics();
    const ro = new ResizeObserver(() => {
      computeMetrics();
    });
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    if (itemRef.current) ro.observe(itemRef.current);
    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (total > 0 && itemWidthRef.current > 0) {
      const singleSetWidth = total * (itemWidthRef.current + gapPxRef.current);
      setOffsetPx(singleSetWidth);
    }
  }, [total]);

  useEffect(() => {
    if (total === 0) return;
    let raf;
    const loop = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!isPaused && !isMouseDownRef.current) {
        const v = baseSpeedPxPerMsRef.current;
        if (v > 0 && itemWidthRef.current > 0) {
          setOffsetPx((prev) => {
            const newOffset = prev + v * dt;
            const singleSetWidth =
              total * (itemWidthRef.current + gapPxRef.current);
            if (newOffset >= singleSetWidth * 2) return newOffset - singleSetWidth;
            if (newOffset < 0) return newOffset + singleSetWidth;
            return newOffset;
          });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [total, isPaused]);

  const normalizeOffset = (val) => {
    const singleSetWidth = total * (itemWidthRef.current + gapPxRef.current);
    if (val >= singleSetWidth * 2) return val - singleSetWidth;
    if (val < 0) return val + singleSetWidth;
    return val;
  };

  const onMouseDown = (e) => {
    if (lightboxSrc) return;
    isMouseDownRef.current = true;
    lastXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isMouseDownRef.current || lightboxSrc) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dx);
    setOffsetPx((prev) => normalizeOffset(prev - dx));
  };

  const endMouseDrag = () => {
    isMouseDownRef.current = false;
  };

  const onTouchStart = (e) => {
    if (lightboxSrc) return;
    touchStartX.current = e.touches[0].clientX;
    touchDragDistanceRef.current = 0;
    isMouseDownRef.current = true;
  };

  const onTouchMove = (e) => {
    if (!isMouseDownRef.current || lightboxSrc) return;
    const x = e.touches[0].clientX;
    const dx = x - touchStartX.current;
    touchStartX.current = x;
    touchDragDistanceRef.current += Math.abs(dx);
    setOffsetPx((prev) => normalizeOffset(prev - dx));
  };

  const onTouchEnd = () => {
    isMouseDownRef.current = false;
  };

  const handleImagePointerUp = (src) => {
    const moved =
      dragDistanceRef.current > CLICK_DRAG_THRESHOLD ||
      touchDragDistanceRef.current > CLICK_DRAG_THRESHOLD;
    dragDistanceRef.current = 0;
    touchDragDistanceRef.current = 0;
    if (moved || lightboxSrc) return;
    setIsPaused(true);
    setLightboxSrc(src);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setIsPaused(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && lightboxSrc) closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  if (total === 0) return null;

  const itemClasses = [
    "relative overflow-hidden",
    "aspect-[8/7]",
    "rounded-md",
    "shadow-[0_6px_18px_rgba(0,0,0,0.18)]",
    "bg-transparent",
    "select-none",
  ].join(" ");

  const itemStyle = { flex: "0 0 calc((100% - (var(--gap-x) * 6)) / 7)" };
  const gapClass = "gap-2 sm:gap-3";
  const gapVarStyle = { ["--gap-x"]: "8px" };

  // ====== RETURN MOBILE ======
if (isMobile) {
  const MOBILE_VISIBLE = 3;

  return (
    <section
      aria-label="Carrousel photos produits (mobile)"
      className="w-full bg-slate-50 overflow-hidden py-2"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endMouseDrag}
      onMouseLeave={endMouseDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch select-none cursor-grab active:cursor-grabbing"
          style={{ gap: "4px", transform: `translateX(${-offsetPx}px)` }}
        >
          {trackItems.map((src, i) => (
            <div
              key={`${src}-${i}`}
              ref={i === 0 ? itemRef : null}
              className="relative shrink-0 overflow-hidden aspect-[2/3] rounded"
              style={{ flex: "0 0 calc((100% - 8px) / 3)" }} // 2 gaps * 4px
              onMouseUp={() => handleImagePointerUp(src)}
              onTouchEnd={() => handleImagePointerUp(src)}
            >
              <img
                src={src}
                alt={`Photo ${(i % total) + 1}`}
                draggable={false}
                className="block h-full w-full object-contain"
                loading={i < MOBILE_VISIBLE * 3 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i < MOBILE_VISIBLE * 3 ? "high" : "auto"}
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
  <div
    className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={() => { setIsPaused(false); setLightboxSrc(null); }}
  >
    <div
      className="relative w-full max-w-[92vw] pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Fermer"
        className="absolute right-3 top-3 h-10 w-10 rounded-full bg-black/75 text-white flex items-center justify-center transition-transform hover:scale-110 hover:rotate-12 z-[1000] pointer-events-auto"
        onClick={(e) => { e.stopPropagation(); setIsPaused(false); setLightboxSrc(null); }}
        onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); setIsPaused(false); setLightboxSrc(null); }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <figure className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black/20">
        <img
          src={lightboxSrc}
          alt="Agrandissement"
          className="w-full h-auto max-h-[75vh] object-contain select-none"
          draggable={false}
        />
      </figure>
    </div>
  </div>
)}
    </section>
  );
}

  // ====== RETURN DESKTOP ======
  return (
    <section
      aria-label="Carrousel photos produits"
      className="w-full py-4 bg-slate-50 overflow-hidden"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endMouseDrag}
      onMouseLeave={endMouseDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative max-w-none bg-transparent">
        <div ref={viewportRef} className="overflow-hidden bg-transparent">
          <div
            ref={trackRef}
            className={`flex flex-nowrap items-stretch select-none cursor-grab active:cursor-grabbing bg-transparent ${gapClass}`}
            style={{
              ...gapVarStyle,
              transform: `translateX(${-offsetPx}px)`,
              transition: "transform 0s linear",
              willChange: "transform",
            }}
          >
            {trackItems.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={itemClasses}
                style={itemStyle}
                ref={i === 0 ? itemRef : null}
                onMouseUp={() => handleImagePointerUp(src)}
                onTouchEnd={() => handleImagePointerUp(src)}
              >
                <img
                  src={src}
                  alt={`Photo ${(i % total) + 1}`}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover bg-transparent"
                  loading="eager"
                  decoding="async"
                  fetchPriority={i < total ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 z-20">
              <button
                type="button"
                aria-label="Fermer"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="pointer-events-auto absolute right-3 top-3 h-10 w-10 rounded-full bg-black/75 text-white shadow-lg flex items-center justify-center transition-transform duration-200 ease-out hover:scale-110 hover:rotate-12 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <figure className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black/20">
              <img
                src={lightboxSrc}
                alt="Agrandissement"
                className="w-full h-auto max-h-[80vh] object-contain"
                draggable={false}
              />
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}