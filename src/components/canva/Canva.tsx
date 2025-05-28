import { useEffect, useRef } from 'react';
import './canva.css'

export default function Canva() {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas : any = canvasRef.current;
    const wrapper : any = wrapperRef.current;

    const ctx : CanvasRenderingContext2D = canvas.getContext("2d");
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = wrapper.scrollHeight);

    console.log()

    const pointCount = Math.round(height/10);
    console.log(pointCount)
    const range = 150;
    const points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < pointCount; i++) {
        for (let j = i + 1; j < pointCount; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < range) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / range})`;
            ctx.shadowColor = "#0ff";
            // ctx.shadowBlur = 0.1;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Puntos y movimiento
      points.forEach((p) => {
        ctx.fillStyle = "#24bcec";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = wrapper.scrollHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    return (
        <div className="canvas-wrapper" ref={wrapperRef}>
            <canvas ref={canvasRef} className="canva-historial" />
            
            <div className="container-nosotros">
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1> <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1> <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1> <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1> <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1> <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
                <h1>AAAAAAAAAAAAAAAAA</h1>
           
            </div>
        </div>
    )
}
