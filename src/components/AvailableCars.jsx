import Link from 'next/link';
import CarCard from './CarCard';
import { ArrowRight } from 'lucide-react';


const AvailableCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
    const cars = await res.json();
    return (
        <section className="relative bg-zinc-50 py-16 lg:py-24 overflow-hidden w-full">
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-md mb-4 animate-[headerSlide_0.6s_ease-out]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-600">Available Fleet</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-tight tracking-tight animate-[headerSlide_0.7s_ease-out]">
                            Choose Your <span className="relative inline-block text-red-600">
                                Ride
                                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-red-600/30 rounded-full"></span>
                            </span>
                        </h2>
                        <p className="text-sm md:text-base text-zinc-600 mt-2 max-w-xl animate-[headerSlide_0.8s_ease-out]">
                            Verified vehicles from trusted local hosts. Book in seconds, drive in minutes.
                        </p>
                    </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car, idx) => (
                        <CarCard key={car._id} car={car} index={idx} />
                    ))}
                </div>
                {cars.length === 0 && (
                    <div className="text-center py-20 animate-[cardReveal_0.5s_ease-out] bg-white">
                        <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider">No cars found</p>
                    </div>
                )}
                <div className="flex flex-col items-center mt-12">
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                        Showing <span className="text-red-600 font-bold">{cars.length}</span> of <span className="text-zinc-900 font-bold">{cars.length}</span> cars
                    </p>
                    <Link
                        href="/explore-cars"
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-zinc-900 hover:border-red-600 text-zinc-900 text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-md hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-1 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-zinc-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                        <span className="relative transition-colors duration-300 group-hover:text-white">Browse All Cars</span>
                        <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AvailableCars;