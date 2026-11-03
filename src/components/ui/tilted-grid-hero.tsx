"use client";

import * as React from "react";

export type TiltedGridImage = { src: string; alt?: string };
type Layout = { columns: number; sweep: number; unit: number; limit: number };
type Props = React.ComponentProps<"div"> & {
  images: TiltedGridImage[];
  speed?: number;
  tileHeight?: number;
  aspectRatio?: number;
  gap?: number;
  axis?: number;
  curve?: number;
  fade?: number;
};

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;
const arc = (bend: number) => (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));

function measure(width: number, height: number, tile: number, aspect: number, gap: number, bend: number): Layout {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const sweep = +((columns * pitch) / 2).toFixed(4);
  return { columns, sweep, unit: +unit.toFixed(4), limit: +Math.min(sweep, limit).toFixed(4) };
}

export function TiltedGridHero({
  images, speed = 4, tileHeight = 34, aspectRatio = 16 / 9, gap = 6,
  axis = 56, curve = 80, fade = 12, className, style, ...props
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-orbit-${id}`;
  const tileClass = `tgh-tile-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const [layout, setLayout] = React.useState<Layout | null>(null);
  const [shown, setShown] = React.useState<Record<number, number>>({});

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = (width: number, height: number) => {
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout(prev => prev?.columns === next.columns && prev.sweep === next.sweep && prev.unit === next.unit ? prev : next);
    };
    if (typeof ResizeObserver === "undefined") {
      const resize = () => update(el.clientWidth, el.clientHeight);
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width, entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    images.forEach(({ src }) => { const image = new Image(); image.decoding = "async"; image.src = src; });
  }, [images]);

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 420, tileHeight, aspectRatio, gap, bend);
  const u = (n: number) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;
  const radius = `${+(100 * arc(bend)).toFixed(3)}cqw`;
  const turn = (deg: number) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;
  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const safeSpeed = Number.isFinite(speed) ? Math.max(0.5, speed) : 4;
  const duration = columns * safeSpeed;
  const share = aspectRatio / SLICES;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
  const css = `@keyframes ${orbit}{from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}0%,${hide}%,${100-hide}%,100%{visibility:hidden}${hide+0.001}%,${100-hide-0.001}%{visibility:visible}}@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`;

  return (
    <div ref={ref} className={`tilted-grid-hero relative isolate overflow-hidden ${className ?? ""}`} style={{ ...style, containerType: "size" }} {...divProps}>
      <style>{css}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-500" style={{
        opacity: layout ? 1 : 0, perspective: `${+(100 * arc(bend) * CAMERA).toFixed(3)}cqw`,
        perspectiveOrigin: `50% ${axis}%`, maskImage: mask, WebkitMaskImage: mask
      }}>
        {Array.from({ length: columns }, (_, t) => {
          const first = columns - 1 - t;
          const img = images.length > 0 ? images[(shown[t] ?? first) % images.length] : undefined;
          return (
            <div key={t} className={`absolute ${tileClass}`} style={{
              left: `calc(50% - ${u(aspectRatio / 2)})`, top: `calc(${axis}% - ${u(.5)})`,
              width: u(aspectRatio), height: u(1), transformStyle: "preserve-3d",
              animation: `${orbit} ${duration}s linear ${-t * safeSpeed}s infinite`
            }} onAnimationIteration={event => {
              const lap = Math.round(event.elapsedTime / duration);
              setShown(prev => {
                const next = lap * columns + first;
                return prev[t] === next ? prev : { ...prev, [t]: next };
              });
            }}>
              {Array.from({ length: SLICES }, (_, k) => (
                <div key={k} className="absolute top-0 overflow-hidden bg-neutral-900" style={{
                  left: u((aspectRatio - share) / 2),
                  width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                  height: u(1), transform: turn((aspectRatio / 2 - (k + .5) * share) * unit)
                }}>
                  {img && <img src={img.src} alt={k === 0 ? (img.alt ?? "") : ""} draggable={false}
                    className="absolute top-0 max-w-none object-cover" style={{ left: u(-k * share), width: u(aspectRatio), height: u(1) }} />}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export default TiltedGridHero;
