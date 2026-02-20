import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Login error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-6">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-neon-teal/5 blur-[150px] rounded-full"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-8">
                        <div className="w-10 h-10 bg-neon-teal rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(50,249,177,0.4)]">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold font-display tracking-tight text-white">TaskFlow</span>
                    </Link>
                    <h1 className="text-3xl font-black font-display text-white mb-2 tracking-tight uppercase">Access Terminal</h1>
                    <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">Unauthorized access is logged.</p>
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Identifier</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/20 transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Secure Key</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/20 transition-all font-medium"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full neon-btn text-lg h-14 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {status === 'loading' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Validating...
                                </>
                            ) : 'Authorize Access'}
                        </button>

                        {status === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center animate-pulse">
                                Access Denied: Invalid credentials.
                            </div>
                        )}
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-600 text-xs font-mono uppercase tracking-tighter">
                            Demo Access: admin@taskflow.com / password123
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">
                        ← Return to public site
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
