'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import {Car,Loader2,Search,SlidersHorizontal,PackageX,Trash2,AlertTriangle} from 'lucide-react';
import BookingCard from '@/components/BookingCard';

export default function MyBookings() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update , setUpdate] = useState(true)
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [cancelingBooking, setCancelingBooking] = useState(null);

    useEffect(() => {
        if (!session) return;

        const fetchBookings = async () => {
            try {
                setLoading(true);
                const { data: tokenData, error: tokenError } = await authClient.token();
                if (tokenError || !tokenData?.token) {
                    toast.error('Authentication failed');
                    return;
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`, {
                    headers: { 'Authorization': `Bearer ${tokenData.token}` },
                });

                if (!res.ok) throw new Error('Failed to fetch bookings');

                const data = await res.json();
                setBookings(data);
            } catch (err) {
                toast.error('Could not load your bookings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [session,update]);

    const handleCancel = async (bookingId) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${tokenData.token}` },
            });

            if (!res.ok) throw new Error('Cancel failed');
            toast.success('Booking cancelled');
            setCancelingBooking(null);
            setUpdate(!update)
        } catch (err) {
            toast.error('Failed to cancel booking');
        }
    };

    const filteredBookings = bookings
        .filter(booking => {
            const matchesSearch = (booking.carName || '').toLowerCase().includes(searchText.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'priceHigh': return (b.pricePerDay || 0) - (a.pricePerDay || 0);
                case 'priceLow': return (a.pricePerDay || 0) - (b.pricePerDay || 0);
                default: return 0;
            }
        });
    if (sessionPending || loading) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Loading Your bookings</p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-zinc-100 relative overflow-hidden py-12 lg:py-16 animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-7 h-7 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-red-600 opacity-50"></div>
                            <div className="relative pl-3 pt-1">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                    Trip History
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tight mb-2">
                            My <span className="text-red-600">Bookings</span>
                        </h1>
                        <p className="text-sm md:text-base text-zinc-600">
                            View, manage, and track all your car rentals in one place.
                        </p>
                    </div>
                    <Link
                        href="/explore-cars"
                        className="relative group/btn active:translate-y-0.5 transition-all duration-150"
                    >
                        <div className="relative px-6 py-3 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center gap-2.5 border border-red-800/50 overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}></span>
                            <Car size={16} className="relative text-white drop-shadow-md" strokeWidth={3} />
                            <span className="relative text-white text-xs font-black uppercase tracking-[0.2em] drop-shadow-md">
                                Book Another
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search size={16} className="text-zinc-400" />
                            </div>
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search by car name..."
                                className="w-full pl-11 pr-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <SlidersHorizontal size={14} className="text-zinc-400" />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-9 pr-8 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 text-xs font-bold uppercase tracking-wider appearance-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="priceHigh">Price · High to Low</option>
                                <option value="priceLow">Price · Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>
                {filteredBookings.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-zinc-500">
                        <span className="font-bold text-zinc-900">{filteredBookings.length}</span>
                        <span>of</span>
                        <span className="font-bold text-zinc-900">{bookings.length}</span>
                        <span>{bookings.length === 1 ? 'booking' : 'bookings'}</span>
                        {(searchText) && (
                            <button
                                onClick={() => { setSearchText('')}}
                                className="ml-2 text-red-600 hover:text-red-700 font-bold"
                            >
                                · Clear filters
                            </button>
                        )}
                    </div>
                )}
                {filteredBookings.length === 0 ? (
                    <EmptyState hasFilter={searchText} hasBookings={bookings.length > 0} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.map((booking, index) => (
                            <BookingCard
                                key={booking.id || booking._id}
                                booking={booking}
                                index={index}
                                onCancel={() => setCancelingBooking(booking)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {cancelingBooking && (
                <CancelModal
                    booking={cancelingBooking}
                    onCancel={() => setCancelingBooking(null)}
                    onConfirm={() => handleCancel(cancelingBooking._id)}
                />
            )}
        </div>
    );
}
const EmptyState = ({ hasFilter, hasBookings }) => (
    <div className="bg-white border-2 border-dashed border-zinc-300 rounded-2xl py-20 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
            <PackageX size={28} className="text-zinc-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-2">
            {hasFilter ? 'No bookings match your filters' : hasBookings ? 'No matches found' : 'No bookings yet'}
        </h3>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
            {hasFilter
                ? 'Try clearing your search or filters to see more.'
                : 'Browse available cars and book your first trip — it only takes a minute.'}
        </p>
        {!hasFilter && !hasBookings && (
            <Link
                href="/explore-cars"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-red-600/30 transition-all"
            >
                <Car size={14} strokeWidth={3} />
                Browse Cars
            </Link>
        )}
    </div>
);

const CancelModal = ({ booking, onCancel, onConfirm }) => {
    const [cancelling, setCancelling] = useState(false);

    const handleConfirm = async () => {
        setCancelling(true);
        await onConfirm();
        setCancelling(false);
    };

    const driverFee = booking.driverNeeded ? 25 : 0;
    const totalPrice = (booking.pricePerDay || 0) + driverFee;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
                <div className="p-6 bg-linear-to-br from-red-50 to-orange-50 border-b border-red-200 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-3">
                        <AlertTriangle size={24} className="text-red-600" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-1">Cancel Booking?</h2>
                    <p className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">This cannot be undone</p>
                </div>
                <div className="p-6">
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg mb-5">
                        <div className="text-sm font-black text-zinc-900 truncate mb-1">{booking.carName}</div>
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                            <span>${totalPrice}/day</span>
                            <span>{booking.driverNeeded ? '+Driver' : 'Self-drive'}</span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                        Are you sure you want to cancel this booking for <span className="font-bold text-zinc-900">{booking.carName}</span>? You won&apos;t be charged.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onCancel}
                            disabled={cancelling}
                            className="flex-1 px-4 py-3 bg-white border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 text-xs font-black uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
                        >
                            Keep Booking
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={cancelling}
                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {cancelling ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Cancelling...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={14} strokeWidth={3} />
                                    Cancel Booking
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};