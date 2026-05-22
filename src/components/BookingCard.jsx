import { Calendar, DollarSign, Eye, FileText, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";

const BookingCard = ({ booking, onCancel, index }) => {
    const driverFee = booking.driverNeeded ? 25 : 0;
    const totalPrice = (booking.pricePerDay || 0) + driverFee;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-zinc-200 hover:shadow-red-500/10 hover:shadow-xl hover:border-red-300"
        >
            <div className="group relative bg-white rounded-2xl overflow-hidden"
                style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="relative h-44 overflow-hidden bg-linear-to-br from-zinc-100 to-zinc-200">
                        <img
                            src={booking.imageUrl}
                            alt={booking.carName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-700 shadow-sm">
                                #{(booking.id || booking._id || '').toString().slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                            <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-0.5">
                                Total
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white font-mono leading-none drop-shadow-md">
                                    ${totalPrice}
                                </span>
                                <span className="text-xs font-medium text-white/80">/day</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="text-base font-black text-zinc-900 leading-tight tracking-tight uppercase truncate mb-3">
                            {booking.carName || 'Unknown Car'}
                        </h3>
                        <div className="space-y-2.5 mb-4">
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <Calendar size={12} className="text-red-500" />
                                    <span className="font-mono uppercase tracking-wider text-[10px] font-bold">Booked</span>
                                </div>
                                <span className="font-medium text-zinc-900 text-[11px]">
                                    {booking.createdAt
                                        ? new Date(booking.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <User size={12} className="text-red-500" />
                                    <span className="font-mono uppercase tracking-wider text-[10px] font-bold">Driver</span>
                                </div>
                                <span className={`font-bold text-[10px] uppercase tracking-wider font-mono ${
                                    booking.driverNeeded ? 'text-red-600' : 'text-zinc-700'
                                }`}>
                                    {booking.driverNeeded ? '+ Included' : 'Self-Drive'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <DollarSign size={12} className="text-red-500" />
                                    <span className="font-mono uppercase tracking-wider text-[10px] font-bold">Daily Rate</span>
                                </div>
                                <span className="font-mono font-bold text-zinc-900 text-[11px]">
                                    ${booking.pricePerDay || 0}/day
                                </span>
                            </div>
                        </div>
                        {booking.specialNote && (
                            <div className="mb-4 p-2.5 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <FileText size={11} className="text-zinc-400" strokeWidth={2.5} />
                                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Special Note</span>
                                </div>
                                <p className="text-[11px] text-zinc-700 italic leading-relaxed line-clamp-2">
                                    &quot;{booking.specialNote}&quot;
                                </p>
                            </div>
                        )}
                        <div className="p-3 bg-linear-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold">Total / day</span>
                                <span className="font-mono font-black text-red-600 text-sm">${totalPrice}</span>
                            </div>
                            {booking.driverNeeded && (
                                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                                    Car ${booking.pricePerDay || 0} + Driver $25
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-dashed border-zinc-200">
                            {booking.carId && (
                                <Link
                                    href={`/cars/${booking.carId}`}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors"
                                >
                                    <Eye size={12} strokeWidth={2.5} />
                                    View Car
                                </Link>
                            )}
                            <button
                                onClick={onCancel}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all"
                            >
                                <Trash2 size={12} strokeWidth={2.5} />
                                Cancel
                            </button>
                        </div>
                    </div>
            </div>
        </motion.div>
     
    );
};

export default BookingCard;