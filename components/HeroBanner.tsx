'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Episode } from '@/lib/episodes';
import { isEpisodeUnlocked } from '@/lib/episodes';

interface HeroBannerProps {
    episode: Episode;
}

export default function HeroBanner({ episode }: HeroBannerProps) {
    const unlocked = isEpisodeUnlocked(episode);

    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={episode.coverImage}
                    alt={episode.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4"
                    >
                        <span className="inline-block bg-netflix-red px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            Netflix Original
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-glow"
                    >
                        {episode.subtitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-netflix-lightGray mb-6 max-w-xl"
                    >
                        {episode.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4"
                    >
                        {unlocked ? (
                            <Link href={`/episode/${episode.id}`}>
                                <button className="bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-netflix-lightGray transition-colors flex items-center gap-2">
                                    <span>▶</span> Play
                                </button>
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="bg-gray-600 text-gray-400 px-8 py-3 rounded-md font-bold text-lg cursor-not-allowed flex items-center gap-2"
                            >
                                <span>🔒</span> Locked
                            </button>
                        )}

                        <button className="bg-gray-600/80 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                            <span>ℹ️</span> More Info
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 flex items-center gap-4 text-sm text-netflix-lightGray"
                    >
                        <span className="text-netflix-red font-semibold">{episode.duration}</span>
                        <span>•</span>
                        <span>{episode.theme}</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
