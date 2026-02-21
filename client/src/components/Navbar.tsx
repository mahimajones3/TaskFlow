import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center border-b border-white/5">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-neon-teal rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(50,249,177,0.4)] group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold font-display tracking-tight text-white">TaskFlow</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="/#features" className="text-slate-400 hover:text-neon-teal transition-colors">Features</a>
                    <a href="/#how-it-works" className="text-slate-400 hover:text-neon-teal transition-colors">How it works</a>
                    <Link to="/docs" className="text-slate-400 hover:text-neon-teal transition-colors">Documentation</Link>
                    <Link to="/login" className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full border border-white/10 transition-all active:scale-95">
                        Log in
                    </Link>
                    <Link to="/login" className="bg-neon-teal text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(50,249,177,0.3)] hover:shadow-[0_0_30px_rgba(50,249,177,0.5)] hover:scale-105 transition-all active:scale-95">
                        Get Started
                    </Link>
                </div>

                <button className="md:hidden p-2 text-slate-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
