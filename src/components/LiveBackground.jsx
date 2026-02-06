import { useRef, useEffect } from "react";

export default function LiveBackground({ onReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    let cancelled = false;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const init = () => {
      if (cancelled) return;

      let running = false;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      const dots = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));

      function draw() {
        if (document.hidden) {
          running = false;
          rafId = 0;
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach((d) => {
          d.x += d.vx;
          d.y += d.vy;

          if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
          if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fill();
        });

        rafId = requestAnimationFrame(draw);
      }

      onReady?.();
      const start = () => {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(draw);
      };

      const stop = () => {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
      };

      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };

      document.addEventListener("visibilitychange", onVisibility);
      start();

      return () => {
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        stop();
      };
    };

    let cleanup = null;
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(
        () => {
          cleanup = init();
        },
        { timeout: 1200 }
      );
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(idleId);
        if (cleanup) cleanup();
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    cleanup = init();
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onReady]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-20 bg-black" />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top, rgba(167,244,50,0.12) 0%, rgba(0,0,0,0) 55%)",
        }}
      />
      <div className="fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent -z-10" />
      <div className="fixed inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent -z-10" />
    </>
  );
}
