import React, { useEffect, useMemo, useRef, useState } from "react";

type QRFluidHeroStageProps = {
  title?: string;
  subtitle?: string;
  metaLabel?: string;
  ctaLabel?: string;
  className?: string;
  onEnter?: () => void;
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

const DEFAULT_TITLE = "QR FLUID";
const DEFAULT_SUBTITLE = "Water-memory / nocturnal reflection / living substance";
const DEFAULT_META = "Hero Window Stage";

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

function seededBlobs(): Blob[] {
  return [
    { x: 0.48, y: 0.46, radius: 0.16, driftX: 0.025, driftY: 0.018, speed: 0.18, phase: 0.1, stretchX: 1.45, stretchY: 0.92 },
    { x: 0.58, y: 0.44, radius: 0.13, driftX: 0.02, driftY: 0.014, speed: 0.21, phase: 1.1, stretchX: 1.18, stretchY: 0.86 },
    { x: 0.42, y: 0.56, radius: 0.12, driftX: 0.018, driftY: 0.02, speed: 0.16, phase: 2.2, stretchX: 0.98, stretchY: 1.16 },
    { x: 0.6, y: 0.58, radius: 0.11, driftX: 0.016, driftY: 0.015, speed: 0.22, phase: 3.0, stretchX: 1.05, stretchY: 0.88 },
    { x: 0.38, y: 0.42, radius: 0.095, driftX: 0.016, driftY: 0.014, speed: 0.25, phase: 4.0, stretchX: 0.9, stretchY: 1.18 },
    { x: 0.68, y: 0.42, radius: 0.085, driftX: 0.014, driftY: 0.012, speed: 0.26, phase: 4.9, stretchX: 0.82, stretchY: 1.12 },
    { x: 0.52, y: 0.64, radius: 0.09, driftX: 0.014, driftY: 0.015, speed: 0.19, phase: 5.8, stretchX: 1.28, stretchY: 0.84 },
    { x: 0.31, y: 0.56, radius: 0.07, driftX: 0.012, driftY: 0.015, speed: 0.23, phase: 6.4, stretchX: 0.84, stretchY: 1.08 },
    { x: 0.72, y: 0.56, radius: 0.072, driftX: 0.012, driftY: 0.011, speed: 0.2, phase: 7.1, stretchX: 0.92, stretchY: 0.98 },
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
  const lowW = Math.max(260, Math.floor(width / 3.2));
  const lowH = Math.max(160, Math.floor(height / 3.2));

  if (lowCtx.canvas.width !== lowW || lowCtx.canvas.height !== lowH) {
    lowCtx.canvas.width = lowW;
    lowCtx.canvas.height = lowH;
  }

  const imageData = lowCtx.createImageData(lowW, lowH);
  const data = imageData.data;

  const pointerX = 0.5 + pointer.x * 0.18;
  const pointerY = 0.5 + pointer.y * 0.12;
  const hoverBoost = 0.14 + pointer.active * 0.16;

  const liveBlobs = blobs.map((blob, index) => ({
    x: blob.x + Math.sin(time * blob.speed + blob.phase) * blob.driftX + pointer.x * (index % 2 === 0 ? 0.012 : -0.01),
    y: blob.y + Math.cos(time * blob.speed * 0.86 + blob.phase) * blob.driftY + pointer.y * (index % 3 === 0 ? 0.01 : -0.008),
    radius: blob.radius * (0.94 + Math.sin(time * 0.42 + blob.phase * 1.7) * 0.08),
    stretchX: blob.stretchX * (0.96 + Math.sin(time * 0.3 + blob.phase) * 0.06),
    stretchY: blob.stretchY * (0.96 + Math.cos(time * 0.28 + blob.phase) * 0.06),
  }));

  let offset = 0;
  for (let py = 0; py < lowH; py += 1) {
    for (let px = 0; px < lowW; px += 1) {
      let nx = px / lowW;
      let ny = py / lowH;

      const warpA = Math.sin((ny * 5.8 + time * 0.28) * Math.PI) * 0.022;
      const warpB = Math.cos((nx * 4.2 - time * 0.24) * Math.PI) * 0.018;
      const warpC = Math.sin((nx + ny) * 8.4 + time * 0.5) * 0.012;
      nx += warpA + warpC + pointer.x * 0.03;
      ny += warpB - warpC * 0.6 + pointer.y * 0.02;

      let field = 0;
      for (const blob of liveBlobs) {
        const dx = (nx - blob.x) / (blob.radius * blob.stretchX);
        const dy = (ny - blob.y) / (blob.radius * blob.stretchY);
        field += 1 / (dx * dx + dy * dy + 0.22);
      }

      const pdx = nx - pointerX;
      const pdy = ny - pointerY;
      field += pointer.active * 0.9 / (pdx * pdx + pdy * pdy + 0.08);

      const flow = Math.sin(nx * 14 + time * 0.8) * Math.cos(ny * 11 - time * 0.58) * 0.12;
      const swirl = Math.sin((nx * 9 - ny * 7) + time * 0.44) * 0.5 + 0.5;
      const chroma = Math.sin((nx - ny) * 16 + time * 0.36) * 0.5 + 0.5;

      const mask = smoothstep(2.2, 4.8, field + flow * hoverBoost);
      const core = smoothstep(4.8, 7.4, field + flow * 0.4);
      const rim = clamp(smoothstep(3.0, 4.1, field) - smoothstep(4.0, 5.3, field), 0, 1);
      const dissolve = 0.78 + Math.sin(nx * 22 - time * 0.7) * Math.cos(ny * 16 + time * 0.42) * 0.12;
      const alpha = clamp(mask * dissolve * (0.8 + rim * 0.16), 0, 1);

      const specular = rim * (0.42 + swirl * 0.3);
      const iridescence = rim * chroma * 0.22;
      const blueShift = Math.sin(time * 0.22 + nx * 12 - ny * 9) * 0.5 + 0.5;
      const cyanShift = Math.cos(time * 0.18 + nx * 8 + ny * 11) * 0.5 + 0.5;

      const r = Math.round(6 + 10 * mask + 88 * rim + 102 * core + 28 * specular + 8 * blueShift + 10 * iridescence);
      const g = Math.round(16 + 26 * mask + 90 * rim + 92 * core + 18 * specular + 14 * cyanShift + 8 * iridescence);
      const b = Math.round(38 + 78 * mask + 110 * rim + 118 * core + 24 * specular + 28 * blueShift + 16 * iridescence);

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
  target.filter = "blur(36px) saturate(118%)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "screen";
  target.globalAlpha = 0.78;
  target.filter = "blur(10px) saturate(128%) contrast(104%)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "screen";
  target.globalAlpha = 0.7;
  target.filter = "saturate(138%) contrast(112%)";
  target.drawImage(lowCtx.canvas, 0, 0, width, height);
  target.restore();

  target.save();
  target.imageSmoothingEnabled = true;
  target.globalCompositeOperation = "lighter";
  target.globalAlpha = 0.3;
  target.filter = "blur(3px)";
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
  base.addColorStop(0.18, "#030814");
  base.addColorStop(0.64, "#02060d");
  base.addColorStop(1, "#010307");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const haze = ctx.createRadialGradient(width * 0.5, height * 0.46, width * 0.04, width * 0.5, height * 0.46, width * 0.86);
  haze.addColorStop(0, "rgba(58,116,255,0.22)");
  haze.addColorStop(0.28, "rgba(27,70,170,0.10)");
  haze.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 8; i += 1) {
    const progress = i / 7;
    const x = width * (0.06 + progress * 0.88);
    const bandWidth = width * (0.03 + (i % 3) * 0.006);
    const shift = Math.sin(time * 0.14 + i * 0.8) * width * 0.01 + pointer.x * 10;
    const gradient = ctx.createLinearGradient(x - bandWidth + shift, 0, x + bandWidth + shift, 0);
    gradient.addColorStop(0, "rgba(17,40,90,0)");
    gradient.addColorStop(0.5, i % 2 === 0 ? "rgba(96,152,255,0.07)" : "rgba(220,238,255,0.024)");
    gradient.addColorStop(1, "rgba(17,40,90,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - bandWidth + shift, 0, bandWidth * 2, height);
  }
  ctx.restore();

  drawLiquidField(ctx, lowCtx, width, height, time, pointer, blobs);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(202,228,255,0.045)";
  for (let i = 0; i < 3; i += 1) {
    const baseY = height * (0.3 + i * 0.14);
    ctx.beginPath();
    for (let x = -30; x <= width + 30; x += 12) {
      const y = baseY + Math.sin(time * 0.46 + i * 1.1 + x * 0.009) * 6 + Math.cos(time * 0.22 + x * 0.004) * 3;
      if (x === -30) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = i === 1 ? 1 : 0.7;
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(190,220,255,0.12)";
  for (let i = 0; i < 24; i += 1) {
    const px = ((i * 131.7) % width) + Math.sin(time * 0.32 + i) * 8;
    const py = height * 0.24 + ((i * 77.4) % (height * 0.56)) + Math.cos(time * 0.28 + i * 0.4) * 10;
    const size = i % 4 === 0 ? 2 : 1;
    ctx.fillRect(px, py, size, size);
  }
  ctx.restore();
}

function useFluidWindow(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 });
  const animationRef = useRef<number | null>(null);
  const blobs = useMemo(() => seededBlobs(), []);

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

export default function QRFluidHeroStage({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  metaLabel = DEFAULT_META,
  ctaLabel = "Enter Exhibition",
  className = "",
  onEnter,
}: QRFluidHeroStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useFluidWindow(canvasRef);

  useEffect(() => {
    const timeout = window.setTimeout(() => setRevealed(true), 90);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative h-full min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#02050a] shadow-[0_28px_120px_rgba(0,0,0,0.34),inset_0_0_0_1px_rgba(140,190,255,0.05)] ${className}`}>
      <style>{`
        @keyframes qr-hero-window-fade {
          from { opacity: 0; transform: translateY(18px); filter: blur(18px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        @keyframes qr-hero-window-reflection {
          0% { transform: translateX(-20%) skewX(-10deg); opacity: .04; }
          50% { opacity: .14; }
          100% { transform: translateX(18%) skewX(-10deg); opacity: .05; }
        }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0)_22%,rgba(0,0,0,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(92,148,255,0.16),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(70,118,255,0.12),transparent_24%),radial-gradient(circle_at_50%_62%,rgba(188,222,255,0.04),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.014) 0%, rgba(255,255,255,0.005) 18%, rgba(255,255,255,0.011) 36%, rgba(255,255,255,0.003) 54%, rgba(255,255,255,0.011) 72%, rgba(255,255,255,0.003) 100%)" }} />
      <div className="pointer-events-none absolute inset-y-0 left-[-14%] w-[28%] bg-[linear-gradient(90deg,transparent,rgba(168,208,255,0.08),transparent)] [animation:qr-hero-window-reflection_8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex min-h-[430px] flex-col justify-between px-6 pb-6 pt-10 md:p-8">
        <div
          className={`max-w-[14rem] transition-all duration-1000 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ animation: revealed ? "qr-hero-window-fade 1s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
        >
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white/70 backdrop-blur-lg md:mb-5">
            {metaLabel}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <div
            className={`max-w-[48rem] transition-all duration-[1200ms] ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ animation: revealed ? "qr-hero-window-fade 1.1s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            <h2 className="mt-1 max-w-[10ch] text-[clamp(42px,5vw,84px)] font-semibold leading-[0.92] tracking-[-0.055em] text-white [text-wrap:balance] md:mt-0">
              {title}
            </h2>
            <p className="mt-4 max-w-[34rem] text-[17px] leading-8 text-white/60 lg:text-[20px] lg:leading-9">
              {subtitle}
            </p>
          </div>

          <div
            className={`transition-all duration-[1350ms] ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ animation: revealed ? "qr-hero-window-fade 1.25s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
          >
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,24,42,0.72),rgba(5,10,18,0.58))] p-5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(146,188,255,0.06)]">
              <div className="text-[10px] uppercase tracking-[0.32em] text-white/38">Substance Notes</div>
              <div className="mt-5 space-y-3 text-[14px] leading-7 text-white/56">
                <div className="flex items-start justify-between gap-4">
                  <span>Material</span>
                  <span className="text-right text-white/88">Liquid / morphing / dissolving</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>Motion</span>
                  <span className="text-right text-white/88">Fluid metamorphosis</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onEnter?.()}
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
