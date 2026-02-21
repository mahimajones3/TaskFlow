import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-8 group cursor-pointer">
                            <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center border border-white/10 group-hover:border-neon-teal/30 transition-colors">
                                <Logo variant="bolt" size={28} className="text-neon-teal" />
                            </div>
                            <span className="text-xl font-bold font-display tracking-tight text-white transition-colors group-hover:text-neon-teal">SprintDash</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed max-w-xs">
                            The high-performance workspace for the modern developer.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Systems</h5>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">Features</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">API Docs</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">CLI Tool</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Org</h5>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">About</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">Terms</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">Privacy</Link></li>
                            <li><Link to="/docs" className="hover:text-neon-teal transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-white mb-8 uppercase text-xs tracking-widest opacity-50">Support</h5>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-500 mb-4">Subscribe to system alerts</p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                                    if (email) {
                                        alert('Subscription successful! You will receive system alerts at ' + email);
                                        e.currentTarget.reset();
                                    }
                                }}
                                className="flex gap-2"
                            >
                                <input name="email" type="email" placeholder="Email" className="bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-neon-teal/50" required />
                                <button type="submit" className="bg-white/5 p-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors">➔</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 text-xs font-mono uppercase tracking-tighter">
                        [© {new Date().getFullYear()} SPRINTDASH_SYS_INC. ALL_RIGHTS_RESERVED]
                    </p>
                    <div className="flex gap-8">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">GITHUB</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">TWITTER</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
