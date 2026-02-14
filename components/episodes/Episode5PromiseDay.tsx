'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '../VideoPlayer';
import TypingLetter from '../TypingLetter';
import Quiz from '../Quiz';
import AudioPlayer from '../AudioPlayer';

export default function Episode5PromiseDay() {
    const letterContent = `Hello Phool 🌼,

From Get well soon to let's get married soon, none of us imagined things would go in this direction. I never had any complaints about my life but the day you arrived i understood what having a companion truly feels like. We have seen the most unusual arrange marriage process which has taken its twist and turns and still on it.

Like every site stands on its strong foundation, so have we. While we keep managing our crazy work schedules and putting an effort each day to be with each other, the Phool and Bhawra has crossed all seasons of love and reached valentine's day today. So, we now have a small link to remember our story and add more to it in future.

My Tiny efforts are nothing in front of the Giant Fights you crossed this year. Hence i just wanna say you that:

Mhane thare su ghano pyaar hai, DeviJi 🪷.
Mhari jindagi mein sacho samay ar sachi rite aavva ro ghano dhanyavaad.
Hamesha mhane samajhva ar jaiso pyaar karo ho, us ro dil su aabhar.

It has always been you, it will always be you ♥️

Happy Valentine's Day 🌼

Yours Bhawra 🐝`;

    const quizQuestions = [
        {
            question: "What special occasion brought her to Mumbai in Season 5?",
            options: ["Anniversary", "Engagement", "His 31st birthday", "New Year party"],
            correctAnswer: 2
        },
        {
            question: "Where did she celebrate his birthday?",
            options: ["Taj Lands End", "Aurika", "SOHO House", "Trident"],
            correctAnswer: 1
        },
        {
            question: "Which combination correctly represents the exotic bouquet he got her?",
            options: [
                "Hydrangea, Roses, Baby Breath and Tulips",
                "Brassica, Santini, Button Chrysanthemums and Limonium",
                "Lilies, Sunflowers, Orchids and Carnations",
                "Peonies, Daisies, Lavender and Ranunculus"
            ],
            correctAnswer: 1
        },
        {
            question: "Which temple did they visit for blessings?",
            options: [
                "ISKCON Juhu",
                "Siddhivinayak",
                "Shree Simandharswami Digamber Jain Temple, Ville Parle",
                "Mahalaxmi Temple"
            ],
            correctAnswer: 2
        },
        {
            question: "Where did they go for lunch?",
            options: ["Olive Bar & Kitchen", "Bastian", "SOHO House", "Hakkasan"],
            correctAnswer: 2
        },
        {
            question: "Who did he introduce her to for the first time?",
            options: [
                "His cousin",
                "His best friend Dhruti and her husband",
                "His office partner",
                "His school friends"
            ],
            correctAnswer: 1
        },
        {
            question: "Where did they go for dinner in the evening?",
            options: ["Yauatcha", "One8 Commune by Virat Kohli", "Bastian", "Trident"],
            correctAnswer: 1
        },
        {
            question: "One8 Commune at Juhu is located at the former bungalow of which legendary personality?",
            options: ["Raj Kapoor", "Kishore Kumar", "Dev Anand", "Shammi Kapoor"],
            correctAnswer: 1
        },
        {
            question: "Will you marry him?",
            options: ["Let me think", "We'll see", "Yeh bhi koi puchne ki baat hai", "Maybe later"],
            correctAnswer: 2
        },
        {
            question: "He said \"I Love you.\" What is the correct reply?",
            options: ["Thank you😏", "Same here🤪", "I Love you too♥️", "See you soon🙄"],
            correctAnswer: 2
        }
    ];

    return (
        <div className="space-y-12">
            {/* Video Section */}
            <VideoPlayer src="/assets/videos/five.mp4" />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc="/assets/audio/Cold_Play_-_Yellow_3_(mp3.pm).mp3"
                episodeTitle="Season 5: Mumbai & Meri Jaan"
                songName="Yellow from Coldplay"
            />

            {/* Story Message Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-gradient-to-br from-netflix-darkGray/50 to-black/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-netflix-red/10 shadow-2xl text-center">
                    <h3 className="text-3xl font-bold mb-6 text-netflix-red">
                        Season 5: Mumbai & Meri Jaan
                    </h3>
                    <p className="text-xl md:text-2xl text-netflix-lightGray leading-relaxed whitespace-pre-line font-light italic">
                        After a leap of six months, they meet again. Mumbai becomes their backdrop. A birthday wrapped in beach air and golden sunsets. Carrot cake only meant for the two of them. A quiet temple visit followed by long conversations over lunch. A surprise introduction to his bestie and a silent approval from her side to both of us. An evening sky melting into the sea & a dinner that felt like a celebration of everything they survived.

                        This was not just a reunion,
                        It was peace,
                        It was certainty,
                        It was love choosing the same person again.

                        The final season, Until next time ♥️
                    </p>
                </div>
            </motion.div>

            {/* Typing Letter Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">💌</div>
                    <h3 className="text-3xl font-bold text-netflix-red">
                        A Valentine's Letter
                    </h3>
                </div>
                <TypingLetter content={letterContent} speed={20} />
            </motion.div>

            {/* Quiz Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto"
            >
                <Quiz title="Mumbai & Meri Jaan Quiz 🏙️" questions={quizQuestions} />
            </motion.div>
        </div>
    );
}
