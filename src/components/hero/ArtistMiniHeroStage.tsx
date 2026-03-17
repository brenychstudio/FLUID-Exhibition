import React, { useEffect, useMemo, useRef, useState } from "react";

type ArtistMiniHeroStageProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  metaLine?: string;
  ctaLabel?: string;
  seed?: number;
  className?: string;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  targetActive: number;
};

type Blob = {
  x: number;
  y: number;
  radius: number;
  driftX: number;
  driftY: number;
  speed: number;
  phase: number;
  stretchX: number;
  stretchY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function seededBlobs(seed = 0): Blob[] {
  const s = seed * 0.17;
  return [
    { x: 0.46 + s * 0.2, y: 0.48, radius: 0.18, driftX: 0.022, driftY: 0.016, speed: 0.18, phase: 0.1 + seed, stretchX: 1.42, stretchY: 0.9 },
    { x: 0.58, y: 0.46 + s * 0.06, radius: 0.14, driftX: 0.018, driftY: 0.014, speed: 0.22, phase: 1.2 + seed, stretchX: 1.16, stretchY: 0.84 },
    { x: 0.38, y: 0.58, radius: 0.13, driftX: 0.018, driftY: 0.018, speed: 0.16, phase: 2.1 + seed, stretchX: 1.0, stretchY: 1.14 },
    { x: 0.62, y: 0.58, radius: 0.11, driftX: 0.015, driftY: 0.014, speed: 0.24, phase: 3.0 + seed, stretchX: 1.06, stretchY: 0.86 },
    { x: 0.72 - s * 0.08, y: 0.5, radius: 0.09, driftX: 0.014, driftY: 0.012, speed: 0.2, phase: 4.0 + seed, stretchX: 0.88, stretchY: 1.06 },
    { x: 0.29 + s * 0.05, y: 0.48, radius: 0.082, driftX: 0.012, driftY: 0.014, speed: 0.26, phase: 5.2 + seed, stretchX: 0.86, stretchY: 1.14 },
  ];
}

function drawLiquidField(
  target: CanvasRenderingContext2D,
  lowCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
  blobs: Blob[],
) {
  const lowW = Math.max(220, Math.floor(width / 3));
  const lowH = Math.max(140, Math.floor(height / 3));

  if (lowCtx.canvas.width !== lowW || lowCtx.canvas.height !== lowH) {
    lowCtx.canvas.width = lowW;
    lowCtx.canvas.height = lowH;
  }

  const imageData = lowCtx.createImageData(lowW, lowH);
  const data = imageData.data;

  const pointerX = 0.5 + pointer.x * 0.16;
  const pointerY = 0.5 + pointer.y * 0.12;

  const liveBlobs = blobs.map((blob, index) => ({
    x: blob.x + Math.sin(time * blob.speed + blob.phase) * blob.driftX + pointer.x * (index % 2 === 0 ? 0.012 : -0.01),
    y: blob.y + Math.cos(time * blob.speed * 0.86 + blob.phase) * blob.driftY + pointer.y * (index % 2 === 0 ? 0.01 : -0.008),
    radius: blob.radius * (0.94 + Math.sin(time * 0.42 + blob.phase * 1.4) * 0.08),
    stretchX: blob.stretchX * (0.96 + Math.sin(time * 0.3 + blob.phase) * 0.06),
    stretchY: blob.stretchY * (0.96 + Math.cos(time * 0.28 + blob.phase) * 0.06),
  }));

  let offset = 0;
  for (let py = 0; py < lowH; py += 1) {
    for (let px = 0; px < lowW; px += 1) {
      let nx = px / lowW;
      let ny = py / lowH;

      const warpA = Math.sin((ny * 5.6 + time * 0.28) * Math.PI) * 0.02;
      const warpB = Math.cos((nx * 4.2 - time * 0.24) * Math.PI) * 0.016;
      const warpC = Math.sin((nx + ny) * 8.2 + time * 0.52) * 0.011;
      nx += warpA + warpC + pointer.x * 0.028;
      ny += warpB - warpC * 0.6 + pointer.y * 0.02;

      let field = 0;
      for (const blob of liveBlobs) {
        const dx = (nx - blob.x) / (blob.radius * blob.stretchX);
        const dy = (ny - blob.y) / (blob.radius * blob.stretchY);
        field += 1 / (dx * dx + dy * dy + 0.22);
      }

      const pdx = nx - pointerX;
      const pdy = ny - pointerY;
      field += pointer.active * 0.85 / (pdx * pdx + pdy * pdy + 0.08);

      const flow = Math.sin(nx * 14 + time * 0.82) * Math.cos(ny * 10.8 - time * 0.58) * 0.12;
      const swirl = Math.sin((nx * 9 - ny * 7) + time * 0.42) * 0.5 + 0.5;
      const chroma = Math.sin((nx - ny) * 16 + time * 0.34) * 0.5 + 0.5;

      const mask = smoothstep(2.2, 4.8, field + flow * 0.18);
      const core = smoothstep(4.7, 7.2, field + flow * 0.36);
      const rim = clamp(smoothstep(3.0, 4.1, field) - smoothstep(4.0, 5.1, field), 0, 1);
      const alpha = clamp(mask * (0.82 + rim * 0.16), 0, 1);

      const specular = rim * (0.42 + swirl * 0.3);
      const iridescence = rim * chroma * 0.22;
      const blueShift = Math.sin(time * 0.22 + nx * 12 - ny * 9) * 0.5 + 0.5;
      const cyanShift = Math.cos(time * 0.18 + nx * 8 + ny * 11) * 0.5 + 0.5;

      const r = Math.round(8 + 12 * mask + 92 * rim + 100 * core + 24 * specular + 8 * blueShift + 10 * iridescence);
      const g = Math.round(18 + 28 * mask + 96 * rim + 90 * core + 16 * specular + 14 * cyanShift + 8 * iridescence);
      const b = Math.round(42 + 82 * mask + 112 * rim + 120 * core + 24 * specular + 28 * blueShift + 16 * iridescence);

      data[offset] = clamp(r, 0, 255);
      data[offset + 1] = clamp(g, 0, 255);
      data[offset + 2] = clamp(b, 0, 255);
      data[offset + 3] = Math.round(alpha * 255);
      offset += 4;
    }
  }

  lowCtx.putImageData(imageData, 0, 0);

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "screen";
  target.globalAlpha = 0.68;
  target.filter = "blur(30px) saturate(118%)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "screen";
  target.globalAlpha = 0.82;
  target.filter = "blur(8px) saturate(132%) contrast(108%)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "lighter";
  target.globalAlpha = 0.28;
  target.filter = "blur(2px)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();
}

function drawStage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
  blobs: Blob[],
  lowCtx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, width, height);

  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#02050a");
  base.addColorStop(0.2, "#030814");
  base.addColorStop(0.66, "#02060d");
  base.addColorStop(1, "#010307");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const haze = ctx.createRadialGradient(width * 0.48, height * 0.52, width * 0.04, width * 0.48, height * 0.52, width * 0.78);
  haze.addColorStop(0, "rgba(58,116,255,0.18)");
  haze.addColorStop(0.3, "rgba(27,70,170,0.08)");
  haze.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 7; i += 1) {
    const progress = i / 6;
    const x = width * (0.08 + progress * 0.84);
    const bandWidth = width * (0.024 + (i % 3) * 0.006);
    const shift = Math.sin(time * 0.14 + i * 0.78) * width * 0.01 + pointer.x * 8;
    const gradient = ctx.createLinearGradient(x - bandWidth + shift, 0, x + bandWidth + shift, 0);
    gradient.addColorStop(0, "rgba(17,40,90,0)");
    gradient.addColorStop(0.5, i % 2 === 0 ? "rgba(96,152,255,0.08)" : "rgba(220,238,255,0.025)");
    gradient.addColorStop(1, "rgba(17,40,90,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - bandWidth + shift, 0, bandWidth * 2, height);
  }
  ctx.restore();

  drawLiquidField(ctx, lowCtx, width, height, time, pointer, blobs);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(202,228,255,0.04)";
  for (let i = 0; i < 2; i += 1) {
    const baseY = height * (0.36 + i * 0.18);
    ctx.beginPath();
    for (let x = -30; x <= width + 30; x += 12) {
      const y = baseY + Math.sin(time * 0.46 + i * 1.1 + x * 0.009) * 5 + Math.cos(time * 0.22 + x * 0.004) * 2.5;
      if (x === -30) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = i === 1 ? 1 : 0.7;
    ctx.stroke();
  }
  ctx.restore();
}

function useFluidWindow(canvasRef: React.RefObject<HTMLCanvasElement>, seed: number) {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 });
  const animationRef = useRef<number | null>(null);
  const blobs = useMemo(() => seededBlobs(seed), [seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lowCanvas = document.createElement("canvas");
    const lowCtx = lowCanvas.getContext("2d");
    if (!lowCtx) return;

    let mounted = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(clientHeight * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.targetX = clamp((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5, -0.5, 0.5);
      pointerRef.current.targetY = clamp((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5, -0.5, 0.5);
      pointerRef.current.targetActive = 1;
    };

    const handleLeave = () => {
      pointerRef.current.targetActive = 0;
    };

    const render = (timestamp: number) => {
      if (!mounted) return;

      pointerRef.current.x = lerp(pointerRef.current.x, pointerRef.current.targetX, 0.06);
      pointerRef.current.y = lerp(pointerRef.current.y, pointerRef.current.targetY, 0.06);
      pointerRef.current.active = lerp(pointerRef.current.active, pointerRef.current.targetActive, 0.05);

      drawStage(
        ctx,
        canvas.clientWidth,
        canvas.clientHeight,
        timestamp * 0.001,
        pointerRef.current,
        blobs,
        lowCtx,
      );

      animationRef.current = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);
    animationRef.current = window.requestAnimationFrame(render);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [blobs, canvasRef]);
}

export default function ArtistMiniHeroStage({
  label = "Artist",
  title = "Artist Name",
  subtitle = "Work title / statement",
  metaLine = "",
  ctaLabel = "Read statement",
  seed = 0,
  className = "",
}: ArtistMiniHeroStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useFluidWindow(canvasRef, seed);

  useEffect(() => {
    const timeout = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  const handleEnter = () => {
    const target = document.getElementById("artist-statement");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`relative min-h-[430px] overflow-hidden rounded-[34px] border border-white/10 bg-[#02050a] shadow-[0_28px_120px_rgba(0,0,0,0.30),inset_0_0_0_1px_rgba(140,190,255,0.05)] ${className}`}>
      <style>{`
        @keyframes artist-mini-hero-fade {
          from { opacity: 0; transform: translateY(18px); filter: blur(16px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0)_22%,rgba(0,0,0,0.22)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(92,148,255,0.14),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(70,118,255,0.10),transparent_24%),radial-gradient(circle_at_50%_62%,rgba(188,222,255,0.04),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[-12%] w-[24%] bg-[linear-gradient(90deg,transparent,rgba(168,208,255,0.07),transparent)]" />

      <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6 md:p-8">
        <div
          className={`max-w-[16rem] transition-all duration-1000 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ animation: revealed ? "artist-mini-hero-fade 0.95s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white/70 backdrop-blur-lg">
            {label}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-end">
          <div
            className={`max-w-[44rem] transition-all duration-[1150ms] ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ animation: revealed ? "artist-mini-hero-fade 1.05s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            <h2 className="max-w-[10ch] text-[clamp(42px,5vw,84px)] font-semibold leading-[0.92] tracking-[-0.055em] text-white [text-wrap:balance]">
              {title}
            </h2>

            <p className="mt-4 max-w-[34rem] text-[18px] leading-8 text-white/70 lg:text-[22px] lg:leading-9">
              {subtitle}
            </p>
          </div>

          <div
            className={`transition-all duration-[1250ms] ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ animation: revealed ? "artist-mini-hero-fade 1.2s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,24,42,0.72),rgba(5,10,18,0.58))] p-5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(146,188,255,0.06)]">
              <div className="text-[10px] uppercase tracking-[0.32em] text-white/38">Artist Stage</div>

              {metaLine && (
                <div className="mt-5 text-[14px] leading-7 text-white/72">
                  {metaLine}
                </div>
              )}

              <button
                type="button"
                onClick={handleEnter}
                className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[#a8cbff26] bg-[linear-gradient(180deg,rgba(10,18,30,0.88),rgba(5,10,18,0.82))] px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(148,187,255,0.08)] transition-transform duration-500 hover:scale-[1.02]"
              >
                <span>{ctaLabel}</span>
                <span className="text-white/42 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
