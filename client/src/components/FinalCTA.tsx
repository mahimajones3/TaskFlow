import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA: React.FC = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-neon-teal/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <div className="w-2 h-2 rounded-full bg-neon-teal animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">System Online</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black font-display text-white mb-6 tracking-tighter leading-none">
                    Ready to accelerate<br />
                    <span className="text-neon-teal glow-text">your workflow?</span>
                </h2>

                <p className="text-slate-400 mb-14 text-xl max-w-2xl mx-auto leading-relaxed">
                    TaskFlow gives your team the clarity and speed it needs to ship faster. Sign in and start building today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/login"
                        className="neon-btn text-lg px-12 py-5 flex items-center gap-3 group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Authorized Access
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        to="/docs"
                        className="px-12 py-5 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-3 group"
                    >
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Docs
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="mt-20 grid grid-cols-3 gap-0 max-w-lg mx-auto border border-white/5 rounded-2xl overflow-hidden divide-x divide-white/5">
                    {[
                        { value: '10x', label: 'Faster Shipping' },
                        { value: '99%', label: 'Uptime' },
                        { value: '0ms', label: 'Latency Goal' },
                    ].map((stat) => (
                        <div key={stat.label} className="py-6 text-center bg-white/2">
                            <p className="text-2xl font-black text-neon-teal">{stat.value}</p>
                            <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
