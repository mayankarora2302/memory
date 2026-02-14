'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EpisodeRow from '@/components/EpisodeRow';
import HeroBanner from '@/components/HeroBanner';
import LightLeaks from '@/components/effects/LightLeaks';
import HeartParticles from '@/components/effects/HeartParticles';
import { episodes, getCurrentEpisode, getUnlockedEpisodes, getLockedEpisodes } from '@/lib/episodes';

export default function HomePage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('netflix-auth');
        if (!auth) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return null;
    }

    const currentEpisode = getCurrentEpisode();
    const unlockedEpisodes = getUnlockedEpisodes();
    const lockedEpisodes = getLockedEpisodes();

    return (
        <div className="min-h-screen bg-black relative">
            <LightLeaks />
            <HeartParticles />

            <Navbar />

            <main className="relative z-20">
                <HeroBanner episode={currentEpisode || episodes[0]} />

                <div className="px-4 md:px-12 pb-20 space-y-12 -mt-32 relative z-30">
                    {currentEpisode && (
                        <EpisodeRow
                            title="Continue Watching Our Love"
                            episodes={[currentEpisode]}
                        />
                    )}

                    <EpisodeRow
                        title="Trending in Our Hearts"
                        episodes={unlockedEpisodes}
                    />

                    <EpisodeRow
                        title="Romantic Originals"
                        episodes={episodes}
                    />

                    <EpisodeRow
                        title="Because You Love Us"
                        episodes={unlockedEpisodes}
                    />

                    {lockedEpisodes.length > 0 && (
                        <EpisodeRow
                            title="Coming Soon"
                            episodes={lockedEpisodes}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
