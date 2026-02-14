'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NetflixIntro() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative"
            >
                <motion.div
                    className="text-[150px] md:text-[250px] font-display text-netflix-red"
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(229, 9, 20, 0.5)',
                            '0 0 60px rgba(229, 9, 20, 0.8), 0 0 100px rgba(229, 9, 20, 0.6)',
                            '0 0 20px rgba(229, 9, 20, 0.5)',
                        ],
                    }}
                    transition={{ duration: 2, repeat: 0 }}
                >
                    N
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute bottom-10 text-center"
            >
                <p className="text-white text-xl font-light">Our Love Series</p>
            </motion.div>
        </div>
    );
}
