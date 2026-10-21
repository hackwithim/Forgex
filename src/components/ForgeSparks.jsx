import React, { useEffect, useRef } from 'react';

export default function ForgeSparks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particleCount = Math.min(65, Math.floor(width / 22));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: -(Math.random() * 0.9 + 0.3),
        opacity: Math.random() * 0.7 + 0.2,
        decay: Math.random() * 0.003 + 0.001,
        color: Math.random() > 0.4 ? '255, 94, 20' : '255, 175, 40'
      });
    }

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(6, Math.abs(currentScrollY - lastScrollY) * 0.12);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY - scrollVelocity * 0.8;
        p.x += p.speedX;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y < -10) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.opacity = Math.random() * 0.7 + 0.3;
          p.speedY = -(Math.random() * 0.9 + 0.3);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
      aria-hidden="true"
    />
  );
}
