'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Episode, isEpisodeUnlocked } from '@/lib/episodes';
import { getRelativeTime } from '@/lib/dateUtils';

interface EpisodeCardProps {
    episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
    const unlocked = isEpisodeUnlocked(episode);

    return (
        <Link href={unlocked ? `/episode/${episode.id}` : '#'}>
            <motion.div
                whileHover={unlocked ? { scale: 1.05 } : {}}
                className={`relative w-64 md:w-80 h-40 md:h-48 rounded-lg overflow-hidden netflix-shadow group ${!unlocked ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
            >
                {/* Episode Image */}
                <Image
                    src={episode.coverImage}
                    alt={episode.title}
                    fill
                    className={`object-cover ${!unlocked ? 'blur-sm grayscale' : 'group-hover:scale-105'
                        }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Lock Icon */}
                {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🔒</div>
                    </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: episode.color }}
                        />
                        <span className="text-xs text-netflix-lightGray">
                            {unlocked ? episode.duration : getRelativeTime(episode.releaseDate)}
                        </span>
                    </div>

                    <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-1">
                        {episode.title}
                    </h3>

                    <p className="text-xs text-netflix-lightGray line-clamp-2">
                        {episode.description}
                    </p>

                    {!unlocked && (
                        <div className="mt-2 text-xs text-netflix-red font-semibold">
                            Releasing Soon
                        </div>
                    )}
                </div>

                {/* Hover Effect */}
                {unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-5xl">▶</div>
                    </div>
                )}
            </motion.div>
        </Link>
    );
}
