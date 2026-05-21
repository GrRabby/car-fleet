import { ArrowRight, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CarCard = ({ car, index }) => {
    const isUnavailable = car.availability === 'unavailable';
    return (
        <div
            className={`group relative  bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-red-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 animate-[cardReveal_0.6s_cubic-bezier(0.34,1.2,0.64,1)_both]`}
            style={{ animationDelay: `${index * 80}ms` }}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(239,68,68,0.15) 50%, transparent 70%)',
            }}></div>
            <div className={`relative h-52 overflow-hidden bg-linear-to-br from-zinc-100 to-zinc-200 ${
                isUnavailable
                    ? 'opacity-75 grayscale-20'
                    : ''
                }`}>
                {isUnavailable && (
                    <div className="absolute top-12 left-0 right-0 z-30 bg-zinc-900/85 backdrop-blur-sm py-2 text-center -rotate-2 origin-center shadow-lg">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-red-400">
                            ▸ Currently Unavailable
                        </span>
                    </div>
                )}
                <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:rotate-1"
                />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-10" style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 70%)',
                }}></div>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${!isUnavailable ? 'bg-white/95 text-zinc-900' : 'bg-black/60 text-white'}  backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider  shadow-sm`}>
                        <span className="relative flex h-1.5 w-1.5">
                            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${!isUnavailable ? 'bg-green-500' : 'bg-red-500'} opacity-75`}></span>
                            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${!isUnavailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        </span>
                        {!isUnavailable ? 'Available' : 'Unavailable'}
                    </span>
                </div>
                <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 bg-zinc-900/85 backdrop-blur-sm rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-red-600">
                        {car.type}
                    </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent z-10"></div>
            </div>
            <div className="relative p-5 z-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-black text-zinc-900 leading-tight tracking-tight transition-colors duration-300 group-hover:text-red-600">
                        {car.name}
                    </h3>
                    <span className='text-xs text-zinc-600 leading-relaxed font-medium'>{car.booking_count || 0} Bookings</span>
                </div>
                <div className="flex items-center justify-between gap-1.5 mb-4 text-xs text-zinc-500">
                    <div className='flex gap-2 items-center justify-center'>
                        <MapPin className="w-3.5 h-3.5 text-red-500 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5" />
                        <span className="font-medium">{car.location}</span>
                        <span className="text-zinc-300">·</span>
                    </div>
                    <div>
                        <div className={`flex flex-col items-center gap-1 py-1.5 transition-all duration-300 group-hover:gap-1.5`}>
                            <Users className="w-4 h-4  text-zinc-400 transition-all duration-300 group-hover:text-red-500 group-hover:scale-110" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700">{car.seats} Seats</span>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-5 min-h-8">
                    {car.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-zinc-900 font-mono transition-colors duration-300 group-hover:text-red-600">${car.pricePerDay}</span>
                            <span className="text-xs text-zinc-500 font-medium">/day</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">All-inclusive</span>
                    </div>
                    <Link
                        href={`/cars/${car._id}`}
                        className="relative group/btn active:translate-y-0.5 transition-all duration-150"
                    >
                        <div className="relative m-0.5 px-4 py-2.5 bg-linear-to-b from-red-500 to-red-700 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] flex items-center gap-2 border border-red-800/50 overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}></span>
                            <span className="relative text-white text-[11px] font-black uppercase tracking-wider drop-shadow-md">
                                View Details
                            </span>
                            <ArrowRight
                                className="relative w-3 h-3 text-white drop-shadow-md group-hover/btn:translate-x-1 transition-transform duration-300"
                                strokeWidth={3}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;