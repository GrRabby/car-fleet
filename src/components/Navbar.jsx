'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { authClient } from '../lib/auth-client';
import { Calendar, Car, ChevronRight, LogIn, LogOut, Truck, User } from 'lucide-react';
const NavBar = () => {
    const { data: session, isPending } = authClient.useSession();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home', code: '01' },
        { href: '/explore-cars', label: 'Explore Cars', code: '02' },
        { href: '/add-car', label: 'Add Car', code: '03' },
        { href: '/my-bookings', label: 'My Bookings', code: '04' },
    ];
    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/login";
    };
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-50 transition-all duration-500 ${scrolled? 'bg-zinc-950/85 backdrop-blur-2xl border-b border-red-500/20': 'bg-linear-to-b from-zinc-950 to-zinc-950/80'}`}>

            <div className="absolute inset-x-0 top-0 h-0.75 flex">
                <div className="flex-1 bg-linear-to-r from-transparent via-red-500 to-red-600"></div>
                <div className="w-12 bg-zinc-950"></div>
                <div className="flex-1 bg-linear-to-l from-transparent via-red-500 to-red-600"></div>
            </div>
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    <Link href="/" className="flex items-center gap-4 shrink-0 group">
                        <div className="relative">
                            <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-pulse"></div>
                            <div className="absolute -inset-1 border border-red-500/50 rounded-full animate-pulse"></div>
                            <div className="relative w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Logo"
                                    width={36}
                                    height={36}
                                    src={logo.src}
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-black tracking-tight text-white uppercase">
                                CAR<span className="text-red-500">FLEET</span>
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono">EST · 2025</span>
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex">
                        <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded-md p-1 backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 rounded active:translate-y-px ${
                                            isActive
                                                ? 'text-white bg-linear-to-b from-red-400 via-red-500 to-red-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] border border-red-800/50'
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        }`}
                                    >
                                        <span className={`text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-zinc-600'}`}>
                                            {link.code}
                                        </span>
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:block h-8 w-px bg-zinc-700 mx-1"></div>
                        {isPending ? (
                            <span className="loading bg-white loading-spinner loading-md"></span>
                        ) : session ? (
                            <>
                                <Link
                                    href="/add-car"
                                    className="hidden md:inline-flex items-center gap-2.5 px-5 py-2.5 bg-linear-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white text-xs font-black uppercase tracking-wider rounded-md shadow-lg shadow-red-600/40 hover:shadow-red-500/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 border border-red-400/50 relative overflow-hidden group"
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></span>
                                        <Car className="w-4 h-4" />
                                    <span className="relative">Become a Host</span>
                                </Link>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="group relative flex items-center gap-2 p-1 rounded-full hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all duration-300">
                                        <div className="relative">
                                            <div className="absolute -inset-0.5 bg-linear-to-br from-red-500 to-orange-500 rounded-full opacity-50 group-hover:opacity-100 blur-sm transition-opacity"></div>
                                            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-zinc-800 group-hover:ring-red-500/50 transition-all">
                                                <img
                                                    alt="Profile"
                                                    src={session.user.image}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div tabIndex={0}className="dropdown-content menu mt-4 w-60 p-0 bg-zinc-950 rounded-md shadow-2xl shadow-red-500/10 border border-zinc-800 z-50 overflow-hidden">
                                        <div className="flex items-center gap-4 p-4 bg-zinc-900/80">
                                            <div className="w-14 h-14 rounded-md overflow-hidden ring-1 ring-zinc-700">
                                                <img
                                                    alt="Profile"
                                                    src={session.user.image}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <span className="text-[10px] font-mono text-zinc-500 uppercase">Name</span>
                                                <span className="text-sm font-bold text-white uppercase tracking-wide">{session.user.name}</span>
                                                <span className="text-[10px] font-mono text-zinc-500 mt-1">{session.user.email}</span>
                                            </div>
                                        </div>

                                        <ul className="p-2">
                                            <li><Link href="/add-car" className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-900 hover:text-red-500 rounded flex items-center gap-3 py-2.5">
                                                <User className="w-4 h-4" />
                                                Add Car
                                            </Link></li>
                                            <li><Link href="/my-bookings" className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-900 hover:text-red-500 rounded flex items-center gap-3 py-2.5">
                                                <Truck className="w-4 h-4" />
                                                My Bookings
                                            </Link></li>
                                            <li><Link href="/added-cars" className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-900 hover:text-red-500 rounded flex items-center gap-3 py-2.5">
                                                <Calendar className="w-4 h-4" />
                                                My Added Cars
                                            </Link></li>
                                        </ul>

                                        <div className="border-t border-zinc-800 p-2 bg-zinc-900/50">
                                            <li><button onClick={handleLogout} className="text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 rounded flex items-center gap-3 py-2.5">
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </button></li>
                                        </div>
                                    </div>
                                </div>
                            </>
                        
                        ) : (
                            <Link
                                href="/login"
                                className="relative px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 rounded active:translate-y-px text-white bg-linear-to-b from-red-400 via-red-500 to-red-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] border border-red-800/50">
                                <LogIn size={18} />
                                Login
                            </Link>
                        )}

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2.5 text-zinc-300 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-md transition-all"
                        >
                            <div className="relative w-5 h-5">
                                <span className={`absolute left-0 top-1 w-5 h-0.5 bg-red-500 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`absolute left-0 top-4 w-5 h-0.5 bg-red-500 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-125 pb-4' : 'max-h-0'}`}>
                    <nav className="flex flex-col gap-1 pt-3 border-t border-zinc-800">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`px-4 py-3.5 text-sm font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-between group border ${
                                        isActive
                                            ? 'bg-linear-to-r from-red-500/20 to-transparent text-red-500 border-red-500/30'
                                            : 'text-zinc-300 hover:bg-zinc-900 border-zinc-800/50 hover:border-zinc-700'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-zinc-600">{link.code}</span>
                                        {link.label}
                                    </span>
                                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                            );
                        })}
                        <Link
                            href="/add-car"
                            onClick={() => setMobileOpen(false)}
                            className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-linear-to-b from-red-500 to-red-700 text-white text-xs font-black uppercase tracking-wider rounded-md shadow-lg shadow-red-600/40 border border-red-400/50"
                        >
                            ▸ Become a Host
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavBar;