'use client';

import { motion } from 'framer-motion';

export default function LightLeaks() {
    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(229,9,20,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <motion.div
                className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                }}
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </>
    );
}
