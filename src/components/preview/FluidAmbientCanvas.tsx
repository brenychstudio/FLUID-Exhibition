import React, { useEffect, useMemo, useRef } from "react";

type PointerState = {
  x: number;
  y: number;
};

type GlowNode = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  alpha: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawSoftBlob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation: number,
  fill: CanvasGradient | string,
  alpha = 1,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.scale(rx, ry);
  ctx.globalAlpha *= alpha;
  ctx.beginPath();
  ctx.moveTo(1, 0);
  ctx.bezierCurveTo(1.02, 0.58, 0.48, 1.04, 0, 1);
  ctx.bezierCurveTo(-0.54, 1.02, -1.04, 0.5, -1, 0);
  ctx.bezierCurveTo(-1.02, -0.56, -0.52, -1.02, 0, -1);
  ctx.bezierCurveTo(0.56, -1.02, 1.04, -0.52, 1, 0);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}

function drawReflectiveBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
  nodes: GlowNode[],
) {
  ctx.clearRect(0, 0, width, height);

  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#02050a");
  base.addColorStop(0.28, "#030814");
  base.addColorStop(0.62, "#03070f");
  base.addColorStop(1, "#020408");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const globalHaze = ctx.createRadialGradient(
    width * 0.48,
    height * 0.42,
    width * 0.02,
    width * 0.48,
    height * 0.42,
    width * 0.88,
  );
  globalHaze.addColorStop(0, "rgba(46,98,196,0.09)");
  globalHaze.addColorStop(0.35, "rgba(17,46,98,0.07)");
  globalHaze.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = globalHaze;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (const node of nodes) {
    const px = width * node.x + Math.sin(time * node.speed + node.drift) * width * 0.03 + pointer.x * 18;
    const py = height * node.y + Math.cos(time * node.speed * 0.82 + node.drift) * height * 0.026 + pointer.y * 14;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, node.radius);
    gradient.addColorStop(0, `rgba(146, 199, 255, ${node.alpha})`);
    gradient.addColorStop(0.38, `rgba(62, 126, 255, ${node.alpha * 0.38})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(px - node.radius, py - node.radius, node.radius * 2, node.radius * 2);
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 10; i += 1) {
    const progress = i / 9;
    const x = width * (0.08 + progress * 0.84);
    const bandWidth = width * (0.032 + (i % 3) * 0.011);
    const shift = Math.sin(time * 0.18 + i * 0.9) * width * 0.012 + pointer.x * 8;
    const band = ctx.createLinearGradient(x + shift - bandWidth, 0, x + shift + bandWidth, 0);
    band.addColorStop(0, "rgba(18,46,92,0)");
    band.addColorStop(0.5, i % 2 === 0 ? "rgba(86,142,255,0.08)" : "rgba(180,220,255,0.03)");
    band.addColorStop(1, "rgba(18,46,92,0)");
    ctx.fillStyle = band;
    ctx.fillRect(x + shift - bandWidth, 0, bandWidth * 2, height);
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 4; i += 1) {
    const y = height * (0.22 + i * 0.18);
    ctx.beginPath();
    for (let x = -40; x <= width + 40; x += 16) {
      const wave = Math.sin(time * 0.28 + i * 1.3 + x * 0.008) * 12 + Math.cos(time * 0.16 + x * 0.004) * 7;
      const yy = y + wave + pointer.y * 10;
      if (x === -40) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.lineWidth = i === 1 ? 1.4 : 1;
    ctx.strokeStyle = i % 2 === 0 ? "rgba(130,190,255,0.045)" : "rgba(220,240,255,0.02)";
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const blobA = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  blobA.addColorStop(0, "rgba(160,205,255,0.18)");
  blobA.addColorStop(0.32, "rgba(88,146,255,0.1)");
  blobA.addColorStop(1, "rgba(0,0,0,0)");
  drawSoftBlob(
    ctx,
    width * 0.3 + Math.sin(time * 0.12) * width * 0.02 + pointer.x * 10,
    height * 0.52 + Math.cos(time * 0.1) * height * 0.03,
    width * 0.12,
    height * 0.16,
    Math.sin(time * 0.08) * 0.35,
    blobA,
    0.52,
  );

  const blobB = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  blobB.addColorStop(0, "rgba(110,170,255,0.14)");
  blobB.addColorStop(0.4, "rgba(62,118,255,0.08)");
  blobB.addColorStop(1, "rgba(0,0,0,0)");
  drawSoftBlob(
    ctx,
    width * 0.72 + Math.cos(time * 0.11 + 2.2) * width * 0.022 + pointer.x * 8,
    height * 0.38 + Math.sin(time * 0.09 + 1.3) * height * 0.024,
    width * 0.1,
    height * 0.13,
    Math.cos(time * 0.07) * 0.4,
    blobB,
    0.5,
  );
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(122, 165, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 52) {
    const offset = Math.sin(time * 0.14 + x * 0.004) * 2;
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x - offset, height);
    ctx.stroke();
  }
  ctx.restore();
}

function useReflectiveCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const nodes = useMemo<GlowNode[]>(
    () => [
      { x: 0.16, y: 0.16, radius: 360, speed: 0.12, drift: 0.4, alpha: 0.16 },
      { x: 0.76, y: 0.14, radius: 280, speed: 0.1, drift: 1.4, alpha: 0.12 },
      { x: 0.34, y: 0.54, radius: 320, speed: 0.08, drift: 2.2, alpha: 0.11 },
      { x: 0.86, y: 0.6, radius: 290, speed: 0.1, drift: 3.5, alpha: 0.09 },
      { x: 0.56, y: 0.86, radius: 340, speed: 0.08, drift: 4.1, alpha: 0.08 },
    ],
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      const x = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
      const y = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
      pointerRef.current = {
        x: clamp(x, -0.5, 0.5),
        y: clamp(y, -0.5, 0.5),
      };
    };

    const render = (timestamp: number) => {
      if (!mounted) return;
      drawReflectiveBackground(
        ctx,
        canvas.clientWidth,
        canvas.clientHeight,
        timestamp * 0.001,
        pointerRef.current,
        nodes,
      );
      animationRef.current = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove);
    animationRef.current = window.requestAnimationFrame(render);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [canvasRef, nodes]);
}

function FluidContours() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="ambient-fluid-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(120,180,255,0)" />
          <stop offset="35%" stopColor="rgba(170,215,255,0.14)" />
          <stop offset="65%" stopColor="rgba(86,148,255,0.12)" />
          <stop offset="100%" stopColor="rgba(120,180,255,0)" />
        </linearGradient>
      </defs>
      <path d="M-20 180 C 140 120, 230 260, 360 210 S 620 130, 780 190 S 980 260, 1040 210" fill="none" stroke="url(#ambient-fluid-line)" strokeWidth="1.2" />
      <path d="M-10 230 C 110 200, 210 300, 360 250 S 620 170, 770 230 S 960 300, 1010 280" fill="none" stroke="url(#ambient-fluid-line)" strokeWidth="1" />
      <path d="M40 330 C 170 290, 260 360, 360 338 S 620 292, 790 344 S 930 392, 980 382" fill="none" stroke="url(#ambient-fluid-line)" strokeWidth="1" />
      <path d="M100 410 C 220 390, 320 450, 430 432 S 640 396, 760 422 S 880 450, 960 442" fill="none" stroke="url(#ambient-fluid-line)" strokeWidth="0.9" />
    </svg>
  );
}

export default function FluidAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useReflectiveCanvas(canvasRef);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,160,255,0.10),transparent_28%),radial-gradient(circle_at_85%_22%,rgba(53,109,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_24%,rgba(0,0,0,0.16)_100%)]" />
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[8%] top-[12%] h-[34%] w-[22%] rounded-full bg-[#7aaeff1a] blur-[90px]" />
        <div className="absolute right-[10%] top-[22%] h-[28%] w-[18%] rounded-full bg-[#4e86ff14] blur-[80px]" />
        <div className="absolute left-[34%] bottom-[8%] h-[22%] w-[26%] rounded-full bg-[#a4d2ff10] blur-[96px]" />
      </div>
      <div className="absolute inset-0 opacity-70">
        <FluidContours />
      </div>
    </div>
  );
}
