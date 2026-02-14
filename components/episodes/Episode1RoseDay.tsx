'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';
import Quiz from '../Quiz';

export default function Episode1RoseDay() {
    // TODO: PERSONALIZE - Add your own love message
    const loveMessage = `One wrong text. One destined reply. Within days two architects who were strangers became certain. Kundalis aligned. Families gathered. Futures were questioned. But while the world debated, they had already chosen each other. Somewhere between secret site dates and silent prayers, an arranged beginning turned into unstoppable love.`;

    const quizQuestions = [
        {
            question: "On what date and time did our story officially begin?",
            options: [
                "22nd April 2025, 11:59 pm",
                "23rd April 2025, 12:25 am",
                "23rd April 2025, 12:05 am",
                "24th April 2025, 12:25 am"
            ],
            correctAnswer: 1
        },
        {
            question: "What caused the initial confusion about her identity?",
            options: ["Same college", "Same hometown", "Same Instagram ID", "Same mutual friend"],
            correctAnswer: 2
        },
        {
            question: "When she asked what kind of girl he was looking for, what did he say?",
            options: [
                "Someone ambitious but calm",
                "Someone understanding with her own identity and goals",
                "Someone practical and independent",
                "Someone sorted and family oriented"
            ],
            correctAnswer: 1
        },
        {
            question: "When did she ask for his biodata?",
            options: [
                "Day 3 – 25th April 2025",
                "Day 4 – 26th April 2025",
                "Day 5 – 27th April 2025",
                "Day 6 – 28th April 2025"
            ],
            correctAnswer: 1
        },
        {
            question: "On which day did their kundalis match?",
            options: ["Day 5", "Day 6", "Day 7", "Day 8"],
            correctAnswer: 2
        },
        {
            question: "Where was their secret date held?",
            options: ["Beachside villa", "Cafe near site", "Construction site", "Farmhouse property"],
            correctAnswer: 2
        },
        {
            question: "Which combination best describes the bouquet he got her?",
            options: [
                "White lilies, yellow roses, orchids",
                "Sunflowers, lilies, pink and white blooms with baby breath and orchids",
                "Red roses, carnations and baby breath",
                "Tulips, daisies and hydrangeas"
            ],
            correctAnswer: 1
        },
        {
            question: "Which dessert combination was part of their celebration?",
            options: [
                "Chocolate cupcake and red velvet cake",
                "Nutella cupcake, bee themed bento cake and Biscoff cheesecake",
                "Brownie platter and tiramisu",
                "Cheesecake trio and macarons"
            ],
            correctAnswer: 1
        },
        {
            question: "What did he wear on their first date to complement her eyes?",
            options: ["Beige shirt", "Brown shirt", "Olive shirt", "Maroon shirt"],
            correctAnswer: 1
        },
        {
            question: "On which auspicious occasion did they officially inform their families?",
            options: ["Gudi Padwa", "Ram Navami", "Akshay Tritiya", "Janmashtami"],
            correctAnswer: 2
        }
    ];

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/one.mp4" />

            {/* Intro Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
            >
                <div className="text-6xl mb-6">🌹</div>
                <p className="text-xl md:text-2xl text-netflix-lightGray leading-relaxed whitespace-pre-line font-medium italic">
                    {loveMessage}
                </p>
            </motion.div>

            {/* Animated Rose Petals Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-pink-900/20 to-red-900/20 flex items-center justify-center"
            >
                <div className="text-4xl space-x-4">
                    {['🌹', '🌹', '🌹', '🌹', '🌹'].map((rose, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="inline-block"
                        >
                            {rose}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Quiz Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Quiz title="The Crash Course Quiz 🌹" questions={quizQuestions} />
            </motion.div>

            {/* Closing Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center italic text-xl text-netflix-lightGray"
            >
                "A rose by any other name would smell as sweet, but you are my only rose." 🌹
            </motion.div>
        </div>
    );
}
