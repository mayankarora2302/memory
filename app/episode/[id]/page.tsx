'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { episodes, isEpisodeUnlocked } from '@/lib/episodes';
import AudioPlayer from '@/components/AudioPlayer';
import Navbar from '@/components/Navbar';
import LightLeaks from '@/components/effects/LightLeaks';

// Import episode components
import Episode1RoseDay from '@/components/episodes/Episode1RoseDay';
import Episode2ProposeDay from '@/components/episodes/Episode2ProposeDay';
import Episode3ChocolateDay from '@/components/episodes/Episode3ChocolateDay';
import Episode4TeddyDay from '@/components/episodes/Episode4TeddyDay';
import Episode5PromiseDay from '@/components/episodes/Episode5PromiseDay';
const episodeComponents = {
    1: Episode1RoseDay,
    2: Episode2ProposeDay,
    3: Episode3ChocolateDay,
    4: Episode4TeddyDay,
    5: Episode5PromiseDay,
};

export default function EpisodePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const episodeId = parseInt(params.id);
    const episode = episodes.find((ep) => ep.id === episodeId);

    useEffect(() => {
        const auth = localStorage.getItem('netflix-auth');
        if (!auth) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated || !episode) {
        return null;
    }

    const unlocked = isEpisodeUnlocked(episode);

    if (!unlocked) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h1 className="text-3xl font-bold mb-2">Season Locked</h1>
                    <p className="text-netflix-lightGray mb-6">
                        This season will be available on {episode.releaseDate.toLocaleDateString()}
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-netflix-red hover:bg-red-700 px-6 py-3 rounded-md font-semibold transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const EpisodeComponent = episodeComponents[episodeId as keyof typeof episodeComponents];

    return (
        <div className="min-h-screen bg-black relative">
            <LightLeaks />
            <Navbar />

            {/* Episode Header */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <Image
                    src={episode.coverImage}
                    alt={episode.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: episode.color }}
                            />
                            <span className="text-sm text-netflix-lightGray">{episode.duration}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-3">{episode.title}</h1>
                        <h2 className="text-2xl md:text-3xl text-netflix-lightGray mb-4">
                            {episode.subtitle}
                        </h2>
                        <p className="text-lg max-w-2xl">{episode.description}</p>
                    </motion.div>
                </div>
            </div>

            {/* Episode Content */}
            <div className="relative z-20 px-4 md:px-12 py-12 max-w-7xl mx-auto">
                {/* Audio Player */}
                <div className="mb-12">
                    <AudioPlayer
                        audioSrc={episode.soundtrack}
                        episodeTitle={episode.title}
                        songName={episode.songName}
                    />
                </div>

                {/* Episode-Specific Content */}
                {EpisodeComponent && <EpisodeComponent />}
            </div>
        </div>
    );
}
