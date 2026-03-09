'use client';
import { MOCK_RESOURCES } from '@/lib/mockData';
import { TrendingUp, Server, DollarSign, AlertTriangle } from 'lucide-react';

export default function MetricsBar() {
  const totalCost = MOCK_RESOURCES.reduce((s, r) => s + r.cost, 0);
  const running = MOCK_RESOURCES.filter(r => r.status === 'running' || r.status === 'available').length;
  const highCpu = MOCK_RESOURCES.filter(r => (r.cpu ?? 0) > 70).length;

  const metrics = [
    { icon: DollarSign, label: 'Monthly Spend', value: `$${totalCost.toFixed(0)}`, sub: '+4.2% vs last month', color: '#f59e0b' },
    { icon: Server, label: 'Active Resources', value: `${running}`, sub: `${MOCK_RESOURCES.length} total`, color: '#22c55e' },
    { icon: AlertTriangle, label: 'High CPU Alerts', value: `${highCpu}`, sub: highCpu > 0 ? 'Needs attention' : 'All normal', color: highCpu > 0 ? '#ef4444' : '#22c55e' },
    { icon: TrendingUp, label: 'Regions', value: '2', sub: 'us-east-1 · us-west-2', color: '#6366f1' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 p-4 border-b border-slate-800">
      {metrics.map(m => (
        <div key={m.label} className="p-3 rounded-xl border border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-2 mb-1">
            <m.icon size={12} style={{ color: m.color }} />
            <span className="text-xs text-slate-500">{m.label}</span>
          </div>
          <p className="text-xl font-bold text-white">{m.value}</p>
          <p className="text-xs" style={{ color: m.color }}>{m.sub}</p>
        </div>
      ))}
    </div>
  );
}
