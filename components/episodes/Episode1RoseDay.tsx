'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';

export default function Episode1RoseDay() {
    // TODO: PERSONALIZE - Add your own love message
    const loveMessage = `One wrong text. One destined reply. Within days two architects who were strangers became certain. Kundalis aligned. Families gathered. Futures were questioned. But while the world debated, they had already chosen each other. Somewhere between secret site dates and silent prayers, an arranged beginning turned into unstoppable love.`;

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/one.mp4" />

            {/* Intro Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
            >
                <div className="text-6xl mb-6">🌹</div>
                <p className="text-xl md:text-2xl text-netflix-lightGray leading-relaxed whitespace-pre-line font-medium italic">
                    {loveMessage}
                </p>
            </motion.div>

            {/* Animated Rose Petals Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-pink-900/20 to-red-900/20 flex items-center justify-center"
            >
                <div className="text-4xl space-x-4">
                    {['🌹', '🌹', '🌹', '🌹', '🌹'].map((rose, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="inline-block"
                        >
                            {rose}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Closing Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center italic text-xl text-netflix-lightGray"
            >
                "A rose by any other name would smell as sweet, but you are my only rose." 🌹
            </motion.div>
        </div>
    );
}
