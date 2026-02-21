import Logo, { type LogoVariant } from './Logo';

const LogoShowcase: React.FC = () => {
    const variants: { id: LogoVariant, name: string, desc: string }[] = [
        { id: 'bolt', name: 'The Sprint Bolt', desc: 'Velocity and high-speed delivery. The definitive mark of SprintDash.' }
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <header className="mb-20 text-center text-balance">
                <h1 className="text-5xl md:text-7xl font-black font-display text-white mb-6 tracking-tight">Identity of <span className="text-neon-teal">SprintDash</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    The professional identity of SprintDash. Built for teams that ship value at lightning speed.
                </p>
            </header>

            <div className="max-w-xl mx-auto">
                {variants.map((v) => (
                    <div key={v.id} className="bg-white/5 border border-white/10 rounded-[3rem] p-16 flex flex-col items-center hover:bg-white/[0.07] transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-neon-teal/5 blur-[50px] -z-10 group-hover:bg-neon-teal/10 transition-colors"></div>
                        <div className="w-56 h-56 bg-black rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl border border-white/5 group-hover:border-neon-teal/30 transition-all group-hover:scale-105">
                            <Logo variant={v.id} size={120} className="text-neon-teal" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">{v.name}</h3>
                        <p className="text-slate-400 text-center leading-relaxed text-lg mb-10">
                            {v.desc}
                        </p>

                        <div className="flex gap-4 w-full">
                            <a href="/sprint-bolt.svg" download className="flex-1 bg-white text-black text-center py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">
                                DOWNLOAD SVG
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-40">
                <div className="glass rounded-[3rem] p-16 text-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-neon-teal/5 blur-[100px] -z-10"></div>
                    <h2 className="text-4xl font-black text-white mb-10">Digital Brand Context</h2>

                    <div className="flex flex-wrap justify-center gap-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="px-6 py-2 bg-white text-black font-bold rounded-lg flex items-center gap-3">
                                <Logo variant="bolt" size={24} color="black" />
                                SPRINTDASH
                            </div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Light Mode Identity</p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="px-6 py-2 bg-black text-white font-bold rounded-lg flex items-center gap-3 border border-white/10">
                                <Logo variant="bolt" size={24} color="#32F9B1" />
                                SPRINTDASH
                            </div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Dark Mode Identity</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LogoShowcase;
