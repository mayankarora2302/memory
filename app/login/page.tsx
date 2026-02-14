'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PasswordModal from '@/components/PasswordModal';
import LightLeaks from '@/components/effects/LightLeaks';

export default function LoginPage() {
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

    const profiles = [
        {
            name: 'Phool',
            avatar: '🌻',
            color: '#E50914',
        },
        {
            name: 'Bhawra',
            avatar: '🐝',
            color: '#FF1744',
        },
    ];

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            <LightLeaks />

            <div className="relative z-20 w-full max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12"
                >
                    Who's watching?
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {profiles.map((profile, index) => (
                        <motion.div
                            key={profile.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedProfile(profile.name)}
                            className="cursor-pointer group"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-lg flex items-center justify-center text-6xl md:text-7xl transition-all duration-300 group-hover:ring-4 group-hover:ring-white netflix-shadow"
                                    style={{
                                        background: `linear-gradient(135deg, ${profile.color}20 0%, ${profile.color}40 100%)`,
                                        border: `3px solid ${profile.color}`,
                                    }}
                                >
                                    {profile.avatar}
                                </div>
                                <h2 className="mt-4 text-lg md:text-xl font-semibold text-netflix-lightGray group-hover:text-white transition-colors">
                                    {profile.name}
                                </h2>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-netflix-lightGray mt-12 text-sm"
                >
                    Select your profile to begin the journey
                </motion.p>
            </div>

            {selectedProfile && (
                <PasswordModal
                    profileName={selectedProfile}
                    onClose={() => setSelectedProfile(null)}
                />
            )}
        </div>
    );
}
