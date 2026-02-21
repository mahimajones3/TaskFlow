import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (mode === 'signup') {
                    setStatus('success');
                    // Optional: Switch to login mode or auto-login
                    setTimeout(() => setMode('login'), 2000);
                } else {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/dashboard');
                }
            } else {
                setStatus('error');
                // Could store error message in state if we wanted to show specific backend errors
                console.error('Auth error:', data.error);
            }
        } catch (error) {
            console.error('Auth error:', error);
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
                    <h1 className="text-3xl font-black font-display text-white mb-2 tracking-tight uppercase">
                        {mode === 'login' ? 'Access Terminal' : 'System Enrollment'}
                    </h1>
                    <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                        {mode === 'login' ? 'Unauthorized access is logged.' : 'Initialize your operator credentials.'}
                    </p>
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-neon-teal text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-neon-teal text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>
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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/20 transition-all font-medium pr-14"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-neon-teal transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
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
                                    {mode === 'login' ? 'Validating...' : 'Registering...'}
                                </>
                            ) : (mode === 'login' ? 'Authorize Access' : 'Create Account')}
                        </button>

                        {status === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center animate-pulse">
                                Access Denied: Invalid credentials.
                            </div>
                        )}

                        {status === 'success' && mode === 'signup' && (
                            <div className="p-4 bg-neon-teal/10 border border-neon-teal/20 rounded-xl text-neon-teal text-sm font-bold text-center">
                                Account created! You can now sign in.
                            </div>
                        )}
                    </form>

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
