import React, { useState } from 'react';

const WaitlistForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Waitlist error:', error);
            setStatus('error');
        }
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-neon-teal/5 blur-[150px] rounded-full"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-black font-display text-white mb-8 tracking-tighter">
                    Join the <br /> <span className="text-neon-teal glow-text">future</span> of work.
                </h2>
                <p className="text-slate-400 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
                    We're onboarding teams in phases to ensure the best experience.
                    Claim your spot on the waitlist today.
                </p>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-full border border-white/10 focus-within:border-neon-teal/30 focus-within:shadow-[0_0_20px_rgba(50,249,177,0.1)] transition-all">
                        <input
                            type="email"
                            placeholder="Enter your work email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent px-6 py-4 rounded-full text-white placeholder:text-slate-600 focus:outline-none disabled:opacity-50"
                            disabled={status === 'loading' || status === 'success'}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-neon-teal text-black px-10 py-4 rounded-full font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(50,249,177,0.3)] disabled:opacity-50"
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? 'Securing...' : 'Claim Access'}
                        </button>
                    </div>

                    {status === 'success' && (
                        <div className="mt-6 text-neon-teal font-bold animate-pulse">
                            ✓ SECURED. You're on the list.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mt-6 text-red-500 font-bold">
                            Transmission error. Please retry.
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default WaitlistForm;
