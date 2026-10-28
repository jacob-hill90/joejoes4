import { useCallback, useEffect, useRef, useState } from "react";

const W = 800;
const H = 440;
const GRAVITY = 24;
const BALL_RADIUS = 0.18;
const CROSSBAR = 3.05;
const UPRIGHT_HALF_WIDTH = 2.82;

function roundFor(level) {
  return {
    distance: Math.min(18 + (level - 1) * 4, 58),
    side: level === 1 ? 0 : (level % 2 === 0 ? -1 : 1) * Math.min(1.25 + (level - 2) * 0.65, 6.5),
  };
}

function initialGame() {
  return { level: 1, score: 0, phase: "ready", ball: null, drag: null, elapsed: 0, resultTime: 0, goalOffset: 0, lastTime: 0 };
}

function project(x, y, z, distance) {
  const depth = Math.max(1, y + 9);
  const scale = 750 / depth;
  return { x: W / 2 + x * scale, y: 306 - (z - 1.6) * scale, scale };
}

function goalShift(level, elapsed) {
  return level >= 5 ? Math.sin(elapsed * (0.8 + Math.min(level, 12) * 0.035)) * Math.min((level - 4) * 0.28, 1.8) : 0;
}

function drawFootball(ctx, x, y, size, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = "#f8f9fa";
  ctx.strokeStyle = "#111";
  ctx.lineWidth = Math.max(1.4, size * 0.11);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.8, -size * 0.45, size * 0.8, size * 0.45, 0, size);
  ctx.bezierCurveTo(-size * 0.8, size * 0.45, -size * 0.8, -size * 0.45, 0, -size);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = Math.max(1, size * 0.075);
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.48);
  ctx.lineTo(0, size * 0.48);
  for (let i = -2; i <= 2; i++) {
    const yy = i * size * 0.16;
    ctx.moveTo(-size * 0.18, yy);
    ctx.lineTo(size * 0.18, yy);
  }
  ctx.stroke();
  ctx.restore();
}

