import DashboardPreview from './DashboardPreview';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden">
            {/* Radial Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-teal/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-white mb-8 leading-[0.9]">
                        Build fast. <br />
                        Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-cyan-400 glow-text">smarter</span>.
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                        The ultimate project workspace designed for high-performance teams.
                        Automate your workflow, track impact, and ship with 10x confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/login" className="neon-btn w-full sm:w-auto text-lg flex items-center justify-center">
                            Start Building Now
                        </Link>
                        <Link to="/docs" className="w-full sm:w-auto bg-white/5 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                            View Documentation
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-teal/20 to-purple-600/20 rounded-[2.5rem] blur-2xl"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm p-2 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 flex items-center gap-1.5 px-4 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                        </div>
                        <DashboardPreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
