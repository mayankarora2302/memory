'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    console.error("Playback failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration > 0) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [isPlaying]);

    return (
        <div
            className="relative group aspect-video bg-black rounded-lg overflow-hidden netflix-shadow border border-netflix-darkGray/30"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                playsInline
                webkit-playsinline="true"
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onLoadStart={() => setIsBuffering(true)}
            />

            {/* Loading Spinner */}
            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                    <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin shadow-glow" />
                </div>
            )}

            {/* Premium Overlay Controls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-end p-4 md:p-6 transition-opacity duration-300 pointer-events-none"
            >
                <div className="pointer-events-auto w-full h-full flex flex-col justify-end">
                    {/* Center Play Button (Visible when paused and not buffering) */}
                    {!isPlaying && !isBuffering && (
                        <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            onClick={togglePlay}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 md:w-20 md:h-20 bg-netflix-red rounded-full flex items-center justify-center shadow-2xl"
                            >
                                <span className="text-3xl md:text-4xl ml-1 text-white">▶</span>
                            </motion.div>
                        </div>
                    )}

                    {/* Bottom Controls */}
                    <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="relative w-full h-1.5 md:h-2 bg-netflix-darkGray/50 rounded-full cursor-pointer overflow-hidden group/progress">
                            <div
                                className="absolute top-0 left-0 h-full bg-netflix-red transition-all duration-150 shadow-[0_0_10px_rgba(229,9,20,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress || 0}
                                onChange={handleProgressChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 md:gap-6">
                                <button onClick={togglePlay} className="text-2xl md:text-3xl hover:text-netflix-red transition-colors text-white">
                                    {isPlaying ? '⏸' : '▶'}
                                </button>
                                <button onClick={toggleMute} className="text-2xl md:text-3xl hover:text-netflix-red transition-colors text-white">
                                    {isMuted ? '🔇' : '🔊'}
                                </button>
                            </div>

                            <div className="text-sm md:text-base font-medium text-netflix-lightGray tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-netflix-red animate-pulse" />
                                Memory in Motion
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
