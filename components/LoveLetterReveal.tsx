'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoveLetterRevealProps {
    letter: string;
    signature?: string;
}

export default function LoveLetterReveal({ letter, signature = 'With all my love' }: LoveLetterRevealProps) {
    const [revealedText, setRevealedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < letter.length) {
            const timeout = setTimeout(() => {
                setRevealedText(letter.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 30); // Typewriter speed

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, letter]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <div
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 md:p-12 netflix-shadow"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' result='noise' numOctaves='5'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23f5f5dc' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.3'/%3E%3C/svg%3E")`,
                }}
            >
                <div className="font-handwritten text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                    {revealedText}
                    {currentIndex < letter.length && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-0.5 h-6 bg-gray-800 ml-1"
                        />
                    )}
                </div>

                {currentIndex >= letter.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-right font-handwritten text-xl text-gray-700 italic"
                    >
                        {signature}
                    </motion.div>
                )}
            </div>

            {/* Paper edge effect */}
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-amber-200/50 rounded-lg -z-10" />
        </motion.div>
    );
}
