'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface PasswordModalProps {
    onClose: () => void;
    profileName: string;
}

const CORRECT_PASSWORD = 'BeeMyHoney';

export default function PasswordModal({ onClose, profileName }: PasswordModalProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === CORRECT_PASSWORD) {
            setIsSuccess(true);
            setError('');
            localStorage.setItem('netflix-auth', 'true');
            localStorage.setItem('netflix-profile', profileName);

            // Trigger Netflix intro
            setTimeout(() => {
                router.push('/intro');
            }, 500);
        } else {
            setError('Incorrect credentials.');
            setPassword('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-netflix-darkGray rounded-lg p-8 max-w-md w-full netflix-shadow"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-2">Enter Password</h2>
                <p className="text-netflix-lightGray mb-6">
                    Enter the password for <span className="text-white font-semibold">{profileName}</span>
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-netflix-gray text-white px-4 py-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        placeholder="Enter Password"
                        autoFocus
                    />

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-4"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded-md mb-4"
                        >
                            Access granted! Loading your love series...
                        </motion.div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={isSuccess}
                            className="flex-1 bg-netflix-red hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-50"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-netflix-gray hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
