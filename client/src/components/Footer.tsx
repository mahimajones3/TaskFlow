import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                            <div className="w-8 h-8 bg-neon-teal rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold font-display tracking-tight text-white transition-colors group-hover:text-neon-teal">TaskFlow</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed max-w-xs">
                            The high-performance workspace for the modern developer.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Systems</h5>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-neon-teal transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">API Docs</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">CLI Tool</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">Security</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Org</h5>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-neon-teal transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-neon-teal transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Support</h5>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-500 mb-4">Subscribe to system alerts</p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Email" className="bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-neon-teal/50" />
                                <button className="bg-white/5 p-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors">➔</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 text-xs font-mono uppercase tracking-tighter">
                        [© {new Date().getFullYear()} TASKFLOW_SYS_INC. ALL_RIGHTS_RESERVED]
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">GITHUB</a>
                        <a href="#" className="text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">TWITTER</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
