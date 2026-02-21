import React from 'react';
import { Link } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
    const sections = [
        {
            title: "Getting Started",
            items: [
                { id: 'introduction', label: "Introduction", content: "SprintDash is a high-performance workspace designed for modern engineering teams. It streamlines project management with a developer-first approach, featuring real-time state sync and automated task prioritization." },
                { id: 'quickstart', label: "Quickstart", content: "To begin, initialize your workspace using the 'Start Building Now' button on the landing page. Follow the system enrollment process to create your operator credentials." }
            ]
        },
        {
            title: "Core Mechanics",
            items: [
                { id: 'autopilot', label: "Autopilot Scheduling", content: "Our core engine learns from your team's velocity. It automatically reprioritizes tasks based on deadlines, complexity, and resource availability." },
                { id: 'async', label: "Async Collaboration", content: "Engage in threaded discussions, share code snippets, and maintain a single source of truth for your project state." }
            ]
        },
        {
            title: "API & Tools",
            items: [
                { id: 'api', label: "REST API", content: "Integrate SprintDash into your existing CI/CD pipelines. Our comprehensive API allows for full control over projects, tasks, and team data." },
                { id: 'cli', label: "CLI Terminal", content: "For power users, our CLI tool provides a command-line interface to manage your workspace without leaving your terminal." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <Link to="/" className="inline-flex items-center gap-2 group mb-12 text-slate-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-mono text-xs uppercase tracking-widest">Return to Base</span>
                </Link>

                <div className="grid md:grid-cols-[1fr_3fr] gap-16">
                    {/* Navigation Sidebar */}
                    <aside className="hidden md:block">
                        <nav className="sticky top-20 space-y-8">
                            {sections.map(section => (
                                <div key={section.title}>
                                    <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{section.title}</h5>
                                    <ul className="space-y-2">
                                        {section.items.map(item => (
                                            <li key={item.id}>
                                                <a href={`#${item.id}`} className="text-sm text-slate-400 hover:text-neon-teal transition-colors">
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="space-y-20">
                        <header>
                            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white mb-6 uppercase">
                                System <span className="text-neon-teal">Docs</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                                Documentation for SprintDash OS. Learn how to optimize your team's performance
                                and leverage our core scheduling engine.
                            </p>
                        </header>

                        {sections.map(section => (
                            <section key={section.title} className="space-y-12">
                                <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-4 uppercase tracking-widest font-mono">
                                    {section.title}
                                </h2>
                                <div className="space-y-16">
                                    {section.items.map(item => (
                                        <div key={item.id} id={item.id} className="scroll-mt-24">
                                            <h3 className="text-xl font-bold text-neon-teal mb-4">{item.label}</h3>
                                            <div className="glass p-8 rounded-3xl border border-white/5 text-slate-400 leading-relaxed text-lg">
                                                {item.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
