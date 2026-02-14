'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('netflix-auth');
        localStorage.removeItem('netflix-profile');
        router.push('/login');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <h1 className="text-2xl md:text-3xl font-display text-netflix-red cursor-pointer hover:scale-105 transition-transform">
                            OUR LOVE
                        </h1>
                    </Link>

                    <div className="hidden md:flex gap-6 text-sm">
                        <Link href="/" className="hover:text-netflix-lightGray transition-colors">
                            Home
                        </Link>
                        <Link href="/#episodes" className="hover:text-netflix-lightGray transition-colors">
                            Episodes
                        </Link>
                        <Link href="/#memories" className="hover:text-netflix-lightGray transition-colors">
                            Memories
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="text-sm hover:text-netflix-lightGray transition-colors"
                    >
                        Switch Profile
                    </button>
                    <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-sm font-semibold cursor-pointer hover:ring-2 hover:ring-white transition-all">
                        💝
                    </div>
                </div>
            </div>
        </nav>
    );
}
