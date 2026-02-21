import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline?: string;
    created_at: string;
}

const TaskDashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newDeadline, setNewDeadline] = useState('');
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string>('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserEmail(JSON.parse(storedUser).email);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle) return;
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDesc,
                    deadline: newDeadline,
                    status: 'todo'
                }),
            });
            if (res.ok) {
                setNewTitle('');
                setNewDesc('');
                setNewDeadline('');
                fetchTasks();
            }
        } catch (err) {
            console.error('Add error:', err);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            fetchTasks();
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            fetchTasks();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const stats = {
        active: tasks.filter(t => t.status !== 'done').length,
        completed: tasks.filter(t => t.status === 'done').length,
        efficiency: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'done': return 'bg-purple-500';
            case 'wip': return 'bg-neon-teal';
            default: return 'bg-white/10';
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 overflow-hidden text-white">
            <div className="container mx-auto px-6">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tighter uppercase">
                            Workflow <span className="text-neon-teal">Terminal</span>
                        </h1>
                        <p className="text-slate-400">Authenticated as: <span className="text-neon-teal font-mono">{userEmail || 'ROOT_USER'}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                    >
                        LOG OUT
                    </button>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="col-span-12 lg:col-span-3 space-y-8">
                        {/* Stats Section */}
                        <div className="space-y-4">
                            {[
                                { label: 'Active Tasks', value: stats.active, color: 'text-neon-teal' },
                                { label: 'Completed', value: stats.completed, color: 'text-purple-400' },
                                { label: 'Efficiency', value: `${stats.efficiency}%`, color: 'text-cyan-400' }
                            ].map((stat, i) => (
                                <div key={i} className="glass p-6 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Creation Form */}
                        <div className="glass p-6 rounded-2xl border border-white/5">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Create Requirement</h2>
                            <form onSubmit={addTask} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Auth Module..."
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-teal/50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Deadline</label>
                                    <input
                                        type="text"
                                        placeholder="24h, 48h..."
                                        value={newDeadline}
                                        onChange={(e) => setNewDeadline(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-teal/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Description</label>
                                    <textarea
                                        placeholder="Technical brief..."
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-teal/50 min-h-[80px] resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-neon-teal text-black py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(50,249,177,0.1)]"
                                >
                                    ADD TASK
                                </button>
                            </form>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="col-span-12 lg:col-span-9">
                        <div className="glass rounded-[2rem] border border-white/10 p-8 min-h-[600px] relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-neon-teal animate-pulse"></div>
                                    <span className="text-xs font-mono text-slate-400 tracking-tighter uppercase">SESSION_ACTIVE: PRIMARY_NODE</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-20 text-slate-500 font-mono text-xs animate-pulse">BOOTING_SYSTEM...</div>
                                ) : tasks.length === 0 ? (
                                    <div className="text-center py-20 bg-white/2 rounded-2xl border border-dashed border-white/5">
                                        <p className="text-slate-500 text-sm">NO_ACTIVE_TASKS: INITIATE_ABOVE</p>
                                    </div>
                                ) : (
                                    tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`flex flex-col rounded-xl border transition-all cursor-pointer ${expandedTaskId === task.id ? 'bg-white/5 border-white/20' : 'bg-white/2 border-white/5 hover:border-white/10'
                                                }`}
                                            onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                                        >
                                            <div className="flex items-center justify-between p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-1 h-10 rounded-full ${getStatusColor(task.status)} transition-colors`}></div>
                                                    <div>
                                                        <h3 className={`text-sm font-bold tracking-tight ${task.status === 'done' ? 'text-slate-500' : 'text-white'}`}>
                                                            {task.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {task.deadline && (
                                                                <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    {task.deadline}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex bg-black/40 rounded-lg p-0.5 gap-1 border border-white/5 overflow-hidden" onClick={e => e.stopPropagation()}>
                                                        {['TODO', 'WIP', 'DONE'].map(st => (
                                                            <button
                                                                key={st}
                                                                onClick={() => updateStatus(task.id, st.toLowerCase())}
                                                                className={`text-[9px] font-bold px-2 py-1 rounded transition-all ${task.status === st.toLowerCase()
                                                                    ? 'bg-white/10 text-neon-teal'
                                                                    : 'text-slate-600 hover:text-slate-400'
                                                                    }`}
                                                            >
                                                                {st}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteTask(task.id);
                                                        }}
                                                        className="p-2 text-slate-700 hover:text-red-400 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {expandedTaskId === task.id && task.description && (
                                                <div className="px-9 pb-6 pt-2 text-xs text-slate-400 animate-in fade-in slide-in-from-top-1">
                                                    <div className="w-full h-px bg-white/5 mb-4"></div>
                                                    <p className="leading-relaxed opacity-80 whitespace-pre-wrap">{task.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Decorator Glow */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-teal/5 blur-[100px] rounded-full pointer-events-none"></div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TaskDashboard;
