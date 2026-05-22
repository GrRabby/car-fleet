'use client';

import Link from 'next/link';
import logo from '../assets/logo.png';
import { Mail, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Footer = () => {
    const footerLinks = {
        explore: [
            { href: '/', label: 'Home' },
            { href: '/explore-cars', label: 'Explore Cars' },
            { href: '/add-car', label: 'Add Car' },
            { href: '/my-bookings', label: 'My Bookings' },
        ],
        hosting: ['List Your Car', 'Host Resources', 'Host Protection', 'Earnings Calculator'],
        company: ['About Us', 'Careers', 'Press', 'Contact'],
        support: ['Help Center', 'FAQ', 'Terms', 'Privacy'],
    };
    return (
        <footer className="relative bg-zinc-950 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.75 flex">
                <div className="flex-1 bg-linear-to-r from-transparent via-red-500 to-red-600"></div>
                <div className="w-12 bg-zinc-950"></div>
                <div className="flex-1 bg-linear-to-l from-transparent via-red-500 to-red-600"></div>
            </div>
            <div className="absolute -top-20 left-1/4 w-96 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-20 right-1/4 w-96 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-pulse"></div>
                                <div className="absolute -inset-1 border border-red-500/50 rounded-full animate-pulse"></div>
                                <div className="relative w-25 h-25 bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        alt="Logo"
                                        width={120}
                                        height={120}
                                        src={logo.src}
                                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-black tracking-tight text-white uppercase">
                                    CAR<span className="text-red-500">FLEET</span>
                                </span>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono">EST · 2025</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mb-6">
                            The car rental platform built for drivers and hosts. Browse thousands of cars, book in seconds, hit the road in style.
                        </p>
                        <div className="grid grid-cols-3 gap-2 max-w-xs">
                            <div className="bg-zinc-900/60 border border-zinc-800 rounded p-2 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                                <div className="text-sm font-black text-red-500 font-mono">12K+</div>
                                <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">Cars</div>
                            </div>
                            <div className="bg-zinc-900/60 border border-zinc-800 rounded p-2 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                                <div className="text-sm font-black text-red-500 font-mono">98%</div>
                                <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">Trips Rated</div>
                            </div>
                            <div className="bg-zinc-900/60 border border-zinc-800 rounded p-2 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                                <div className="text-sm font-black text-red-500 font-mono">50+</div>
                                <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">Cities</div>
                            </div>
                        </div>
                    </div>
                    {[
                        { title: 'Explore', code: '01', links: footerLinks.explore },
                        { title: 'hosting', code: '02', links: footerLinks.hosting },
                        { title: 'Company', code: '03', links: footerLinks.company },
                        { title: 'Support', code: '04', links: footerLinks.support },
                    ].map((column) => (
                        <div key={column.title}>
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
                                <span className="text-[9px] font-mono text-zinc-600">{column.code}</span>
                                <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">
                                    {column.title}
                                </h4>
                            </div>
                            <ul className="space-y-2.5">
                                {column.links.map((link) => (
                                    typeof link === 'object' ? (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="group text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-2"
                                            >
                                                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300"></span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ) : (
                                        <li key={link}>
                                            <span
                                                className="group text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-2"
                                            >
                                                <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300"></span>
                                                {link}
                                            </span>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="py-6 border-t border-zinc-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <div className="flex gap-0.5">
                                    <div className="w-1 h-3 bg-green-500 rounded-sm shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                                    <div className="w-1 h-3 bg-green-500 rounded-sm shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                                </div>
                                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">24/7 Live</span>
                            </div>
                            <div className="hidden md:block h-6 w-px bg-zinc-800"></div>
                            <span className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-500 font-mono transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                                +1 (800) 555-1234
                            </span>
                            <div className="hidden md:block h-6 w-px bg-zinc-800"></div>
                            <span className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-500 font-mono transition-colors">
                                <Mail className="w-3.5 h-3.5" />
                                hello@carfleet.com
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {[
                                { name: "Facebook", icon: FaFacebook },
                                { name: "Twitter", icon: FaX },
                                { name: "Instagram", icon: FaInstagram },
                                { name: "YouTube", icon: FaYoutube },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    aria-label={social.name}
                                    className="group relative w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-all duration-150 active:translate-y-0.5"
                                >
                                    <div className="absolute inset-0 bg-linear-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-md shadow-[0_3px_0_0_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] group-active:shadow-[0_1px_0_0_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"></div>
                                    <div className="absolute inset-0.5 bg-linear-to-b from-zinc-800 to-zinc-900 rounded shadow-inner border border-zinc-700/50 group-hover:from-zinc-700 group-hover:to-zinc-800"></div>
                                    <span key={social.name} className='z-10'>
                                        <social.icon className="w-4 h-4 text-red-500 hover:text-red-600 transition-colors" />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-5 border-t-2 border-red-500/20 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                                © 2026 CarFleet. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-red-500 transition-colors">Terms</span>
                            <span className="text-zinc-700">·</span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-red-500 transition-colors">Privacy</span>
                            <span className="text-zinc-700">·</span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-red-500 transition-colors">Cookies</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;