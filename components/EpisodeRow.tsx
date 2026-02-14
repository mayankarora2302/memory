'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import EpisodeCard from './EpisodeCard';
import { Episode } from '@/lib/episodes';

interface EpisodeRowProps {
    title: string;
    episodes: Episode[];
}

export default function EpisodeRow({ title, episodes }: EpisodeRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    if (episodes.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const scrollAmount = 400;
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="group relative">
            <h2 className="text-xl md:text-2xl font-bold mb-4 px-4 md:px-0">{title}</h2>

            <div className="relative">
                {/* Scroll buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70 pointer-events-auto"
                >
                    <span className="text-3xl">‹</span>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70 pointer-events-auto"
                >
                    <span className="text-3xl">›</span>
                </button>

                {/* Episode cards */}
                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-4 relative z-10"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {episodes.map((episode) => (
                        <div
                            key={episode.id}
                            className="flex-shrink-0"
                        >
                            <EpisodeCard episode={episode} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
