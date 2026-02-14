'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hearts: Array<{
            x: number;
            y: number;
            size: number;
            opacity: number;
            life: number;
        }> = [];

        const handleMouseMove = (e: MouseEvent) => {
            if (hearts.length > 50) return; // Density cap
            hearts.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 8 + 4,
                opacity: 1,
                life: 1,
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = hearts.length - 1; i >= 0; i--) {
                const heart = hearts[i];
                heart.life -= 0.02;
                heart.opacity = heart.life;
                heart.y -= 1;

                if (heart.life <= 0) {
                    hearts.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = heart.opacity;
                ctx.fillStyle = '#E50914';
                ctx.font = `${heart.size}px Arial`;
                ctx.fillText('❤', heart.x, heart.y);
                ctx.restore();
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
