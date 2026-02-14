'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypingLetterProps {
    content: string;
    speed?: number;
}

export default function TypingLetter({ content, speed = 30 }: TypingLetterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < content.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + content[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, content, speed]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-netflix-darkGray/50 to-black/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-netflix-red/20 shadow-2xl"
        >
            <div className="text-netflix-lightGray font-medium text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {displayedText}
                {currentIndex < content.length && (
                    <span className="inline-block w-0.5 h-5 bg-netflix-red ml-1 animate-pulse" />
                )}
            </div>
        </motion.div>
    );
}
