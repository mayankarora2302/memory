'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';

export default function Episode4TeddyDay() {
    // TODO: PERSONALIZE - Add your cozy memories
    const comfortMessage = `When life slowed down, they chose to pause together. A secret third month anniversary escape to Lonavla. A quiet lake stay wrapped in monsoon mist.
    Surrounded by rain, a slow dance while thunder rolled across the hills. Music, laughter, and a closeness that felt deeper than ever.
    The next morning, waterfalls rushed beside their train back to Mumbai, carrying memories strong enough to last six months.

    Season 4 is where love bloomed fully and learned how to hold on for what's coming next.`;

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/four.mp4" />

            {/* Teddy Theme Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-6xl mb-6">⛰️</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#D4A574' }}>
                    Lonavla Days
                </h3>
                <p className="text-xl text-netflix-lightGray max-w-3xl mx-auto leading-relaxed whitespace-pre-line italic">
                    {comfortMessage}
                </p>
            </motion.div>

            {/* Floating Rain/Steam Effect */}
            <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-r from-blue-900/20 to-teal-900/20">
                <div className="absolute inset-0 flex items-center justify-center gap-8">
                    {['🌧️', '⛈️', '🏠', '⛰️', '🌫️'].map((emoji, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                            className="text-5xl"
                        >
                            {emoji}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
