import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-auto" style={{ background: '#030b18' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-600/6 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-sm">☁️</div>
          <span className="font-bold text-lg">InfraCopilot</span>
        </div>
        <Link href="/dashboard" className="text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 px-4 py-2 rounded-lg font-medium transition-colors">
          Open Dashboard →
        </Link>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-xs text-orange-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          Mock AWS environment — No credentials needed
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Talk to Your{' '}
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Infrastructure</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Natural language cloud infrastructure management. Query costs, performance, and security posture across your AWS environment — just ask in plain English.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-orange-500/25 hover:-translate-y-0.5">
          Open Dashboard →
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
          {[
            { icon: '💬', title: 'Natural Language', desc: 'Ask "show me expensive EC2s" or "check security posture" — no SQL, no CLI.' },
            { icon: '📊', title: 'Cost Intelligence', desc: 'Automatically surface cost anomalies, underutilized resources, and savings opportunities.' },
            { icon: '🔒', title: 'Security Insights', desc: 'Identify public-facing resources, missing encryption, and compliance gaps instantly.' },
          ].map(f => (
            <div key={f.title} className="p-5 rounded-xl border border-slate-800 bg-slate-900/30">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        Built with Next.js, Recharts & Claude API · Portfolio project by Kuldeep Dave
      </footer>
    </div>
  );
}
