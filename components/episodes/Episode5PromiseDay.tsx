'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';

export default function Episode5PromiseDay() {
    // TODO: PERSONALIZE - Add your actual promises
    const promises = [
        "I promise to love you in your highs and hold you in your lows",
        "I promise to be your biggest cheerleader and your safest space",
        "I promise to choose you, every single day, for the rest of my life",
        "I promise to build a life with you that's filled with laughter and love",
        "I promise to never let a day go by without reminding you how special you are",
    ];

    const vowMessage = `After a leap of six months, they meet again. Mumbai becomes their backdrop. A birthday wrapped in beach air and golden sunsets. Carrot cake only meant for the two of them. A quiet temple visit followed by long conversations over lunch. A surprise introduction to his bestie and a silent approval from her side to both of us. An evening sky melting into the sea & a dinner that felt like a celebration of everything they survived.

    This was not just a reunion,
    It was peace,
    It was certainty,
    It was love choosing the same person again.

    The final season, Until next time ♥️`;

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/five.mp4" />

            {/* Promise Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-6xl mb-6">🏙️</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#4A5568' }}>
                    Mumbai & Meri Jaan
                </h3>
                <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-lg p-8 md:p-12 netflix-shadow max-w-4xl mx-auto">
                    <p className="text-xl md:text-2xl text-netflix-lightGray leading-relaxed whitespace-pre-line italic">
                        {vowMessage}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
