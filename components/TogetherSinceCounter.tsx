'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDuration, RELATIONSHIP_START_DATE } from '@/lib/dateUtils';

export default function TogetherSinceCounter() {
    const [duration, setDuration] = useState(formatDuration(RELATIONSHIP_START_DATE));

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(formatDuration(RELATIONSHIP_START_DATE));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: 'Years', value: duration.years },
        { label: 'Months', value: duration.months },
        { label: 'Days', value: duration.days },
        { label: 'Hours', value: duration.hours },
        { label: 'Minutes', value: duration.minutes },
        { label: 'Seconds', value: duration.seconds },
    ];

    return (
        <div className="bg-gradient-to-br from-netflix-red/20 to-pink-900/20 rounded-lg p-8 netflix-shadow">
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center mb-8 text-glow"
            >
                Together Since Forever
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {timeUnits.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 rounded-lg p-4 text-center"
                    >
                        <motion.div
                            key={unit.value}
                            initial={{ scale: 1.2, color: '#E50914' }}
                            animate={{ scale: 1, color: '#FFFFFF' }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl md:text-4xl font-bold mb-2"
                        >
                            {unit.value.toString().padStart(2, '0')}
                        </motion.div>
                        <div className="text-xs md:text-sm text-netflix-lightGray uppercase tracking-wider">
                            {unit.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-6 text-netflix-lightGray italic"
            >
                Every second with you is a treasure ❤️
            </motion.p>
        </div>
    );
}
