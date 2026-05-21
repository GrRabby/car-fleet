import React from 'react';
import { Search, Calendar, Key, ArrowRight, Check, Zap } from 'lucide-react';
import Link from 'next/link';
const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: Search,
            title: 'Find Your Car',
            description: 'Browse thousands of verified vehicles. Filter by location, price, type, or features to find your perfect match.',
            bullets: ['12K+ cars available', 'Verified hosts', 'Real-time availability'],
        },
        {
            number: '02',
            icon: Calendar,
            title: 'Book in Seconds',
            description: 'Choose your dates, confirm pickup location, and complete booking instantly. No paperwork, no waiting around.',
            bullets: ['Instant confirmation', 'Flexible cancellation', 'Secure payment'],
        },
        {
            number: '03',
            icon: Key,
            title: 'Hit The Road',
            description: 'Meet your host, grab the keys, and start your trip. Insurance and 24/7 support included with every rental.',
            bullets: ['Quick handoff', 'Full insurance', '24/7 roadside help'],
        },
    ];
    return (
        <section className="relative bg-zinc-100 py-20 lg:py-28 overflow-hidden w-full">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            ></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className='flex justify-center items-center gap-4'>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full mb-5 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-600">
                                How It Works
                            </span>
                        </div>
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-600 opacity-50"></div>
                            <div className="relative px-4 pt-2">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                    Three Steps
                                </span>
                            </div>
                        </div>
                    </div>
                    

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tighter mb-4">
                        From Browse to <span className="text-red-600">Drive</span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto">
                        Three steps. Sixty seconds. That&apos;s all it takes to get behind the wheel of your next ride.
                    </p>
                </div>
                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-[16.66%] right-[16.66%] h-px">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-red-400 to-transparent origin-left animate-[lineDraw_1.5s_ease-out_0.5s_both]"></div>
                            <div className="absolute left-1/4 -top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            <div className="absolute left-2/4 -top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            <div className="absolute left-3/4 -top-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className="relative animate-[stepReveal_0.8s_cubic-bezier(0.34,1.2,0.64,1)_both]"
                                    style={{ animationDelay: `${idx * 200}ms` }}
                                >
                                    <div className="relative flex items-center justify-center mb-8">
                                        <div className="absolute w-28 h-28 border border-red-300 rounded-full"></div>
                                        <div className="absolute w-24 h-24 border border-red-400/60 rounded-full"></div>
                                        <div className="relative w-20 h-20 bg-linear-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(239,68,68,0.35)] border border-red-400/50">
                                            <span className="absolute inset-x-3 top-1 h-1/3 bg-linear-to-b from-white/30 to-transparent rounded-full pointer-events-none"></span>
                                            <Icon size={28} className="text-white relative drop-shadow-md" strokeWidth={2.5} />
                                        </div>
                                        <div className="absolute -top-2 right-1/2 translate-x-16 px-3 py-1 bg-white border border-zinc-200 rounded-md shadow-sm">
                                            <span className="text-[10px] font-mono font-black text-red-600 tracking-widest">
                                                {step.number}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm text-center max-w-sm mx-auto">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <div className="w-6 h-px bg-red-500/50"></div>
                                            <span className="text-[10px] font-mono text-red-600 uppercase tracking-[0.3em] font-bold">
                                                Step {step.number}
                                            </span>
                                            <div className="w-6 h-px bg-red-500/50"></div>
                                        </div>
                                        <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                                            {step.description}
                                        </p>
                                        <ul className="flex flex-col gap-2 pt-4 border-t border-dashed border-zinc-200">
                                            {step.bullets.map((bullet, bIdx) => (
                                                <li
                                                    key={bIdx}
                                                    className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-700"
                                                >
                                                    <Check className="w-3 h-3 text-red-600" strokeWidth={3} />
                                                    <span className="font-bold">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-6 bg-white border border-zinc-200 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-zinc-900 uppercase tracking-wider">Ready to Drive?</div>
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Your next trip is one tap away</div>
                            </div>
                        </div>
                        <Link
                            href="/explore-cars"
                            className="relative group/btn active:translate-y-0.5 transition-all duration-150"
                        >
                            <div className="relative px-6 py-3 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center gap-2.5 border border-red-800/50 overflow-hidden">
                                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                }}></span>
                                <span className="relative text-white text-xs font-black uppercase tracking-[0.2em] drop-shadow-md">
                                    Start Your Trip
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-white drop-shadow-md group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;