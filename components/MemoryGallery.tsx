'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MemoryGalleryProps {
    images: string[];
    title?: string;
}

export default function MemoryGallery({ images, title = 'Our Memories' }: MemoryGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

    const openLightbox = (image: string, index: number) => {
        if (errorImages.has(index)) return;
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const handleImageError = (index: number) => {
        console.warn(`Gallery image failed to load: ${images[index]}`);
        setErrorImages(prev => {
            const next = new Set(prev);
            next.add(index);
            return next;
        });
    };

    const nextImage = () => {
        // Skip images that have errors
        let nextIndex = (selectedIndex + 1) % images.length;
        let attempts = 0;
        while (errorImages.has(nextIndex) && attempts < images.length) {
            nextIndex = (nextIndex + 1) % images.length;
            attempts++;
        }
        setSelectedIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    };

    const prevImage = () => {
        // Skip images that have errors
        let prevIndex = (selectedIndex - 1 + images.length) % images.length;
        let attempts = 0;
        while (errorImages.has(prevIndex) && attempts < images.length) {
            prevIndex = (prevIndex - 1 + images.length) % images.length;
            attempts++;
        }
        setSelectedIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openLightbox(image, index)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer netflix-shadow group bg-netflix-gray"
                    >
                        <Image
                            src={image}
                            alt={`Memory ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={() => handleImageError(index)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                                🔍
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white text-4xl hover:text-netflix-red transition-colors z-10"
                        >
                            ×
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-4 text-white text-4xl hover:text-netflix-red transition-colors z-10"
                        >
                            ‹
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-4 text-white text-4xl hover:text-netflix-red transition-colors z-10"
                        >
                            ›
                        </button>

                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[90vh] w-full h-full"
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected memory"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </motion.div>

                        <div className="absolute bottom-4 text-white text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
