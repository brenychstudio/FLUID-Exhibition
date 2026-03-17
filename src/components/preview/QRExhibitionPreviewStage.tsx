import React, { useEffect, useMemo, useRef, useState } from "react";
import QRFluidHeroStage from "../hero/QRFluidHeroStage";

type LocaleLink = {
  label: string;
  href: string;
  active?: boolean;
};

type InfoItem = {
  label: string;
  value: string;
};

type PreviewProps = {
  title?: string;
  subtitle?: string;
  dateLabel?: string;
  venueLabel?: string;
  curatorLabel?: string;
  onEnter?: () => void;
  localeLinks?: LocaleLink[];
  infoItems?: InfoItem[];
  heroTitle?: string;
  heroSubtitle?: string;
  heroMetaLabel?: string;
  heroCtaLabel?: string;
  mapsHref?: string;
  mapsLabel?: string;
};

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

const DEFAULT_TITLE = "FLUID";
const DEFAULT_SUBTITLE = "Nocturnal reflective exhibition interface / water, substance, fluid memory";

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
  globalHaze.addColorStop(0, "rgba(46,98,196,0.10)");
  globalHaze.addColorStop(0.35, "rgba(17,46,98,0.08)");
  globalHaze.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = globalHaze;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (const node of nodes) {
    const px = width * node.x + Math.sin(time * node.speed + node.drift) * width * 0.035 + pointer.x * 44;
    const py = height * node.y + Math.cos(time * node.speed * 0.82 + node.drift) * height * 0.03 + pointer.y * 30;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, node.radius);
    gradient.addColorStop(0, `rgba(146, 199, 255, ${node.alpha})`);
    gradient.addColorStop(0.38, `rgba(62, 126, 255, ${node.alpha * 0.42})`);
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
    const shift = Math.sin(time * 0.22 + i * 0.9) * width * 0.016 + pointer.x * 20;
    const band = ctx.createLinearGradient(x + shift - bandWidth, 0, x + shift + bandWidth, 0);
    band.addColorStop(0, "rgba(18,46,92,0)");
    band.addColorStop(0.5, i % 2 === 0 ? "rgba(86,142,255,0.11)" : "rgba(180,220,255,0.048)");
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
      const wave = Math.sin(time * 0.44 + i * 1.3 + x * 0.008) * 18 + Math.cos(time * 0.24 + x * 0.004) * 10;
      const yy = y + wave + pointer.y * 22;
      if (x === -40) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.lineWidth = i === 1 ? 2 : 1.2;
    ctx.strokeStyle = i % 2 === 0 ? "rgba(130,190,255,0.06)" : "rgba(220,240,255,0.035)";
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const blobA = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  blobA.addColorStop(0, "rgba(160,205,255,0.28)");
  blobA.addColorStop(0.32, "rgba(88,146,255,0.16)");
  blobA.addColorStop(1, "rgba(0,0,0,0)");
  drawSoftBlob(
    ctx,
    width * 0.3 + Math.sin(time * 0.2) * width * 0.03 + pointer.x * 24,
    height * 0.52 + Math.cos(time * 0.16) * height * 0.04,
    width * 0.14,
    height * 0.18,
    Math.sin(time * 0.1) * 0.35,
    blobA,
    0.7,
  );

  const blobB = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  blobB.addColorStop(0, "rgba(110,170,255,0.22)");
  blobB.addColorStop(0.4, "rgba(62,118,255,0.12)");
  blobB.addColorStop(1, "rgba(0,0,0,0)");
  drawSoftBlob(
    ctx,
    width * 0.72 + Math.cos(time * 0.17 + 2.2) * width * 0.03 + pointer.x * 18,
    height * 0.38 + Math.sin(time * 0.14 + 1.3) * height * 0.03,
    width * 0.11,
    height * 0.15,
    Math.cos(time * 0.1) * 0.4,
    blobB,
    0.68,
  );
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(122, 165, 255, 0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 44) {
    const offset = Math.sin(time * 0.18 + x * 0.004) * 2;
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x - offset, height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.22;
  for (let i = 0; i < 40; i += 1) {
    const px = ((i * 137.2) % width) + Math.sin(time * 0.4 + i) * 18;
    const py = ((i * 89.6) % height) + Math.cos(time * 0.34 + i * 0.4) * 12;
    ctx.fillStyle = i % 4 === 0 ? "rgba(190,225,255,0.42)" : "rgba(126,176,255,0.24)";
    ctx.fillRect(px, py, i % 3 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
  ctx.restore();
}

function useReflectiveCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const nodes = useMemo<GlowNode[]>(
    () => [
      { x: 0.16, y: 0.16, radius: 360, speed: 0.16, drift: 0.4, alpha: 0.24 },
      { x: 0.76, y: 0.14, radius: 280, speed: 0.12, drift: 1.4, alpha: 0.18 },
      { x: 0.34, y: 0.54, radius: 320, speed: 0.1, drift: 2.2, alpha: 0.15 },
      { x: 0.86, y: 0.6, radius: 290, speed: 0.16, drift: 3.5, alpha: 0.12 },
      { x: 0.56, y: 0.86, radius: 340, speed: 0.1, drift: 4.1, alpha: 0.1 },
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

const DEFAULT_LOCALE_LINKS: LocaleLink[] = [
  { label: "CA", href: "/ca/exhibition" },
  { label: "ES", href: "/es/exhibition" },
  { label: "EN", href: "/en/exhibition", active: true },
];

const DEFAULT_INFO_ITEMS: InfoItem[] = [
  { label: "Venue", value: "Venue Name" },
  { label: "Address", value: "Full venue address" },
  { label: "Dates", value: "26 MARCH — 17 APRIL 2026" },
  { label: "Hours", value: "18:00 — 22:00" },
  { label: "Organizer", value: "Organizer Name" },
  { label: "Curator", value: "Curator Name" },
];

export default function QRExhibitionPreviewStage({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  dateLabel = "26 MARCH — 17 APRIL 2026",
  venueLabel = "BARCELONA / SANTLLUC CERCLE ARTÍSTIC",
  curatorLabel = "COLLABORATIVE EXHIBITION",
  onEnter,
  localeLinks = DEFAULT_LOCALE_LINKS,
  infoItems = DEFAULT_INFO_ITEMS,
  heroTitle = "FLUID",
  heroSubtitle = "Liquid morphing substance / nocturnal reflection / living memory",
  heroMetaLabel = "Liquid Hero Window",
  heroCtaLabel = "Enter Exhibition",
  mapsHref = "",
  mapsLabel = "Open in Maps",
}: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [entering, setEntering] = useState(false);

  useReflectiveCanvas(canvasRef);

  useEffect(() => {
    const timeout = window.setTimeout(() => setRevealed(true), 90);
    return () => window.clearTimeout(timeout);
  }, []);

  const handleEnter = () => {
    setEntering(true);

    window.setTimeout(() => {
      if (onEnter) {
        onEnter();
      } else {
        const target = document.getElementById("artists");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.setTimeout(() => setEntering(false), 260);
    }, 120);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050b] text-white">
      <style>{`
        @keyframes qr-poster-fade {
          from { opacity: 0; transform: translateY(22px); filter: blur(20px); }
          to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
        }
        @keyframes qr-reflection-sweep {
          0% { transform: translateX(-24%) skewX(-10deg); opacity: .04; }
          50% { opacity: .14; }
          100% { transform: translateX(18%) skewX(-10deg); opacity: .05; }
        }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,160,255,0.16),transparent_28%),radial-gradient(circle_at_85%_22%,rgba(53,109,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_24%,rgba(0,0,0,0.2)_100%)]" />

      <div className={`absolute inset-0 z-30 bg-[#02050b] transition-opacity duration-700 ${entering ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,145,255,0.14),transparent_34%)]" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1480px] flex-col px-6 py-6 lg:px-10 lg:py-8">
        <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,42,0.64),rgba(4,10,18,0.62))] px-4 py-3 backdrop-blur-xl shadow-[0_0_0_1px_rgba(120,170,255,0.06),0_28px_100px_rgba(0,0,0,0.28)] lg:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-[13px] uppercase tracking-[0.34em] text-white/92">QR Fluid</div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-[12px] uppercase tracking-[0.22em] text-white/72">
  {localeLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="rounded-full px-3 py-2 font-semibold transition"
      style={
        link.active
          ? {
              background: "#ffffff",
              color: "#02050b",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.16)",
            }
          : {
              color: "rgba(255,255,255,0.74)",
            }
      }
    >
      {link.label}
    </a>
  ))}
</div>
          </div>
        </div>

        <div className="grid flex-1 gap-8 pt-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(340px,0.72fr)] lg:pt-10">
          <div className={`min-w-0 space-y-6 transition-all duration-1000 ${revealed ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-xl"}`}>
            <div className="inline-flex rounded-full border border-[#9bc4ff22] bg-[#16223899] px-5 py-3 text-[12px] uppercase tracking-[0.32em] text-[#eff5ff] backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(160,200,255,0.04)]">
              Exhibition Preview
            </div>

            <div className="max-w-[920px] min-w-0">
              <div className="text-[11px] uppercase tracking-[0.42em] text-white/36">Nocturnal Reflective Fluid</div>
              <h1 className="mt-5 max-w-[9ch] text-[clamp(54px,8vw,128px)] font-semibold leading-[0.92] tracking-[-0.05em] text-white [text-wrap:balance]">
                {title}
              </h1>
              <p className="mt-5 max-w-[44rem] text-[18px] leading-8 text-white/62 lg:text-[22px] lg:leading-9">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[dateLabel, venueLabel].map((label) => (
                <div
                  key={label}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[12px] uppercase tracking-[0.28em] text-white/78 backdrop-blur-lg"
                >
                  {label}
                </div>
              ))}

              <button
                type="button"
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#a8cbff26] bg-[linear-gradient(180deg,rgba(10,18,30,0.88),rgba(5,10,18,0.82))] px-5 py-3 text-[12px] uppercase tracking-[0.3em] text-white shadow-[0_18px_60px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(148,187,255,0.08)] transition-transform duration-500 hover:scale-[1.02]"
              >
                <span className="absolute inset-y-0 left-[-18%] w-[34%] bg-[linear-gradient(90deg,transparent,rgba(168,208,255,0.16),transparent)] group-hover:[animation:qr-reflection-sweep_1.6s_ease-in-out_forwards]" />
                <span>{entering ? "Entering" : "Enter Exhibition"}</span>
                <span className="text-white/42 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          <div className={`transition-all delay-150 duration-1000 ${revealed ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-xl"}`}>
            <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,24,42,0.74),rgba(5,10,18,0.58))] p-6 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_0_0_1px_rgba(146,188,255,0.06)] lg:p-7">
              <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-[14px] leading-7 text-white/58 lg:text-[16px]">
                {infoItems.map((item) => (
                  <React.Fragment key={`${item.label}-${item.value}`}>
                    <div>{item.label}</div>
                    <div className="text-right text-white/92">{item.value}</div>
                  </React.Fragment>
                ))}
              </div>

              {mapsHref && (
                <div className="mt-6 flex justify-end">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#a8cbff26] bg-[linear-gradient(180deg,rgba(10,18,30,0.88),rgba(5,10,18,0.82))] px-4 py-3 text-[12px] uppercase tracking-[0.28em] text-white shadow-[0_18px_60px_rgba(0,0,0,0.24),inset_0_0_0_1px_rgba(148,187,255,0.08)] transition hover:scale-[1.02]"
                  >
                    <span>{mapsLabel}</span>
                    <span className="text-white/42">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`mt-6 transition-all delay-300 duration-1000 ${revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ animation: revealed ? "qr-poster-fade 1.25s cubic-bezier(0.22,1,0.36,1) both" : "none" }}>
          <QRFluidHeroStage
            title={heroTitle}
            subtitle={heroSubtitle}
            metaLabel={heroMetaLabel}
            ctaLabel={heroCtaLabel}
            onEnter={handleEnter}
          />
        </div>
      </div>
    </div>
  );
}

