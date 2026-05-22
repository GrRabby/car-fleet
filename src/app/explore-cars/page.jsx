'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {Car,Search,SlidersHorizontal,PackageX,Loader2,CheckCircle2,X, Check} from 'lucide-react';
import CarCard from '@/components/CarCard';

const CAR_TYPES = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports', 'Electric', 'Convertible', 'Truck'];

export default function ExploreCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [delayedSearch, setDebouncedSearch] = useState('');
    const [carType, setCarType] = useState('All');
    const [showUnavailable, setShowUnavailable] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);
    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (delayedSearch) params.append('search', delayedSearch);
                if (carType !== 'All') params.append('type', carType);
                if (!showUnavailable) params.append('availability', 'available');
                if (sortBy) params.append('sort', sortBy);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/explore-cars?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();
                setCars(data);
            } catch (err) {
                toast.error('Could not load cars');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [delayedSearch, carType, showUnavailable, sortBy]);

    const clearFilters = () => {
        setSearchQuery('');
        setCarType('All');
        setShowUnavailable(true);
        setSortBy('newest');
    };
    const hasActiveFilters = searchQuery || carType !== 'All' || !showUnavailable;

    return (
        <div className="min-h-screen bg-zinc-100 relative overflow-hidden py-12 lg:py-16 animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -top-2 -left-2 w-7 h-7 border-l-4 border-t-4 border-red-600"></div>
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-red-600 opacity-50"></div>
                        <div className="relative pl-3 pt-1">
                            <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                Browse Fleet
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tight mb-2">
                        Explore <span className="text-red-600">All Cars</span>
                    </h1>
                    <p className="text-sm md:text-base text-zinc-600 max-w-2xl">
                        Browse our entire fleet. Search by name, filter by type, find your perfect ride.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {[
                        { label: 'Total Cars', value: cars.length, icon: Car, color: 'red' },
                        { label: 'Available Now', value: cars.filter(c => c.availability === 'available').length, icon: CheckCircle2, color: 'green' },
                        { label: 'Car Types', value: new Set(cars.map(c => c.type)).size, icon: SlidersHorizontal, color: 'zinc' },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                        stat.color === 'red' ? 'bg-red-50' :
                                        stat.color === 'green' ? 'bg-green-50' :
                                        stat.color === 'amber' ? 'bg-amber-50' : 'bg-zinc-100'
                                    }`}>
                                        <Icon size={16} className={
                                            stat.color === 'red' ? 'text-red-600' :
                                            stat.color === 'green' ? 'text-green-600' :
                                            stat.color === 'amber' ? 'text-amber-600' : 'text-zinc-600'
                                        } strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-zinc-900 font-mono leading-none">{stat.value}</div>
                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search size={16} className="text-zinc-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by car name (e.g. BMW M4, Tesla)..."
                                    className="w-full pl-11 pr-10 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
                                    >
                                        <X size={14} strokeWidth={2.5} />
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <SlidersHorizontal size={14} className="text-zinc-400" />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="pl-9 pr-8 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 text-xs font-bold uppercase tracking-wider appearance-none cursor-pointer min-w-45"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="priceHigh">Price · High to Low</option>
                                    <option value="priceLow">Price · Low to High</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setShowUnavailable(!showUnavailable)}
                                className={`px-4 h-11 text-[10px] font-bold uppercase tracking-wider rounded-lg border-2 transition-all flex items-center gap-2 ${
                                    showUnavailable
                                        ? 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                                        : 'bg-red-50 border-red-200 text-red-700 hover:border-red-300'
                                }`}
                            >
                                <div className={`w-3 h-3 rounded border-2 flex items-center justify-center transition-colors ${
                                    showUnavailable ? 'bg-red-600 border-red-600' : 'bg-white border-zinc-300'
                                }`}>
                                    {showUnavailable && (
                                        <Check className="w-2 h-2 text-white" strokeWidth={4} />
                                    )}
                                </div>
                                Show Unavailable
                            </button>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 shrink-0">
                                Type:
                            </span>
                            {CAR_TYPES.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setCarType(type)}
                                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all shrink-0 ${
                                        carType === type
                                            ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
                        {loading ? (
                            <>
                                <Loader2 size={12} className="animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-zinc-900">{cars.length}</span>
                                <span>{cars.length === 1 ? 'car' : 'cars'} found</span>
                                {delayedSearch && (
                                    <span className="text-red-600 font-bold">· &quot;{delayedSearch}&quot;</span>
                                )}
                                {carType !== 'All' && (
                                    <span className="text-red-600 font-bold">· {carType}</span>
                                )}
                            </>
                        )}
                    </div>

                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
                        >
                            <X size={12} strokeWidth={3} />
                            Clear filters
                        </button>
                    )}
                </div>
                {
                    loading ?
                        (<div className="min-h-screen bg-zinc-100 flex items-start justify-center mt-30">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                                <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Loading Fleets</p>
                            </div>
                        </div>) :
                        cars.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-zinc-300 rounded-2xl py-20 px-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
                                    <PackageX size={28} className="text-zinc-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-2">
                                    {hasActiveFilters ? 'No cars match your search' : 'No cars available'}
                                </h3>
                                <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                                    {hasActiveFilters
                                        ? 'Try adjusting your search or filters. Maybe broaden your criteria.'
                                        : 'Check back soon — new cars are added regularly.'}
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-red-600/30 transition-all"
                                    >
                                        <X size={14} strokeWidth={3} />
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map((car, index) => (
                                    <CarCard key={car._id} car={car} index={index} />
                                ))}
                            </div>
                        )
                }
            </div>
        </div>
    );
};