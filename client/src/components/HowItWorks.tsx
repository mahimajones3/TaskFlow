import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Initialize Workspace',
        description: 'Spin up a production-ready workspace in less than 200ms. Invite your engineers and start building.'
    },
    {
        number: '02',
        title: 'Map the Workflow',
        description: 'Define your stages, set up automated triggers, and link your repos. SprintDash handles the rest.'
    },
    {
        number: '03',
        title: 'Deploy & Optimize',
        description: 'Track real-time velocity. identify bottlenecks before they happen, and scale your output.'
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-24 bg-black relative">
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black font-display text-white mb-6">Built for scale.</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Forget the manual overhead. SprintDash provides a developer-first interface
                            to manage your most ambitious projects without the friction.
                        </p>
                    </div>

                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="text-7xl font-display font-black text-white/5 absolute -top-10 -left-4 group-hover:text-neon-teal/10 transition-colors">
                                {step.number}
                            </div>
                            <div className="relative pt-6 border-l border-white/10 pl-8 group-hover:border-neon-teal/30 transition-colors">
                                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-teal transition-colors">{step.title}</h4>
                                <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
