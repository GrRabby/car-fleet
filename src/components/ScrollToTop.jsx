'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
                isVisible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="relative w-12 h-12 rounded-full text-white bg-linear-to-b from-red-400 via-red-500 to-red-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] border border-red-800/50 flex items-center justify-center group transition-all duration-300 active:translate-y-px hover:shadow-[0_4px_12px_rgba(239,68,68,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
                <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 ointer-events-none"></span>
                <ChevronUp
                    className="relative w-5 h-5 drop-shadow-md group-hover:-translate-y-0.5 transition-transform"
                    strokeWidth={3}
                />
            </button>
        </div>
    );
}