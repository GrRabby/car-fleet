'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch  } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {Car,DollarSign,Tag,Image as ImageIcon,Users,MapPin,FileText,CheckCircle2,Upload,ArrowLeft,PlusCircle,AlertCircle, ArrowRight, ChevronDown,} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports', 'Electric', 'Convertible', 'Truck'];

export default function AddCar() {
    const {data:session, isPending: sessionPending} = authClient.useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            availability: 'available',
        },
    });
    const imageUrl = useWatch({
        control,
        name: 'imageUrl',
        defaultValue: '',
    });

    const handleAddCar = async (data) => {
        setLoading(true);
        try {

            const {data:tokenData} = await authClient.token();
            const payload = {
                ...data,
                pricePerDay: parseFloat(data.pricePerDay),
                seats: parseInt(data.seats, 10),
                createdAt: new Date().toISOString(),
                userID : session.user.id
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-car`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' ,
                    authorization : `Bearer ${tokenData?.token}`

                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Failed to add car');
            }

            toast.success('Car added successfully! Redirecting to your fleet...');
            setTimeout(() => router.push('/added-cars'), 1000);
        } catch (err) {
            toast.error(err.message || 'Failed to add car. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    if (!session) return;
    return (
        <div className="min-h-screen bg-zinc-100 relative overflow-hidden py-12 lg:py-16 animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/added-cars"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-600 hover:text-red-600 transition-colors mb-6 font-bold"
                >
                    <ArrowLeft size={14} strokeWidth={3} />
                    Back to My Fleet
                </Link>
                <div className="mb-10">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -top-2 -left-2 w-7 h-7 border-l-4 border-t-4 border-red-600"></div>
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-red-600 opacity-50"></div>
                        <div className="relative pl-3 pt-1">
                            <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                List Your Car
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tight mb-2">
                        Add a <span className="text-red-600">Vehicle</span>
                    </h1>
                    <p className="text-sm md:text-base text-zinc-600 max-w-2xl">
                        List your car on CarFleet and start earning. All fields are required for verification.
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
                    <div className="px-6 lg:px-8 py-4 bg-linear-to-r from-zinc-50 to-white border-b border-zinc-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-red-600">
                                New Listing · Draft
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleAddCar)} className="p-6 lg:p-8 space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <Car size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Vehicle Identity</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Section 01 · Basic Info</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Car Name <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <Car size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register('name', {
                                                required: 'Car name is required',
                                                minLength: { value: 3, message: 'Name must be at least 3 characters' },
                                            })}
                                            placeholder="e.g. BMW M4 Competition"
                                            className="w-full pl-11 pr-4 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Car Type <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <Tag size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <select
                                            {...register('type', { required: 'Car type is required' })}
                                            className="w-full pl-11 pr-4 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium appearance-none cursor-pointer"
                                        >
                                            <option value="">Select type...</option>
                                            {CAR_TYPES.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <ChevronDown className="w-4 h-4 text-zinc-400" strokeWidth={2.5} />
                                        </div>
                                    </div>
                                    {errors.type && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.type.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Seat Capacity <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <Users size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            {...register('seats', {
                                                required: 'Seat capacity is required',
                                                min: { value: 1, message: 'Must seat at least 1 person' },
                                                max: { value: 20, message: 'Maximum 20 seats' },
                                            })}
                                            placeholder="e.g. 5"
                                            className="w-full pl-11 pr-4 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                        />
                                    </div>
                                    {errors.seats && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.seats.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-zinc-200"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <DollarSign size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Pricing & Location</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Section 02 · Rental Terms</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Daily Rent Price <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <DollarSign size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            {...register('pricePerDay', {
                                                required: 'Price is required',
                                                min: { value: 1, message: 'Price must be greater than 0' },
                                            })}
                                            placeholder="e.g. 189"
                                            className="w-full pl-11 pr-16 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium font-mono placeholder:text-zinc-400"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold">/ day</span>
                                        </div>
                                    </div>
                                    {errors.pricePerDay && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.pricePerDay.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Pickup Location <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <MapPin size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register('location', {
                                                required: 'Pickup location is required',
                                                minLength: { value: 2, message: 'Location must be at least 2 characters' },
                                            })}
                                            placeholder="e.g. Dhaka, Gulshan-2"
                                            className="w-full pl-11 pr-4 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                        />
                                    </div>
                                    {errors.location && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.location.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-zinc-200"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <ImageIcon size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Vehicle Image</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Section 03 · Visual</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Image URL <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                            <ImageIcon size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                        </div>
                                        <input
                                            type="url"
                                            {...register('imageUrl', {
                                                required: 'Image URL is required',
                                                pattern: {
                                                    value: /^https?:\/\/.+/,
                                                    message: 'Must be a valid URL (https://...)',
                                                },
                                            })}
                                            placeholder="https://i.ibb.co/..."
                                            className="w-full pl-11 pr-4 h-12 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                        />
                                    </div>
                                    {errors.imageUrl && (
                                        <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {errors.imageUrl.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                        Preview
                                    </label>
                                    <div className="relative w-full h-32 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-xl overflow-hidden flex items-center justify-center">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    e.target.style.display = 'block';
                                                }}
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon size={28} className="text-zinc-300 mx-auto mb-1" strokeWidth={1.5} />
                                                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">No image yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-zinc-200"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <FileText size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Description</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Section 04 · Details</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">
                                    Car Description <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    {...register('description', {
                                        required: 'Description is required',
                                    })}
                                    rows={4}
                                    placeholder="Describe your car's features, condition, and what makes it special..."
                                    className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400 resize-none"
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                        <AlertCircle size={12} strokeWidth={3} />
                                        {errors.description.message}
                                    </p>
                                )}
                                <p className="text-[10px] font-mono text-zinc-400 mt-1.5 uppercase tracking-wider">
                                    Min 20 · Max 500 characters
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-zinc-200"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-md bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-500/30">
                                    <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Availability Status</h2>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Section 05 · Listing State</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { value: 'available', label: 'Available', desc: 'Ready for booking', color: 'green' },
                                    { value: 'unavailable', label: 'Unavailable', desc: 'Hidden from listings', color: 'zinc' },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className="relative cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            value={option.value}
                                            {...register('availability', { required: 'Availability is required' })}
                                            className="peer sr-only"
                                        />
                                        <div className={`flex items-center gap-3 p-4 bg-zinc-50 border-2 rounded-xl transition-all ${
                                            option.color === 'green'
                                                ? 'border-zinc-200 peer-checked:border-green-500 peer-checked:bg-green-50'
                                                : 'border-zinc-200 peer-checked:border-red-500 peer-checked:bg-red-50'
                                        } group-hover:border-zinc-300`}>
                                            <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                                                option.color === 'green'
                                                    ? 'border-zinc-300 peer-checked:border-green-500'
                                                    : 'border-zinc-300 peer-checked:border-red-500'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full transition-all ${
                                                    option.color === 'green'
                                                        ? 'bg-transparent peer-checked:bg-green-500'
                                                        : 'bg-transparent peer-checked:bg-red-500'
                                                }`}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-black text-zinc-900 uppercase tracking-wider">{option.label}</div>
                                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{option.desc}</div>
                                            </div>
                                            {option.color === 'green' && (
                                                <div className="relative flex h-2 w-2">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.availability && (
                                <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                    <AlertCircle size={12} strokeWidth={3} />
                                    {errors.availability.message}
                                </p>
                            )}
                        </div>
                        <div className="border-t-2 border-zinc-200 mt-8"></div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                            <Link
                                href="/added-cars"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-700 text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative group/btn active:translate-y-0.5 transition-all duration-150 flex-1 disabled:opacity-70 disabled:pointer-events-none"
                            >
                                <div className="relative px-6 py-3.5 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center justify-center gap-2.5 border border-red-800/50 overflow-hidden">
                                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                    }}></span>
                                    {loading ? (
                                        <span className="relative inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            <PlusCircle size={16} className="relative text-white drop-shadow-md" strokeWidth={3} />
                                            <span className="relative text-white text-xs font-black uppercase tracking-[0.2em] drop-shadow-md">
                                                List Car · Add to Fleet
                                            </span>
                                            <ArrowRight
                                                className="relative w-3.5 h-3.5 text-white drop-shadow-md group-hover/btn:translate-x-1 transition-transform duration-300"
                                                strokeWidth={3}
                                            />
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}