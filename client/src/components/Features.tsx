import React from 'react';

const features = [
    {
        title: 'Autopilot Scheduling',
        description: 'Neon-fast task prioritization that learns from your team\'s velocity and deadlines.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'Async Collaboration',
        description: 'Built for precision. Threaded discussions, code snippets, and real-time state sync.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        title: 'Global Insights',
        description: 'Deconstruct complex projects into actionable data. Track progress at light speed.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-20">
                    <h2 className="text-neon-teal font-bold tracking-widest uppercase text-sm mb-4">Core Engine</h2>
                    <h3 className="text-4xl md:text-5xl font-black font-display text-white mb-6 leading-tight">
                        Designed for teams <br /> that ship every day.
                    </h3>
                    <p className="text-slate-400 text-lg">
                        TaskFlow isn't just a tool; it's a productivity multiplier.
                        We've removed the noise so you can focus on code.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="glass p-10 rounded-[2rem] hover:border-neon-teal/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center text-neon-teal mb-8 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
