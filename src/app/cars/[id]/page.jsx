'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import {Car,MapPin,Users,Calendar,DollarSign,Shield,Zap,Star,ArrowLeft,ArrowRight,Check,X,Loader2,AlertCircle,User,FileText,CheckCircle2,Clock,Tag,} from 'lucide-react';

export default function CarDetails() {
    const {id: carID} = useParams();
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [bookingCheckLoading, setBookingCheckLoading] = useState(true);
    // This is for checking if user has already booked this car
    useEffect(() => {
        const checkBooking = async () => {
            if (!session || !carID) {
                setAlreadyBooked(false);
                setBookingCheckLoading(false);
                return;
            }
            try {
                const { data: tokenData } = await authClient.token();
                if (!tokenData?.token){
                    setBookingCheckLoading(false);
                    return;
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/check/${carID}`, {
                    headers: { 'Authorization': `Bearer ${tokenData.token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setAlreadyBooked(data.booked === true);
                }
            } catch (err) {
                console.error('Could not check booking status:', err);
            } finally {
                setBookingCheckLoading(false);
            }
        };
        checkBooking();
    }, [carID, session]);
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carID}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        router.push('/404');
                        return;
                    }
                    throw new Error('Failed to fetch');
                }
                const data = await res.json();
                setCar(data);
            } catch (err) {
                toast.error('Could not load car details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (carID) fetchCar();
    }, [carID, router]);

    
    const handleBookClick = () => {
        if (!session) {
            toast.error('Please sign in to book a car');
            router.push(`/login`);
            return;
        }
        setBookingOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Loading Car Details</p>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-black uppercase mb-2">Car Not Found</h2>
                    <Link href="/explore-cars" className="text-red-600 font-bold uppercase tracking-wider text-sm">
                        Back to Browse
                    </Link>
                </div>
            </div>
        );
    }

    const isUnavailable = car.availability === 'unavailable';

    return (
        <div className="min-h-screen bg-zinc-100 relative overflow-hidden py-8 lg:py-12 animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute top-0 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/explore-cars"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 hover:text-red-600 transition-colors mb-6 font-bold"
                >
                    <ArrowLeft size={14} strokeWidth={3} />
                    Back to Browse
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                    <div className="lg:col-span-3">
                        <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                            <div className="relative h-72 md:h-96 lg:h-115 overflow-hidden bg-linear-to-br from-zinc-100 to-zinc-200">
                                <img
                                    src={car.imageUrl || car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                                        isUnavailable
                                            ? 'bg-zinc-900/95 border-zinc-700 text-white'
                                            : 'bg-green-500/95 border-green-400 text-white'
                                    }`}>
                                        <span className="relative flex h-1.5 w-1.5">
                                            {!isUnavailable && (
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                            )}
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
                                        </span>
                                        {isUnavailable ? 'Unavailable' : 'Available Now'}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 shadow-sm">
                                        <Tag size={12} strokeWidth={2.5} />
                                        {car.type}
                                    </span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
                                    <div>
                                        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 mb-1">
                                            Listing · {car._id?.slice(-6).toUpperCase() || 'DRV-001'}
                                        </div>
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg">
                                            {car.name}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <FileText size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">About This Car</h2>
                            </div>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                {car.description}
                            </p>
                        </div>
                        <div className="mt-6 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <Star size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">What&apos;s Included</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { icon: Shield, label: 'Full Insurance Coverage', desc: 'Damage & liability included' },
                                    { icon: Clock, label: '24/7 Roadside Help', desc: 'Anywhere, anytime' },
                                    { icon: Zap, label: 'Instant Confirmation', desc: 'No waiting, no approval' },
                                    { icon: Check, label: 'Free Cancellation', desc: 'Up to 24h before pickup' },
                                ].map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                                            <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                                                <Icon size={14} className="text-red-600" strokeWidth={2.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-black text-zinc-900 uppercase tracking-wider">{feature.label}</div>
                                                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{feature.desc}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="lg:sticky lg:top-6 space-y-6">
                            <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden">
                                <div className="p-6 bg-linear-to-br from-zinc-50 to-white border-b border-zinc-200">
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl font-black text-zinc-900 font-mono leading-none">
                                            ${car.pricePerDay}
                                        </span>
                                        <span className="text-sm text-zinc-500 font-bold">/ day</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">All-inclusive rate</span>
                                        <div className="flex gap-0.5">
                                            <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
                                            <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
                                            <div className="w-1 h-2 bg-zinc-300 rounded-sm"></div>
                                        </div>
                                        <span className="text-[10px] font-mono text-green-600 font-bold">FAIR PRICE</span>
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Seats', value: car.seats, icon: Users },
                                        { label: 'Type', value: car.type, icon: Tag },
                                        { label: 'Location', value: car.location, icon: MapPin, full: true },
                                    ].map((spec, idx) => {
                                        const Icon = spec.icon;
                                        return (
                                            <div key={idx} className={`p-3 bg-zinc-50 border border-zinc-200 rounded-lg shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] ${spec.full ? 'col-span-2' : ''}`}>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Icon size={11} className="text-zinc-400" strokeWidth={2.5} />
                                                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold">{spec.label}</span>
                                                </div>
                                                <div className="text-sm font-black text-zinc-900 uppercase tracking-tight truncate">{spec.value}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="p-6 pt-0">
                                    {bookingCheckLoading ? (
                                        <div className="w-full px-6 py-4 bg-zinc-100 border-2 border-zinc-200 rounded-xl flex items-center justify-center gap-2.5 animate-pulse">
                                            <Loader2 size={18} className="text-zinc-400 animate-spin" strokeWidth={2.5} />
                                            <span className="text-zinc-500 text-sm font-black uppercase tracking-[0.2em]">
                                                Checking...
                                            </span>
                                        </div>
                                        ) : alreadyBooked ? (
                                        <>
                                            <div className="w-full px-6 py-4 bg-linear-to-b from-green-50 to-green-100 border-2 border-green-300 rounded-xl flex items-center justify-center gap-2.5 shadow-sm">
                                                <CheckCircle2 size={18} className="text-green-600" strokeWidth={3} />
                                                <span className="text-green-700 text-sm font-black uppercase tracking-[0.2em]">
                                                    Already Booked
                                                </span>
                                            </div>

                                        </>
                                    ) : (
                                        <button
                                            onClick={handleBookClick}
                                            disabled={isUnavailable}
                                            className="w-full relative group/btn active:translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                        >
                                            <div className="relative px-6 py-4 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center justify-center gap-2.5 border border-red-800/50 overflow-hidden">
                                                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                                }}></span>
                                                <Calendar size={18} className="relative text-white drop-shadow-md" strokeWidth={3} />
                                                <span className="relative text-white text-sm font-black uppercase tracking-[0.2em] drop-shadow-md">
                                                    {isUnavailable ? 'Currently Unavailable' : 'Book Now'}
                                                </span>
                                                {!isUnavailable && (
                                                    <ArrowRight size={16} className="relative text-white drop-shadow-md group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                                                )}
                                            </div>
                                        </button> )}

                                    {!isUnavailable && (
                                        <p className="text-[10px] font-mono text-center uppercase tracking-wider text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                                            <CheckCircle2 size={11} className="text-green-500" />
                                            Free cancellation · No charge until pickup
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-500/30">
                                        {(car.hostName || 'H')[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Hosted by</span>
                                            <CheckCircle2 size={10} className="text-blue-500" />
                                        </div>
                                        <div className="text-sm font-black text-zinc-900 truncate">{car.hostName || 'Verified Host'}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex items-center gap-0.5">
                                                <Star size={10} className="text-amber-500 fill-amber-500" />
                                                <span className="text-[10px] font-bold font-mono">4.9</span>
                                            </div>
                                            <span className="text-[10px] text-zinc-400">·</span>
                                            <span className="text-[10px] font-mono text-zinc-500">Joined 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                                    <span className="text-zinc-500">Listing ID</span>
                                    <span className="text-zinc-900 font-bold">CAR-{car._id?.slice(-6).toUpperCase() || '000001'}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                                    <span className="text-zinc-500">Listed</span>
                                    <span className="text-zinc-900 font-bold">
                                        {car.createdAt
                                            ? new Date(car.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                            : 'Recently'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                                    <span className="text-zinc-500">Status</span>
                                    <span className={`font-bold ${isUnavailable ? 'text-zinc-700' : 'text-green-600'}`}>
                                        ▸ {car.availability || 'available'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                                    <span className="text-zinc-500">Times Booked</span>
                                    <span className="text-red-600 font-bold">{car.booking_count || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {bookingOpen && (
                <BookingModal
                    car={car}
                    session={session}
                    onClose={() => setBookingOpen(false)}
                />
            )}
        </div>
    );
}

const BookingModal = ({ car, session, onClose }) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            driverNeeded: 'yes',
            specialNote: '',
        },
    });
    const driverNeeded = useWatch({
        control,
        name: 'driverNeeded',
        defaultValue: 'yes',
    });
    const handleBooking = async (data) => {
        setSubmitting(true);
        try {
            const { data: tokenData, error: tokenError } = await authClient.token();
            if (tokenError || !tokenData?.token) {
                toast.error('Session expired. Please sign in again.');
                router.push('/login');
                return;
            }

            const payload = {
                carId: car._id,
                carName: car.name,
                imageUrl: car.imageUrl,
                pricePerDay: car.pricePerDay,
                userID: session.user.id,
                userName: session.user.name,
                userEmail: session.user.email,
                driverNeeded: data.driverNeeded === 'yes',
                specialNote: data.specialNote.trim(),
                createdAt: new Date().toISOString(),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Booking failed');

            toast.success('Booking confirmed! Check your trips for details.');
            setTimeout(() => {
                onClose();
                router.push('/my-bookings');
            }, 1000);
        } catch (err) {
            toast.error('Could not complete booking. Please try again.');
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 max-h-[90vh] overflow-hidden flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-linear-to-r from-zinc-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                            <Calendar size={16} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Book This Car</h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Confirm trip details</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>
                <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
                    <div className="flex items-center gap-3">
                        <img
                            src={car.imageUrl || car.image}
                            alt={car.name}
                            className="w-16 h-16 object-cover rounded-lg shrink-0 border border-zinc-200"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-black text-zinc-900 truncate uppercase">{car.name}</div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">
                                {car.type} · {car.location}
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-base font-black text-red-600 font-mono">${car.pricePerDay}</span>
                                <span className="text-[10px] text-zinc-500 font-mono">/ day</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleBooking)} className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                            Do You Need A Driver? <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: 'yes', label: 'Yes, Include Driver', icon: User, desc: '+$25/day' },
                                { value: 'no', label: 'Self-Drive', icon: Car, desc: 'I will drive' },
                            ].map((option) => {
                                const Icon = option.icon;
                                const isSelected = driverNeeded === option.value;
                                return (
                                    <label key={option.value} className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            value={option.value}
                                            {...register('driverNeeded', { required: true })}
                                            className="peer sr-only"
                                        />
                                        <div className={`p-3 border-2 rounded-xl transition-all ${
                                            isSelected
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                                    isSelected ? 'border-red-500' : 'border-zinc-300'
                                                }`}>
                                                    {isSelected && (
                                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    )}
                                                </div>
                                                <Icon size={14} className={isSelected ? 'text-red-600' : 'text-zinc-500'} strokeWidth={2.5} />
                                            </div>
                                            <div className={`text-xs font-black uppercase tracking-wider ${
                                                isSelected ? 'text-red-700' : 'text-zinc-900'
                                            }`}>
                                                {option.label}
                                            </div>
                                            <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                                                {option.desc}
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                            Special Note
                            <span className="text-zinc-400 ml-2 font-normal normal-case tracking-normal">(Optional)</span>
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Notes..."
                            {...register('specialNote', {
                                maxLength: { value: 500, message: 'Note must be under 500 characters' },
                            })}
                            className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400 resize-none"
                        />
                        {errors.specialNote && (
                            <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle size={12} strokeWidth={3} />
                                {errors.specialNote.message}
                            </p>
                        )}
                    </div>
                    <div className="p-4 bg-linear-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign size={14} className="text-red-600" strokeWidth={2.5} />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-700">
                                Booking Summary
                            </span>
                        </div>
                        <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-600 font-medium">Daily rate</span>
                                <span className="font-mono font-bold text-zinc-900">${car.pricePerDay}/day</span>
                            </div>
                            {driverNeeded === 'yes' && (
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-600 font-medium">Driver fee</span>
                                    <span className="font-mono font-bold text-zinc-900">+$25/day</span>
                                </div>
                            )}
                            <div className="pt-2 mt-2 border-t border-dashed border-red-200 flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wider text-zinc-900">Total / day</span>
                                <span className="font-mono font-black text-red-600 text-base">
                                    ${car.pricePerDay + (driverNeeded === 'yes' ? 25 : 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-200 bg-zinc-50">
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="px-5 py-2.5 bg-white border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 text-xs font-black uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit(handleBooking)}
                        disabled={submitting}
                        className="relative group/btn active:translate-y-0.5 transition-all duration-150 disabled:opacity-70"
                    >
                        <div className="relative px-5 py-2.5 bg-linear-to-b from-red-500 to-red-700 rounded-lg shadow-md shadow-red-600/30 flex items-center gap-2 border border-red-800/50 overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}></span>
                            {submitting ? (
                                <Loader2 size={14} className="relative text-white animate-spin" />
                            ) : (
                                <Check size={14} className="relative text-white drop-shadow-md" strokeWidth={3} />
                            )}
                            <span className="relative text-white text-xs font-black uppercase tracking-[0.15em] drop-shadow-md">
                                {submitting ? 'Booking...' : 'Confirm Booking'}
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};