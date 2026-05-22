'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import {Car,Plus,Edit3,Trash2,MapPin,Users,Calendar,AlertTriangle,X,Search,SlidersHorizontal,PackageX,Loader2,CheckCircle2,AlertCircle} from 'lucide-react';

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports', 'Electric', 'Convertible', 'Truck'];

export default function MyAddedCars() {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [update , setUpdate] = useState(true)
    const [editingCar, setEditingCar] = useState(null);
    const [deletingCar, setDeletingCar] = useState(null);

    useEffect(() => {
        if (!session) return;
        const fetchMyCars = async () => {
            try {
                
                const { data: tokenData, error: tokenError } = await authClient.token();
                if (tokenError || !tokenData?.token) {
                    toast.error('Authentication failed');
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added-cars/${session.user.id}`, {
                    headers: { 'Authorization': `Bearer ${tokenData.token}` },
                });

                if (!res.ok) throw new Error('Failed to fetch cars');

                const data = await res.json();
                setCars(data);
            } catch (err) {
                console.log(err)
                toast.error('Could not load your cars');
            } finally {
                setLoading(false);
            }
        };

        fetchMyCars();
    }, [session,update]);
    const filteredCars = cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                  car.location.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = filterStatus === 'all' || car.availability === filterStatus;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'priceHigh': return b.pricePerDay - a.pricePerDay;
                case 'priceLow': return a.pricePerDay - b.pricePerDay;
                default: return 0;
            }
        });
    const handleUpdate = async (carId, updatedData) => {
        try {
            const { data: tokenData, error: tokenError } = await authClient.token();
                if (tokenError || !tokenData?.token) {
                    toast.error('Authentication failed');
                    return;
                }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added-cars/${carId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error('Update failed');
            setUpdate(!update)
            toast.success('Car updated successfully!');
            setEditingCar(null);
        } catch (err) {
            toast.error('Failed to update car');
        }
    };
    const handleDelete = async (carId) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added-cars/${carId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${tokenData.token}` },
            });

            if (!res.ok) throw new Error('Delete failed');
            setUpdate(!update)
            toast.success('Car removed from your fleet');
            setDeletingCar(null);
        } catch (err) {
            toast.error('Failed to delete car');
        }
    };
    if (sessionPending || loading) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Loading Your Fleet</p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-zinc-100 relative overflow-hidden py-12 lg:py-16">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-7 h-7 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-red-600 opacity-50"></div>
                            <div className="relative pl-3 pt-1">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                    Host Dashboard
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tight mb-2">
                            My <span className="text-red-600">Fleet</span>
                        </h1>
                        <p className="text-sm md:text-base text-zinc-600">
                            Manage your listed vehicles. Update prices, availability, and details.
                        </p>
                    </div>
                    <Link
                        href="/add-car"
                        className="relative group/btn active:translate-y-0.5 transition-all duration-150"
                    >
                        <div className="relative px-6 py-3 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center gap-2.5 border border-red-800/50 overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}></span>
                            <Plus size={16} className="relative text-white drop-shadow-md" strokeWidth={3} />
                            <span className="relative text-white text-xs font-black uppercase tracking-[0.2em] drop-shadow-md">
                                Add Car
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {[
                        { label: 'Total Cars', value: cars.length, icon: Car, color: 'red' },
                        { label: 'Available', value: cars.filter(c => c.availability === 'available').length, icon: CheckCircle2, color: 'green' },
                        { label: 'Unavailable', value: cars.filter(c => c.availability === 'unavailable').length, icon: X, color: 'zinc' },
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
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search size={16} className="text-zinc-400" />
                            </div>
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search by name or location..."
                                className="w-full pl-11 pr-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="flex gap-1 p-1 bg-zinc-100 rounded-lg">
                            {['all', 'available', 'unavailable'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${
                                        filterStatus === status
                                            ? 'bg-white text-red-600 shadow-sm'
                                            : 'text-zinc-600 hover:text-zinc-900'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
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
                {filteredCars.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-zinc-500">
                        <span className="font-bold text-zinc-900">{filteredCars.length}</span>
                        <span>of</span>
                        <span className="font-bold text-zinc-900">{cars.length}</span>
                        <span>cars</span>
                        {(searchText || filterStatus !== 'all') && (
                            <button
                                onClick={() => { setSearchText(''); setFilterStatus('all'); }}
                                className="ml-2 text-red-600 hover:text-red-700 font-bold"
                            >
                                · Clear filters
                            </button>
                        )}
                    </div>
                )}
                {filteredCars.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-zinc-300 rounded-2xl py-20 px-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
                            <PackageX size={28} className="text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-2">
                            {searchText || filterStatus !== 'all' ? 'No cars match your filters' : 'No cars listed yet'}
                        </h3>
                        <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                            {searchText || filterStatus !== 'all'
                                ? 'Try adjusting your search or filters to see more results.'
                                : 'Start earning by listing your first car. It only takes a couple of minutes.'}
                        </p>
                        {!(searchText || filterStatus !== 'all') && (
                            <Link
                                href="/add-car"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-red-600/30 transition-all"
                            >
                                <Plus size={14} strokeWidth={3} />
                                List Your First Car
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map((car, index) => (
                            <div key={car._id} className="group relative animate-[cardReveal_0.6s_cubic-bezier(0.34,1.2,0.64,1)_both] bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
                            style={{ animationDelay: `${index * 80}ms` }}>
                                <div className="relative h-48 overflow-hidden bg-linear-to-br from-zinc-100 to-zinc-200">
                                    <img
                                        src={car.imageUrl}
                                        alt={car.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                                            car.availability === 'available'
                                                ? 'bg-green-500/95 border-green-400 text-white'
                                                : 'bg-zinc-900/85 border-zinc-700 text-white'
                                        }`}>
                                            <span className={`relative flex h-1.5 w-1.5`}>
                                                {car.availability === 'available' && (
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                                )}
                                                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full bg-white`}></span>
                                            </span>
                                            {car.availability}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 shadow-sm">
                                            {car.type}
                                        </span>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                        <div>
                                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider">Daily Rate</div>
                                            <div className="text-2xl font-black text-white font-mono leading-none drop-shadow-md">
                                                ${car.pricePerDay}
                                                <span className="text-xs font-medium text-white/80 ml-1">/d</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-black text-zinc-900 leading-tight tracking-tight uppercase truncate mb-2">
                                        {car.name}
                                    </h3>

                                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-red-500" />
                                            <span className="font-medium text-zinc-700 truncate">{car.location}</span>
                                        </div>
                                        <span className="text-zinc-300">·</span>
                                        <div className="flex items-center gap-1">
                                            <Users size={12} className="text-zinc-400" />
                                            <span className="font-medium">{car.seats} seats</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-4 min-h-8">
                                        {car.description}
                                    </p>
                                    <div className="flex items-center gap-1.5 mb-4 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                                        <Calendar size={11} />
                                        <span>Listed {new Date(car.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 pt-4 border-t border-dashed border-zinc-200">
                                        <button
                                            onClick={() => setEditingCar(car)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 hover:border-amber-300 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors"
                                        >
                                            <Edit3 size={12} strokeWidth={2.5} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeletingCar(car)}
                                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all"
                                            title="Delete listing"
                                        >
                                            <Trash2 size={12} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {editingCar && (
                <EditModal
                    car={editingCar}
                    onClose={() => setEditingCar(null)}
                    onSave={handleUpdate}
                />
            )}
            {deletingCar && (
                <DeleteModal
                    car={deletingCar}
                    onCancel={() => setDeletingCar(null)}
                    onConfirm={() => handleDelete(deletingCar._id)}
                />
            )}
        </div>
    );
}
const EditModal = ({ car, onClose, onSave }) => {
    const [saving, setSaving] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: car.name,
            type: car.type,
            seats: car.seats,
            pricePerDay: car.pricePerDay,
            location: car.location,
            imageUrl: car.imageUrl,
            description: car.description,
            availability: car.availability,
        },
    });

    const onSubmit = async (data) => {
        setSaving(true);
        const payload = {
            ...data,
            pricePerDay: parseFloat(data.pricePerDay),
            seats: parseInt(data.seats, 10),
        };
        await onSave(car._id, payload);
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 max-h-[90vh] overflow-hidden flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-linear-to-r from-zinc-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/30">
                            <Edit3 size={16} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Edit Car</h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{car.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Type</label>
                            <select
                                {...register('type', { required: 'Required' })}
                                className="w-full px-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white text-sm font-medium cursor-pointer"
                            >
                                {CAR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Price / Day</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('pricePerDay', { required: 'Required', min: 1 })}
                                    className="w-full pl-8 pr-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white text-sm font-medium font-mono"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Location</label>
                            <input
                                {...register('location', { required: 'Required' })}
                                className="w-full px-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white text-sm font-medium"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Image URL</label>
                        <input
                            type="url"
                            {...register('imageUrl', { required: 'Required', pattern: /^https?:\/\/.+/ })}
                            className="w-full px-4 h-11 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white text-sm font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Description</label>
                        <textarea
                            rows={3}
                            {...register('description', {
                                        required: 'Description is required',
                                    })}
                            className="w-full px-4 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white text-sm font-medium resize-none"
                        />
                        {errors.description && (
                            <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle size={12} strokeWidth={3} />
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-1.5">Availability</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['available', 'unavailable'].map(status => (
                                <label key={status} className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        value={status}
                                        {...register('availability', { required: true })}
                                        className="peer sr-only"
                                    />
                                    <div className="flex items-center gap-2 p-3 bg-zinc-50 border-2 border-zinc-200 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 transition-all">
                                        <div className="w-4 h-4 rounded-full border-2 border-zinc-300 peer-checked:border-red-500 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-transparent peer-checked:bg-red-500 transition-all"></div>
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-wider text-zinc-700">{status}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-200 bg-zinc-50">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 text-xs font-black uppercase tracking-wider rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={saving}
                        className="relative group/btn active:translate-y-0.5 transition-all duration-150 disabled:opacity-70"
                    >
                        <div className="relative px-5 py-2.5 bg-linear-to-b from-red-500 to-red-700 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center gap-2 border border-red-800/50 overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}></span>
                            {saving ? (
                                <Loader2 size={14} className="relative text-white animate-spin" />
                            ) : (
                                <CheckCircle2 size={14} className="relative text-white drop-shadow-md" strokeWidth={3} />
                            )}
                            <span className="relative text-white text-xs font-black uppercase tracking-[0.15em] drop-shadow-md">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
const DeleteModal = ({ car, onCancel, onConfirm }) => {
    const [deleting, setDeleting] = useState(false);

    const handleConfirm = async () => {
        setDeleting(true);
        await onConfirm();
        setDeleting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.34,1.2,0.64,1)]">
                <div className="p-6 bg-linear-to-br from-red-50 to-orange-50 border-b border-red-200 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-3">
                        <AlertTriangle size={24} className="text-red-600" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-1">Delete Car?</h2>
                    <p className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">This action cannot be undone</p>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-lg mb-5">
                        <img
                            src={car.imageUrl}
                            alt={car.name}
                            className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-black text-zinc-900 truncate">{car.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{car.location} · ${car.pricePerDay}/day</div>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                        Are you sure you want to remove <span className="font-bold text-zinc-900">{car.name}</span> from your fleet? All listing data will be permanently deleted.
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onCancel}
                            disabled={deleting}
                            className="flex-1 px-4 py-3 bg-white border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 text-xs font-black uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={deleting}
                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={14} strokeWidth={3} />
                                    Delete Car
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};