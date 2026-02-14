'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';
import Quiz from '../Quiz';
import AudioPlayer from '../AudioPlayer';

export default function Episode3ChocolateDay() {
    // TODO: PERSONALIZE - Add your sweet memories
    const sweetMessage = `
    She invited him to her world: Nashik. What began as a secret one month anniversary became their first real meeting. Sunsets over backwaters. A boat ride under changing skies. Hands held. A first hug in a city blackout. And by day three… the courage to meet her parents.

    Season 3: where love stops hiding and starts stepping forward.
  `;

    const quizQuestions = [
        {
            question: "Where did he stay during the Nashik trip?",
            options: ["Radisson Blu", "Taj Gateway", "Aria", "Mariott"],
            correctAnswer: 2
        },
        {
            question: "What did they eat on their very first date moment in Nashik?",
            options: ["Pizza", "French fries", "Pasta", "Sandwiches"],
            correctAnswer: 1
        },
        {
            question: "Where did they watch their first sunset together?",
            options: ["Boat dock", "Balcony of the hotel", "Hilltop cafe", "Vineyard"],
            correctAnswer: 1
        },
        {
            question: "What did he get for you during this trip?",
            options: ["Earings", "Teddy", "Bracelet", "Flowers"],
            correctAnswer: 2
        },
        {
            question: "What color did they twin in on Day 2?",
            options: ["White", "Blue", "Black", "Beige"],
            correctAnswer: 2
        },
        {
            question: "How did they celebrate their first month anniversary?",
            options: [
                "Candlelight dinner",
                "Temple visit",
                "Boat ride while watching the sky change colors",
                "Movie night"
            ],
            correctAnswer: 2
        },
        {
            question: "Where did they go for sunset dinner on Day 2?",
            options: ["Little Italy", "SOMA", "Aria Restaurant", "Hilltop Bistro"],
            correctAnswer: 1
        },
        {
            question: "What dish did they have for dinner at SOMA?",
            options: ["Margherita pizza", "Red sauce pasta", "White sauce pasta", "Risotto"],
            correctAnswer: 2
        },
        {
            question: "What special moment happened that night at dinner?",
            options: ["First hug", "First slow dance", "First hand hold", "First gift exchange"],
            correctAnswer: 2
        },
        {
            question: "Which fav color of her did he wear when meeting her parents the next day?",
            options: ["Black shirt", "Brown shirt", "Blue kurta", "Beige outfit"],
            correctAnswer: 3
        }
    ];

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/three.mp4" />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc="/assets/audio/Sham (PenduJatt.Com.Se).mp3"
                episodeTitle="Season 3: The Nashik Date"
                songName="Sham from Aisha"
            />

            {/* Chocolate Theme Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-6xl mb-6">⛵</div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#4facfe' }}>
                    The Nashik Date
                </h3>
                <p className="text-xl text-netflix-lightGray max-w-3xl mx-auto leading-relaxed whitespace-pre-line italic">
                    {sweetMessage}
                </p>
            </motion.div>

            {/* Quiz Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto"
            >
                <Quiz title="The Nashik Date Quiz ⛵" questions={quizQuestions} />
            </motion.div>
        </div>
    );
}
