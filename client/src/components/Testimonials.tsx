import React from 'react';

const testimonials = [
    {
        name: 'Alex Rivera',
        role: 'Staff Engineer at Voxel',
        content: 'SprintDash is the first project management tool that doesn\'t slow me down. The CLI and API-first approach are game changers.',
        avatar: 'https://i.pravatar.cc/150?u=alex'
    },
    {
        name: 'Lena M.',
        role: 'Lead Architect at Synth',
        content: 'The performance is unmatched. We moved our entire 200-person engineering org over in a weekend. Zero friction.',
        avatar: 'https://i.pravatar.cc/150?u=lena'
    },
    {
        name: 'Marco Rossi',
        role: 'CTO at Hyperion',
        content: 'Clean, fast, and powerful. It feels like a pro tool for pro builders. Highly recommended for fast-moving teams.',
        avatar: 'https://i.pravatar.cc/150?u=marco'
    }
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black font-display text-white mb-4">Trusted by the builders.</h2>
                    <p className="text-slate-500">Powering the next generation of software teams.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4 mb-8">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                                <div>
                                    <h4 className="font-bold text-white leading-tight">{t.name}</h4>
                                    <p className="text-sm text-slate-500">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">"{t.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