function draw(ctx, game) {
  const { distance, side } = roundFor(game.level);
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#f8f9fa";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#111";
  ctx.lineCap = "square";

  // Ground horizon and field markers, all in perspective.
  const horizon = 304;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(W, horizon);
  ctx.stroke();
  for (let yards = 5; yards < distance; yards += 5) {
    const near = project(-24 - side, yards, 0, distance);
    const far = project(24 - side, yards, 0, distance);
    if (near.y > horizon && near.y < H + 80) {
      ctx.beginPath();
      ctx.moveTo(Math.max(-50, near.x), near.y);
      ctx.lineTo(Math.min(W + 50, far.x), far.y);
      ctx.stroke();
    }
  }
  ctx.setLineDash([5, 12]);
  ctx.beginPath();
  for (let yards = 1; yards < distance; yards += 1.5) {
    const p = project(-side, yards, 0, distance);
    if (yards === 1) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Goal: drawn before the flying ball.
  const gx = -side + game.goalOffset;
  const left = project(gx - UPRIGHT_HALF_WIDTH, distance, CROSSBAR, distance);
  const right = project(gx + UPRIGHT_HALF_WIDTH, distance, CROSSBAR, distance);
  const topLeft = project(gx - UPRIGHT_HALF_WIDTH, distance, CROSSBAR + 6, distance);
  const topRight = project(gx + UPRIGHT_HALF_WIDTH, distance, CROSSBAR + 6, distance);
  const center = project(gx, distance, CROSSBAR, distance);
  const base = project(gx, distance, 0, distance);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = Math.max(2.5, Math.min(6, center.scale * 0.23));
  ctx.beginPath();
  ctx.moveTo(topLeft.x, topLeft.y);
  ctx.lineTo(left.x, left.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(topRight.x, topRight.y);
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(base.x, base.y);
  ctx.stroke();

  if (game.phase === "ready" || game.phase === "dragging") {
    const x = W / 2;
    const y = 383;
    if (game.drag) {
      const dx = game.drag.dx;
      const dy = game.drag.dy;
      ctx.strokeStyle = "#777";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y + dy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#111";
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.stroke();
      drawFootball(ctx, x + dx, y + dy, 18);
    } else {
      drawFootball(ctx, x, y, 18);
    }
  } else if (game.ball) {
    const b = game.ball;
    const p = project(b.x, b.y, b.z, distance);
    if (p.y > -80 && p.y < H + 80 && p.x > -80 && p.x < W + 80) {
      drawFootball(ctx, p.x, p.y, Math.max(3, Math.min(20, p.scale * 0.24)), b.t * 5);
    }
  }
}

export default function FieldGoalGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef(initialGame());
  const pointerRef = useRef(null);
  const [ui, setUi] = useState({ level: 1, score: 0, phase: "ready", best: 0 });

  const sync = useCallback(() => {
    const g = gameRef.current;
    setUi(old => ({ ...old, level: g.level, score: g.score, phase: g.phase }));
  }, []);

  useEffect(() => {
    try {
      const best = Number(window.localStorage.getItem("fieldGoalBest") || 0);
      setUi(old => ({ ...old, best }));
    } catch { /* Storage may be disabled. */ }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;
    const tick = time => {
      const g = gameRef.current;
      const dt = g.lastTime ? Math.min((time - g.lastTime) / 1000, 0.04) : 0;
      g.lastTime = time;
      g.elapsed += dt;
      g.goalOffset = goalShift(g.level, g.elapsed);
      if (g.phase === "flying" && g.ball) {
        const b = g.ball;
        const prevY = b.y;
        b.t += dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.z += b.vz * dt - 0.5 * GRAVITY * dt * dt;
        b.vz -= GRAVITY * dt;
        const { distance, side } = roundFor(g.level);
        if (prevY < distance && b.y >= distance) {
          const alpha = (distance - prevY) / (b.y - prevY || 1);
          const xAtGoal = b.x - b.vx * dt * (1 - alpha);
          const zAtGoal = b.z - (b.vz + GRAVITY * dt) * dt * (1 - alpha) + 0.5 * GRAVITY * (dt * (1 - alpha)) ** 2;
          const goalX = -side + g.goalOffset;
          const made = Math.abs(xAtGoal - goalX) < UPRIGHT_HALF_WIDTH - BALL_RADIUS && zAtGoal > CROSSBAR + BALL_RADIUS;
          if (made) {
            g.score += 3;
            g.phase = "made";
            g.resultTime = 0;
            setUi(old => {
              const best = Math.max(old.best, g.score);
              try { window.localStorage.setItem("fieldGoalBest", String(best)); } catch { /* ignore */ }
              return { ...old, score: g.score, phase: "made", best };
            });
          } else {
            g.phase = "over";
            sync();
          }
        } else if (b.z <= 0 || b.y > distance + 8 || b.t > 6) {
          g.phase = "over";
          sync();
        }
      } else if (g.phase === "made") {
        g.resultTime += dt;
        if (g.resultTime > 1.1) {
          g.level += 1;
          g.phase = "ready";
          g.ball = null;
          g.drag = null;
          sync();
        }
      }
      draw(ctx, g);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [sync]);

  function point(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * W / rect.width, y: (event.clientY - rect.top) * H / rect.height };
  }

  function down(event) {
    const g = gameRef.current;
    if (g.phase !== "ready") return;
    const p = point(event);
    if (Math.hypot(p.x - W / 2, p.y - 383) > 65) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = event.pointerId;
    g.phase = "dragging";
    g.drag = { dx: 0, dy: 0 };
    sync();
  }

  function move(event) {
    const g = gameRef.current;
    if (g.phase !== "dragging" || pointerRef.current !== event.pointerId) return;
    const p = point(event);
    g.drag = {
      dx: Math.max(-150, Math.min(150, p.x - W / 2)),
      dy: Math.max(0, Math.min(135, p.y - 383)),
    };
  }

  function up(event) {
    const g = gameRef.current;
    if (g.phase !== "dragging" || pointerRef.current !== event.pointerId) return;
    pointerRef.current = null;
    const drag = g.drag;
    g.drag = null;
    if (!drag || drag.dy < 12) {
      g.phase = "ready";
      sync();
      return;
    }
    // The pull determines both forward speed and vertical launch speed.
    const power = Math.min(drag.dy / 110, 1.22);
    g.ball = {
      x: 0, y: 0, z: 0.28, t: 0,
      vx: -drag.dx * 0.085 * power,
      vy: 19 + 27 * power,
      vz: 13 + 12 * power,
    };
    g.phase = "flying";
    sync();
  }

  function reset() {
    gameRef.current = initialGame();
    pointerRef.current = null;
    sync();
  }

  const { distance } = roundFor(ui.level);
  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-black bg-[#f8f9fa] text-black">
      <div className="flex items-center justify-between gap-2 border-b border-black px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider sm:px-6 sm:text-sm">
        <span>FIELD GOAL <span className="hidden sm:inline">/ LEVEL {ui.level}</span></span>
        <span>{distance} YDS</span>
        <span>SCORE {ui.score}</span>
        <span>BEST {ui.best}</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          className="block w-full cursor-grab select-none active:cursor-grabbing"
          style={{ touchAction: "none" }}
          aria-label="Field goal game. Drag the football down and sideways, then release to kick."
        />
        {ui.phase === "made" && (
          <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 bg-[#f8f9fa] px-4 py-2 font-mono text-2xl font-black sm:text-4xl">GOOD!</div>
        )}
        {ui.phase === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f8f9fa]/95 font-mono">
            <h2 className="text-3xl font-black sm:text-5xl">GAME OVER</h2>
            <p className="text-sm">FINAL SCORE: {ui.score}</p>
            <button onClick={reset} className="border-2 border-black px-6 py-3 text-sm font-bold transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">PLAY AGAIN</button>
          </div>
        )}
      </div>
      <div className="border-t border-black px-3 py-3 text-center font-mono text-[11px] uppercase tracking-wider sm:text-xs">
        {ui.phase === "dragging" ? "Release to kick" : ui.phase === "ready" ? "Drag football down to power up · Sideways to aim" : ui.phase === "flying" ? "Ball in flight..." : ui.phase === "made" ? "+3 points! Next kick..." : "One miss ends the game"}
      </div>
    </div>
  );
}
