import { useEffect, useRef } from "react";

export default function ThreadsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const noise = (x, y) =>
      Math.sin(x * 0.002) + Math.cos(y * 0.002);

    const lines = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      life: 0,
    }));

    function draw() {
      // off-black background (important)
      ctx.fillStyle = "rgba(6,6,8,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";

      lines.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);

        const angle = noise(l.x, l.y) * Math.PI;
        l.x += Math.cos(angle) * 0.55;
        l.y += Math.sin(angle) * 0.55;

        ctx.lineTo(l.x, l.y);
        ctx.stroke();

        l.life++;
        if (
          l.x < 0 ||
          l.y < 0 ||
          l.x > canvas.width ||
          l.y > canvas.height ||
          l.life > 520
        ) {
          l.x = Math.random() * canvas.width;
          l.y = Math.random() * canvas.height;
          l.life = 0;
        }
      });

      requestAnimationFrame(draw);
    }

    ctx.fillStyle = "#060608";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20"
      />

      {/* radial glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      {/* top/bottom fade */}
      <div className="fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent -z-10" />
      <div className="fixed inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent -z-10" />
    </>
  );
}
