"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { toast } from 'sonner';
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { User, Mail, Lock, Image as ImageIcon, UserPlus, ArrowRight, Eye, EyeOff, Car } from "lucide-react";
import logo from '../../assets/logo.png';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleRegister = async (data) => {
        setLoading(true);
        setServerError("")
        try {
            const { error } = await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                image: data.photoUrl,
            });

            if (error) {
                toast.error(error.message || "Registration failed");
                setServerError(error.message || "Registration failed");
            } else {
                toast.success("Registration success!");
                window.location.assign("/");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async () => {
        setSocialLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Social login failed");
        } finally {
            setSocialLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
                <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative order-2 lg:order-1">
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="relative">
                            <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-pulse"></div>
                            <div className="absolute -inset-1 border border-red-500/50 rounded-full animate-pulse"></div>
                            <div className="relative w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Logo"
                                    width={80}
                                    height={80}
                                    src={logo.src}
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <span className="text-lg font-black tracking-tight uppercase">
                            Car<span className="text-red-600">Fleet</span>
                        </span>
                    </div>
                    <div className="mb-7">
                        <div className="relative inline-block mb-4">
                            <div className="absolute -top-2 -left-2 w-7 h-7 border-l-4 border-t-4 border-red-600"></div>
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-red-600 opacity-50"></div>
                            <div className="relative pl-3 pt-1">
                                <span className="text-xs uppercase tracking-[0.5em] text-zinc-700 font-medium">
                                    Sign Up
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase leading-[0.95] tracking-tight mb-2">
                            Create <span className="text-red-600">Account</span>
                        </h1>
                        <p className="text-sm text-zinc-500">Join thousands of drivers and hosts on CarFleet</p>
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                        <User size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 h-12 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                    />
                                </div>
                                {errors.name && <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider">▸ {errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">Photo URL</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                        <ImageIcon size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register("photoUrl", { required: "Photo URL is required" })}
                                        placeholder="https://image.link"
                                        className="w-full pl-11 pr-4 h-12 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                    />
                                </div>
                                {errors.photoUrl && <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider">▸ {errors.photoUrl.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                    <Mail size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-11 pr-4 h-12 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider">▸ {errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-700 mb-2">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                    <Lock size={16} className="text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 h-12 py-2.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm font-medium placeholder:text-zinc-400"
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        validate: {
                                            hasUppercase: (value) => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                                            hasLowercase: (value) => /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                                        }
                                     })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-600 text-xs font-bold mt-1.5 font-mono uppercase tracking-wider">▸ {errors.password.message}</p>}
                        </div>
                        {serverError && (
                            <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg">
                                <p className="text-red-700 text-xs font-bold font-mono uppercase tracking-wider text-center">
                                    ▸ {serverError}
                                </p>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative group/btn active:translate-y-0.5 transition-all duration-150 mt-2"
                        >
                            <div className="relative px-6 py-3.5 bg-linear-to-b from-red-500 to-red-700 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] shadow-red-600/30 flex items-center justify-center gap-2.5 border border-red-800/50 overflow-hidden">
                                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                }}></span>

                                {loading ? (
                                    <span className="relative inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <UserPlus size={16} className="relative text-white drop-shadow-md" strokeWidth={3} />
                                        <span className="relative text-white text-xs font-black uppercase tracking-[0.2em] drop-shadow-md">
                                            Create Driver Account
                                        </span>
                                        <svg className="relative w-3.5 h-3.5 text-white drop-shadow-md group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-zinc-200"></div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold">Or Sign Up With</span>
                        <div className="flex-1 h-px bg-zinc-200"></div>
                    </div>
                    <button 
                        onClick={handleSocialLogin}
                        className={`btn btn-outline h-14 rounded-xl gap-3 hover:bg-red-700/10 hover:text-base-content border-base-300 font-bold border-2 ${socialLoading ? "pointer-events-none" : ""}`}
                    >
                        
                        {socialLoading ? <span className="loading loading-spinner text-primary-content"></span> : (
                            <>
                                <FcGoogle size={20} />
                                Sign up with Google
                            </>
                        )}
                    </button>
                    <div className="mt-7 pt-6 border-t border-dashed border-zinc-200 text-center">
                        <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                            Already On The Road?
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-red-600 hover:text-red-700 group transition-colors"
                        >
                            Sign In to Dashboard
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-950 text-white relative overflow-hidden order-1 lg:order-2">
                    <div className="absolute inset-x-0 top-0 h-0.75 flex">
                        <div className="flex-1 bg-linear-to-r from-transparent via-red-500 to-red-600"></div>
                        <div className="w-12 bg-zinc-950"></div>
                        <div className="flex-1 bg-linear-to-l from-transparent via-red-500 to-red-600"></div>
                    </div>
                    <div className="absolute top-0 left-1/4 w-64 h-32 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute top-0 right-1/4 w-64 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                        backgroundImage: `linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}></div>
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 pointer-events-none opacity-20">
                        <div className="absolute inset-0 border border-red-500/40 rounded-full"></div>
                        <div className="absolute inset-8 border border-red-500/30 rounded-full"></div>
                        <div className="absolute inset-16 border border-red-500/20 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
                    </div>
                    <div className="relative z-10">
                        <Link href="/" className="flex items-center gap-3 mb-14 group">
                            <div className="relative">
                                <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-pulse"></div>
                                <div className="absolute -inset-1 border border-red-500/50 rounded-full animate-pulse"></div>
                                <div className="relative w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        alt="Logo"
                                        width={80}
                                        height={80}
                                        src={logo.src}
                                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight text-white uppercase">
                                    Car<span className="text-red-500">Fleet</span>
                                </span>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-mono">EST · 2025</span>
                                </div>
                            </div>
                        </Link>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-red-500/30 rounded-md mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <div className="flex gap-0.5">
                                <div className="w-1 h-3 bg-green-500 rounded-sm shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                                <div className="w-1 h-3 bg-green-500 rounded-sm shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                                <div className="w-1 h-3 bg-red-500 rounded-sm animate-pulse shadow-[0_0_4px_rgba(239,68,68,0.6)]"></div>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-mono font-bold">New Driver · Ready</span>
                        </div>
                        <h2 className="text-5xl font-black uppercase tracking-tight leading-[0.95] mb-2">
                            <span className="text-red-500">Start Your</span>
                        </h2>
                        <h2 className="text-5xl font-black uppercase tracking-tight leading-[0.95] mb-6">
                            Journey
                        </h2>
                        <p className="text-base text-zinc-400 leading-relaxed max-w-sm">
                            Book trips, list your car, or both. The all-in-one rental platform built for people who love driving.
                        </p>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-3 px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.6)]"></div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">Free Account · No Setup Fees</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">Insurance · Included With Every Trip</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]"></div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">24/7 Support · Always On</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}