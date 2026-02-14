'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizProps {
    title: string;
    questions: QuizQuestion[];
}

export default function Quiz({ title, questions }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );

    const handleAnswerClick = (answerIndex: number) => {
        if (answeredQuestions[currentQuestion]) return;

        setSelectedAnswer(answerIndex);

        const newAnsweredQuestions = [...answeredQuestions];
        newAnsweredQuestions[currentQuestion] = true;
        setAnsweredQuestions(newAnsweredQuestions);

        if (answerIndex === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setAnsweredQuestions(new Array(questions.length).fill(false));
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-netflix-darkGray/80 to-black/80 backdrop-blur-md rounded-lg p-8 border border-netflix-red/30 shadow-2xl text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-netflix-red mb-6">
                    Quiz Complete! 🎉
                </h2>
                <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                    {percentage}%
                </div>
                <p className="text-xl md:text-2xl text-netflix-lightGray mb-2">
                    You scored {score} out of {questions.length}
                </p>
                <p className="text-lg text-netflix-lightGray/70 mb-8">
                    {percentage >= 80 ? "Amazing! You know your story well! 💝" :
                        percentage >= 60 ? "Good job! You remember most of it! 🌟" :
                            "Time to revisit some memories! 📖"}
                </p>
                <button
                    onClick={resetQuiz}
                    className="bg-netflix-red hover:bg-netflix-red/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Try Again
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-netflix-darkGray/80 to-black/80 backdrop-blur-md rounded-lg p-6 md:p-8 border border-netflix-red/30 shadow-2xl"
        >
            {/* Quiz Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-netflix-red mb-2">
                    {title}
                </h3>
                <div className="flex items-center justify-between text-sm md:text-base text-netflix-lightGray">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>Score: {score}/{questions.length}</span>
                </div>
                <div className="w-full bg-netflix-darkGray/50 h-2 rounded-full mt-3">
                    <div
                        className="bg-netflix-red h-full rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
            >
                <h4 className="text-lg md:text-xl font-semibold text-white mb-6">
                    {questions[currentQuestion].question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === questions[currentQuestion].correctAnswer;
                        const showFeedback = answeredQuestions[currentQuestion];

                        let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02]";

                        if (showFeedback) {
                            if (isCorrect) {
                                buttonClass += " bg-green-500/20 border-green-500 text-white";
                            } else if (isSelected) {
                                buttonClass += " bg-red-500/20 border-red-500 text-white";
                            } else {
                                buttonClass += " bg-netflix-darkGray/30 border-netflix-darkGray text-netflix-lightGray/50";
                            }
                        } else {
                            buttonClass += " bg-netflix-darkGray/50 border-netflix-darkGray hover:border-netflix-red text-white";
                        }

                        return (
                            <motion.button
                                key={index}
                                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                                whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                onClick={() => handleAnswerClick(index)}
                                disabled={answeredQuestions[currentQuestion]}
                                className={buttonClass}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showFeedback && isCorrect && <span className="text-2xl">✓</span>}
                                    {showFeedback && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}
