'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';
import FlowerCatchGame from '../FlowerCatchGame';

export default function Episode2ProposeDay() {
    // TODO: PERSONALIZE - Add your own proposal message/monologue
    const proposalMonologue = `
    He wandered like a Bhawra. She bloomed like a Phool. But this wasn’t about chasing petals… it was about building roots. What started with rush and rebellion now slows into understanding. Between distance, doubt, and devotion, they learn that love isn’t just about finding each other, it’s about choosing to stay.

    Season 2: where love stops rushing… and starts becoming real.
  `;

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/two.mp4" />

            {/* Cinematic Letter */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-lg p-8 md:p-12 netflix-shadow"
            >
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🦋</div>
                    <h3 className="text-3xl font-bold" style={{ color: '#C41E3A' }}>
                        The Bhawra Story
                    </h3>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto font-light whitespace-pre-line italic"
                >
                    {proposalMonologue}
                </motion.div>
            </motion.div>

            {/* Flower Catching Game */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <FlowerCatchGame />
            </motion.div>
        </div>
    );
}
