'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
    audioSrc?: string;
    episodeTitle: string;
    songName?: string;
}

export default function AudioPlayer({ audioSrc, episodeTitle, songName }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isError, setIsError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audioSrc) return;

        // Clear any previous error state when source changes
        setIsError(false);
        let hasLoaded = false;

        // Explicitly set the src to ensure it's applied to the DOM
        audio.src = audioSrc;
        audio.load();

        const handleLoadedData = () => {
            hasLoaded = true;
            setIsError(false);
        };

        const handleCanPlay = () => {
            hasLoaded = true;
            setIsError(false);
        };

        const handleAudioError = (e: Event) => {
            // Only treat as error if we've actually tried to load and failed
            const target = e.target as HTMLAudioElement;
            if (target.error) {
                const errorCode = target.error.code;
                // MEDIA_ERR_SRC_NOT_SUPPORTED = 4, MEDIA_ERR_NETWORK = 2, MEDIA_ERR_DECODE = 3
                if (errorCode === 1 || errorCode === 2 || errorCode === 3 || errorCode === 4) {
                    console.warn(`Audio loading error for ${episodeTitle}:`, {
                        code: errorCode,
                        message: target.error.message,
                        src: audioSrc
                    });
                    setIsError(true);
                    setIsPlaying(false);
                }
            }
        };

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('error', handleAudioError);
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleAudioError);
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', () => setIsPlaying(false));

            // Resource cleanup
            if (audio) {
                audio.pause();
                audio.removeAttribute('src');
                audio.load();
            }
        };
    }, [audioSrc, episodeTitle]);

    useEffect(() => {
        if (audioRef.current && !isError) {
            audioRef.current.volume = volume;
        }
    }, [volume, isError]);

    const togglePlay = () => {
        if (audioRef.current && !isError) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error("Playback failed:", err);
                    setIsError(true);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current && !isError) {
            audioRef.current.currentTime = newTime;
        }
    };

    if (!audioSrc || isError) {
        return (
            <div className="bg-netflix-darkGray rounded-lg p-6 text-center border border-netflix-red/20">
                <p className="text-netflix-lightGray">
                    {isError ? "🎵 Soundtrack is coming soon!" : "🎵 Audio soundtrack will be available soon"}
                </p>
                <p className="text-sm text-gray-500 mt-2 italic">
                    {isError ? "The music for this episode is still in production." : "Add audio files to public/assets/audio/"}
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-netflix-darkGray rounded-lg overflow-hidden netflix-shadow"
        >
            <audio ref={audioRef} preload="metadata" />

            <div className="p-4">
                <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        disabled={isError}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isError ? 'bg-gray-600' : 'bg-netflix-red hover:bg-red-700'}`}
                    >
                        {isPlaying ? (
                            <span className="text-xl">⏸</span>
                        ) : (
                            <span className="text-xl">▶</span>
                        )}
                    </button>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{songName || episodeTitle}</h4>
                        <p className="text-xs text-netflix-lightGray">🎵 Episode Soundtrack</p>
                    </div>

                    {/* Expand Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-netflix-lightGray hover:text-white transition-colors"
                    >
                        {isExpanded ? '▼' : '▲'}
                    </button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 space-y-3"
                        >
                            {/* Progress Bar */}
                            <div className="space-y-1">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #E50914 0%, #E50914 ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`,
                                    }}
                                />
                                <div className="flex justify-between text-xs text-netflix-lightGray">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm">🔊</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #E50914 0%, #E50914 ${volume * 100}%, #4B5563 ${volume * 100}%, #4B5563 100%)`,
                                    }}
                                />
                                <span className="text-xs text-netflix-lightGray w-8">
                                    {Math.round(volume * 100)}%
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
