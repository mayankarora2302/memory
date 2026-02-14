'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';

export default function Episode3ChocolateDay() {
    // TODO: PERSONALIZE - Add your sweet memories
    const sweetMessage = `
    She invited him to her world: Nashik. What began as a secret one month anniversary became their first real meeting. Sunsets over backwaters. A boat ride under changing skies. Hands held. A first hug in a city blackout. And by day three… the courage to meet her parents.

    Season 3: where love stops hiding and starts stepping forward.
  `;

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/three.mp4" />

            {/* Chocolate Theme Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-6xl mb-6">⛵</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#4facfe' }}>
                    The Nashik Date
                </h3>
                <p className="text-xl text-netflix-lightGray max-w-3xl mx-auto leading-relaxed whitespace-pre-line italic">
                    {sweetMessage}
                </p>
            </motion.div>
        </div>
    );
}
