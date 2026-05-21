import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">

            <div className="w-full max-w-xl text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-200 rounded-md mb-8 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-600">
                        Error · Page Not Found
                    </span>
                </div>
                <h1 className="text-[8rem] md:text-[10rem] font-black text-red-600 leading-none tracking-tighter mb-4">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tight leading-tight mb-4">
                    Wrong Turn, <span className="text-red-600">Driver</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-600 max-w-md mx-auto mb-10 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on the road.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-red-600/30 transition-all"
                    >
                        <Home size={16} strokeWidth={3} />
                        Back to Home
                    </Link>
                    <Link
                        href="/explore-cars"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-700 text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all"
                    >
                        <Search size={16} strokeWidth={3} />
                        Browse Cars
                    </Link>
                </div>
            </div>
        </div>
    );
}