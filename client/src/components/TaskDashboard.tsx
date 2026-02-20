import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
}

const TaskDashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
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
                body: JSON.stringify({ title: newTitle, description: newDesc }),
            });
            if (res.ok) {
                setNewTitle('');
                setNewDesc('');
                fetchTasks();
            }
        } catch (err) {
            console.error('Add error:', err);
        }
    };

    const toggleTask = async (task: Task) => {
        const nextStatus = task.status === 'done' ? 'todo' : 'done';
        try {
            await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus }),
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

    return (
        <div className="pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-6">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tighter uppercase">
                            Workflow <span className="text-neon-teal">Terminal</span>
                        </h1>
                        <p className="text-slate-400">Authenticated as: <span className="text-neon-teal font-mono">{userEmail || 'ROOT_USER'}</span></p>
                    </div>
                    <div className="flex items-center gap-4">

                        <button
                            onClick={handleLogout}
                            className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                        >
                            LOG OUT
                        </button>
                    </div>
                </header>

                {/* Task Form */}
                <section className="glass p-8 rounded-[2rem] border border-white/10 mb-12">
                    <form onSubmit={addTask} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Task Title</label>
                            <input
                                type="text"
                                placeholder="Ex: Refactor auth module"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-teal/50 transition-all"
                                required
                            />
                        </div>
                        <div className="flex-[2] w-full space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Short Description</label>
                            <input
                                type="text"
                                placeholder="Details of the task..."
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-teal/50 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-neon-teal text-black px-8 py-3.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(50,249,177,0.2)]"
                        >
                            CREATE_TASK
                        </button>
                    </form>
                </section>

                {/* Task List */}
                <section className="grid gap-4">
                    {loading ? (
                        <div className="text-center py-20 text-slate-500 animate-pulse">Initializing workspace...</div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                            <p className="text-slate-500">No active tasks. Start by creating one above.</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${task.status === 'done'
                                    ? 'bg-white/2 border-white/5 opacity-60'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleTask(task)}
                                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${task.status === 'done'
                                            ? 'bg-neon-teal border-neon-teal text-black'
                                            : 'border-white/20 hover:border-neon-teal/50'
                                            }`}
                                    >
                                        {task.status === 'done' && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <div>
                                        <h3 className={`font-bold ${task.status === 'done' ? 'line-through text-slate-500' : 'text-white'}`}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="text-sm text-slate-500 truncate max-w-md">{task.description}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-2 text-slate-600 hover:text-red-400 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default TaskDashboard;
