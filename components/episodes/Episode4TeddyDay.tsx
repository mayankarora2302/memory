'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';
import Quiz from '../Quiz';
import AudioPlayer from '../AudioPlayer';

export default function Episode4TeddyDay() {
    // TODO: PERSONALIZE - Add your cozy memories
    const comfortMessage = `When life slowed down, they chose to pause together. A secret third month anniversary escape to Lonavla. A quiet lake stay wrapped in monsoon mist.
    Surrounded by rain, a slow dance while thunder rolled across the hills. Music, laughter, and a closeness that felt deeper than ever.
    The next morning, waterfalls rushed beside their train back to Mumbai, carrying memories strong enough to last six months.

    Season 4 is where love bloomed fully and learned how to hold on for what's coming next.`;

    const quizQuestions = [
        {
            question: "What was the name of the bouquet he got her in Lonavla?",
            options: ["Sunset Bliss", "Twilight", "Lavender Dream", "Monsoon Magic"],
            correctAnswer: 1
        },
        {
            question: "Which color combination best describes the Twilight bouquet?",
            options: ["Red and white", "Pink and peach", "Purple, orange and yellow", "Blue and white"],
            correctAnswer: 2
        },
        {
            question: "Where did they stay during their Lonavla trip?",
            options: ["Aria", "Taj Lonavla", "Zostel", "Radisson"],
            correctAnswer: 2
        },
        {
            question: "Which month anniversary was it?",
            options: ["No anniversary", "1st month anniversary", "2nd month anniversary", "3rd month anniversary"],
            correctAnswer: 3
        },
        {
            question: "What type of dinner did they have on the rainy night?",
            options: ["Italian fine dining", "Barbeque dinner", "Street food", "Buffet breakfast"],
            correctAnswer: 1
        },
        {
            question: "What special moment happened during dinner?",
            options: ["First hug", "First long drive", "First dance", "First gift exchange"],
            correctAnswer: 2
        },
        {
            question: "What was the song of the night?",
            options: ["Tum Mile", "Jaadu Hai Nasha Hai", "Raataan Lambiyan", "Kesariya"],
            correctAnswer: 1
        },
        {
            question: "Where did they have pizza the next day?",
            options: ["German Bakery", "Rama Krishna", "Fiori Lonavla", "Cafe 24"],
            correctAnswer: 2
        },
        {
            question: "Which train did they take from Lonavla to Mumbai?",
            options: ["Deccan Express", "Rajdhani", "Vistadome train", "Intercity Express"],
            correctAnswer: 2
        },
        {
            question: "What beautiful sight followed them on their train journey back?",
            options: ["Snow covered hills", "Desert landscapes", "Waterfalls", "City skyline"],
            correctAnswer: 2
        }
    ];

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/four.mp4" />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc="/assets/audio/Jaadu Hai Nasha Jism 128 Kbps.mp3"
                episodeTitle="Season 4: Lonavala Days"
                songName="Jaadu Hai Nasha Hai"
            />

            {/* Teddy Theme Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-6xl mb-6">⛰️</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#D4A574' }}>
                    Lonavla Days
                </h3>
                <p className="text-xl text-netflix-lightGray max-w-3xl mx-auto leading-relaxed whitespace-pre-line italic">
                    {comfortMessage}
                </p>
            </motion.div>

            {/* Floating Rain/Steam Effect */}
            <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-r from-blue-900/20 to-teal-900/20">
                <div className="absolute inset-0 flex items-center justify-center gap-8">
                    {['🌧️', '⛈️', '🏠', '⛰️', '🌫️'].map((emoji, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                            className="text-5xl"
                        >
                            {emoji}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quiz Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto"
            >
                <Quiz title="Lonavla Quiz ⛰️" questions={quizQuestions} />
            </motion.div>
        </div>
    );
}
