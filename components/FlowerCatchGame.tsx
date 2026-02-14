'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flower {
    id: number;
    type: 'correct' | 'wrong';
    x: number;
    emoji: string;
}

export default function FlowerCatchGame() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const nextFlowerId = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    // Start game
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setFlowers([]);
        nextFlowerId.current = 0;
    };

    // Game timer
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setGameState('ended');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    // Spawn flowers
    useEffect(() => {
        if (gameState !== 'playing') return;

        const spawnInterval = setInterval(() => {
            const isCorrect = Math.random() > 0.4; // 60% chance of correct flower
            const newFlower: Flower = {
                id: nextFlowerId.current++,
                type: isCorrect ? 'correct' : 'wrong',
                x: Math.random() * 80 + 10, // 10-90% of width
                emoji: isCorrect ? '🌻' : '🌹',
            };
            setFlowers((prev) => [...prev, newFlower]);
        }, 1200); // Spawn every 1.2 seconds

        return () => clearInterval(spawnInterval);
    }, [gameState]);

    // Remove flowers that fell off screen
    useEffect(() => {
        if (gameState !== 'playing') return;

        const cleanupInterval = setInterval(() => {
            setFlowers((prev) => prev.filter((_, index) => index < 20)); // Keep max 20 flowers
        }, 5000);

        return () => clearInterval(cleanupInterval);
    }, [gameState]);

    // Catch flower
    const catchFlower = (flower: Flower) => {
        setFlowers((prev) => prev.filter((f) => f.id !== flower.id));
        if (flower.type === 'correct') {
            setScore((prev) => prev + 10);
        } else {
            setScore((prev) => prev - 5);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Game Header */}
            <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-netflix-red mb-2">
                    Catch the Phool! 🌻
                </h3>
                <p className="text-netflix-lightGray">
                    Catch the sunflowers (🌻) for +10 points, avoid roses (🌹) or lose 5 points!
                </p>
            </div>

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                className="relative bg-gradient-to-br from-netflix-darkGray/80 to-black/80 backdrop-blur-md rounded-lg border-2 border-netflix-red/30 overflow-hidden"
                style={{ height: '500px' }}
            >
                {/* Idle State */}
                {gameState === 'idle' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                        <div className="text-7xl md:text-8xl">🌻</div>
                        <button
                            onClick={startGame}
                            className="bg-netflix-red hover:bg-netflix-red/80 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {/* Playing State */}
                {gameState === 'playing' && (
                    <>
                        {/* Score and Timer */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-netflix-red/30">
                                <span className="text-white font-bold text-lg">Score: {score}</span>
                            </div>
                            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-netflix-red/30">
                                <span className="text-white font-bold text-lg">Time: {timeLeft}s</span>
                            </div>
                        </div>

                        {/* Falling Flowers */}
                        <AnimatePresence>
                            {flowers.map((flower) => (
                                <motion.button
                                    key={flower.id}
                                    initial={{ y: -60, x: `${flower.x}%` }}
                                    animate={{ y: 550 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{
                                        y: {
                                            duration: 4,
                                            ease: 'linear',
                                        },
                                    }}
                                    onClick={() => catchFlower(flower)}
                                    className="absolute text-5xl md:text-6xl cursor-pointer hover:scale-125 transition-transform z-0"
                                    style={{
                                        left: 0,
                                        transformOrigin: 'center',
                                    }}
                                    whileHover={{ scale: 1.3, rotate: 15 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {flower.emoji}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </>
                )}

                {/* End State */}
                {gameState === 'ended' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70 backdrop-blur-sm">
                        <h2 className="text-4xl md:text-5xl font-bold text-netflix-red">
                            Game Over!
                        </h2>
                        <div className="text-6xl md:text-7xl font-bold text-white">
                            {score}
                        </div>
                        <p className="text-xl text-netflix-lightGray">
                            {score >= 100 ? "Outstanding! You're a pro! 🌻" :
                                score >= 50 ? "Great job! Nice catching! 🎯" :
                                    score >= 0 ? "Good try! Practice makes perfect! 💪" :
                                        "Keep trying! You'll get better! 🌟"}
                        </p>
                        <button
                            onClick={startGame}
                            className="bg-netflix-red hover:bg-netflix-red/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
