'use client';

import { useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import { type Bookmark } from '@/lib/markdownParser';
import { BookmarkCard } from './BookmarkCard';

interface BookmarkSliderProps {
    bookmarks: Bookmark[];
}

export function BookmarkSlider({ bookmarks }: BookmarkSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => 
                current === bookmarks.length - 1 ? 0 : current + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, bookmarks.length]);

    return (
        <div className="relative w-full max-w-3xl mx-auto px-4">
            <div className="overflow-hidden">
                <motion.div 
                    className="flex"
                    animate={{ x: `-${activeIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {bookmarks.map((bookmark) => (
                        <div 
                            key={bookmark.url}
                            className="w-full flex-shrink-0"
                        >
                            <BookmarkCard bookmark={bookmark} />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {bookmarks.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setActiveIndex(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === activeIndex 
                                ? 'bg-blue-600 dark:bg-blue-400' 
                                : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}