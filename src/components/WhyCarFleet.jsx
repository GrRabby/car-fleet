import React from 'react';
import { Shield, Zap, Clock, Award, MapPin, Headphones, Search } from 'lucide-react';
const WhyCarFleet = () => {
    const features = [
        {
            icon: Shield,
            title: 'Fully Insured',
            description: 'Every trip includes comprehensive insurance and 24/7 roadside assistance. Drive without worry.',
            stat: '100%',
            statLabel: 'Coverage',
            accent: 'from-emerald-500 to-teal-500',
        },
        {
            icon: Zap,
            title: 'Instant Booking',
            description: 'No waiting, no approval delays. Book your car in under 60 seconds and hit the road.',
            stat: '< 60s',
            statLabel: 'Avg Booking',
            accent: 'from-amber-500 to-orange-500',
        },
        {
            icon: Award,
            title: 'Verified Hosts',
            description: 'Every host and vehicle goes through rigorous verification. Quality you can trust.',
            stat: '4.9★',
            statLabel: 'Avg Rating',
            accent: 'from-red-500 to-orange-500',
        },
        {
            icon: MapPin,
            title: '50+ Locations',
            description: 'Pick up nearby, drop off anywhere. Our fleet spans every major city in the region.',
            stat: '50+',
            statLabel: 'Cities',
            accent: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Clock,
            title: 'Flexible Rentals',
            description: 'By the hour, day, week, or month. Rent on your terms with no hidden fees or surprises.',
            stat: '24/7',
            statLabel: 'Available',
            accent: 'from-purple-500 to-pink-500',
        },
        {
            icon: Headphones,
            title: 'Premium Support',
            description: 'Our team is here for you 24/7. Chat, call, or email — we respond in minutes, not hours.',
            stat: '< 2min',
            statLabel: 'Response',
            accent: 'from-rose-500 to-red-500',
        },
    ];
    return (
        <section className="relative bg-linear-to-b from-zinc-50 via-white to-zinc-50 py-20 lg:py-28 overflow-hidden w-full border-t border-b border-t-red-100 border-b-red-100">
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-red-400/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className='flex justify-center items-center gap-5'>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full mb-5 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-600">
                                Why CarFleet
                            </span>
                        </div>
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-600 opacity-50"></div>
                            <div className="relative px-4 pt-2">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                    Built For
                                </span>
                            </div>
                        </div>
                    </div>
                    

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tighter mb-4">
                        Drivers Who <span className="text-red-600">Demand More</span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto">
                        Six reasons thousands of drivers and hosts choose CarFleet for every trip, every time.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="group relative animate-[featureReveal_0.7s_cubic-bezier(0.34,1.2,0.64,1)_both]"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <div className={`absolute -inset-px bg-linear-to-br ${feature.accent} rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
                                <div className="relative h-full bg-white rounded-2xl p-7 border border-zinc-200 group-hover:border-transparent transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/5">
                                    <div className="flex items-start justify-between mb-5">
                                        <div className={`relative w-14 h-14 rounded-xl bg-linear-to-br ${feature.accent} p-0.5 group-hover:animate-[iconFloat_2s_ease-in-out_infinite]`}>
                                            <div className={`w-full h-full rounded-[10px] flex items-center justify-center bg-linear-to-br ${feature.accent}`}>
                                                <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`bg-linear-to-br ${feature.accent} bg-clip-text text-transparent text-2xl font-black font-mono leading-none`}>
                                                {feature.stat}
                                            </div>
                                            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                                                {feature.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-black text-zinc-900 mb-2 tracking-tight uppercase">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="absolute bottom-0 left-7 right-7 h-px bg-linear-to-r from-transparent via-zinc-200 to-transparent group-hover:via-red-300 transition-colors duration-500"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyCarFleet;