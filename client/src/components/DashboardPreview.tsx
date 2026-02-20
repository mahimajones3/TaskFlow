import React from 'react';

const DashboardPreview: React.FC = () => {
    return (
        <div className="w-full pt-10 px-4 pb-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Sidebar Mock */}
                <div className="col-span-3 space-y-4">
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
                        <div className="w-12 h-2 bg-neon-teal/20 rounded"></div>
                        <div className="space-y-2">
                            <div className="w-full h-1 bg-white/10 rounded"></div>
                            <div className="w-[80%] h-1 bg-white/10 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/2">
                                <div className="w-4 h-4 rounded bg-white/5"></div>
                                <div className="w-16 h-1.5 bg-white/10 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Mock */}
                <div className="col-span-9 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Active Tasks', value: '128', color: 'text-neon-teal' },
                            { label: 'Completed', value: '842', color: 'text-purple-400' },
                            { label: 'Efficiency', value: '98%', color: 'text-cyan-400' }
                        ].map((stat, i) => (
                            <div key={i} className="glass p-4 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="glass h-64 rounded-2xl border border-white/5 p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neon-teal animate-pulse"></div>
                                <span className="text-xs font-mono text-slate-400">SESSION_ACTIVE: PRIMARY_NODE</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-white/5"></div>
                                <div className="w-3 h-3 rounded-full bg-white/5"></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Deploy Auth Module', desc: 'Finalizing JWT integration and secure storage', progress: 'WIP', color: 'bg-neon-teal' },
                                { title: 'Database Optimization', desc: 'Indexing postgres tables for high-load clusters', progress: 'DONE', color: 'bg-purple-500' },
                                { title: 'Frontend Refactor', desc: 'Implementing Tailwind v4 design system tokens', progress: 'TODO', color: 'bg-white/10' }
                            ].map((task, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1 h-8 rounded-full ${task.color}`}></div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{task.title}</p>
                                            <p className="text-[10px] text-slate-500">{task.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/10">{task.progress}</span>
                                </div>
                            ))}
                        </div>

                        {/* Decorator Glow */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-teal/10 blur-[60px] rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPreview;
