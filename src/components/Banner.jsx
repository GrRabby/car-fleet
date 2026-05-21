'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cars = [
        {
            name: 'BEST CAR',
            subtitle: 'FOR RENT',
            kicker: 'Get The',
            discount: '45%',
            description: 'Tour the city in a grand tourer or arrive in something memorable. Premium cars from trusted local hosts.',
            image: 'https://www.freeiconspng.com/uploads/audi-png-auto-car-0.png',
        },
        {
            name: 'WEEKEND',
            subtitle: 'GETAWAY',
            kicker: 'Plan Your',
            discount: '30%',
            description: 'Long-trip discounts on our most-loved rides. Pick up nearby, drop off anywhere — flexible rentals for every road.',
            image: 'https://www.freeiconspng.com/uploads/yellow-car-png-26.png',
        },
        {
            name: 'PREMIUM',
            subtitle: 'ON DEMAND',
            kicker: 'Drive A',
            discount: '25%',
            description: 'Premium SUVs and sedans ready to drive. Book by the hour, day, or week — verified vehicles, instant confirmation.',
            image: 'https://www.freeiconspng.com/uploads/mercedes-car-png-image-6.png',
        },
        {
            name: 'LUXURY',
            subtitle: 'COLLECTION',
            kicker: 'Drive A',
            discount: '25%',
            description: 'Tour the city in a grand tourer or arrive in something memorable. Premium cars from trusted local hosts.',
            image: 'https://www.freeiconspng.com/uploads/hd-orange-audi-r8-car-png-24.png',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % cars.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [cars.length]);
    const activeCar = cars[activeIndex];
    return (
        <div className="relative bg-zinc-100 overflow-hidden min-h-125 lg:min-h-150 w-full bg-[url('/banner.png')] bg-cover bg-center">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-12 gap-8 xl:gap-20 items-center min-h-105">                    
                    <div className="lg:col-span-5 relative z-20" key={`text-${activeIndex}`}>
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-600 opacity-50"></div>
                            <div className="relative pl-4 pt-2">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium animate-[fadeSlide_0.6s_ease-out]">
                                    {activeCar.kicker}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-red-600 leading-[0.95] tracking-tight mb-1 animate-[fadeSlide_0.7s_ease-out]">
                            {activeCar.name}
                        </h1>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 leading-[0.95] tracking-tight mb-6 animate-[fadeSlide_0.8s_ease-out]">
                            {activeCar.subtitle}
                        </h1>
                        <p className="text-sm md:text-base text-zinc-600 max-w-md leading-relaxed mb-8 animate-[fadeSlide_0.9s_ease-out]">
                            {activeCar.description}
                        </p>
                        <Link
                            href="/explore-cars"
                            className="inline-flex items-center gap-3 group animate-[fadeSlide_1s_ease-out]"
                        >
                            <span className="px-7 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all">
                                Explore Cars
                            </span>
                            <span className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:translate-x-1 transition-all">
                                <ArrowRight className="w-4 h-4 text-white" strokeWidth={3} />
                            </span>
                        </Link>
                    </div>
                    <div className="lg:col-span-7 relative h-75 md:h-100 lg:h-120">
                        <div
                            key={`badge-${activeIndex}`}
                            className="absolute top-0 left-4 md:left-8 z-30 animate-[badgeBounce_0.6s_cubic-bezier(0.68,-0.55,0.27,1.55)]"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-zinc-900 rounded-2xl rotate-[-8deg] shadow-2xl"></div>
                                <div className="relative px-5 py-3 rounded-2xl">
                                    <div className="text-3xl md:text-4xl font-black text-red-500 leading-none">
                                        {activeCar.discount}
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider mt-1">
                                        Discount
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -left-3 flex flex-col gap-0.5">
                                    <div className="w-6 h-0.5 bg-red-600"></div>
                                    <div className="w-4 h-0.5 bg-red-600"></div>
                                    <div className="w-2 h-0.5 bg-red-600"></div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-full lg:mt-18">
                            {cars.map((car, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <div
                                        key={car.image}
                                        className={`absolute inset-0 flex items-end justify-center transition-all duration-800 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
                                            isActive
                                                ? 'opacity-100 translate-x-0 scale-100 z-10'
                                                : 'opacity-0 translate-x-40 scale-90 z-1'
                                        }`}
                                    >
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="relative w-full h-full object-contain"
                                            style={{
                                                filter: 'drop-shadow(0 30px 25px rgba(0,0,0,0.4)) drop-shadow(0 10px 10px rgba(0,0,0,0.3))',
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 mt-6 relative z-20">
                    {cars.map((car, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className="group flex items-center"
                        >
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${
                                idx === activeIndex
                                    ? 'w-7 bg-red-600 shadow-md shadow-red-600/40'
                                    : 'w-2 bg-zinc-400 group-hover:bg-zinc-500'
                            }`}></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;