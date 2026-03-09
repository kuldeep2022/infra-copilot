'use client';
import { motion } from 'framer-motion';
import { AWSResource } from '@/lib/mockData';
import { useInfraStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const TYPE_ICONS: Record<string, string> = {
  ec2: '🖥️', rds: '🗄️', lambda: 'λ', s3: '🪣', elb: '⚖️', vpc: '🔗', elasticache: '⚡', ecs: '📦',
};

const STATUS_COLORS: Record<string, string> = {
  running: '#22c55e', available: '#22c55e', stopped: '#64748b', pending: '#f59e0b', error: '#ef4444',
};

interface Props { resource: AWSResource; }

export default function ResourceCard({ resource }: Props) {
  const { selectedResource, setSelectedResource } = useInfraStore();
  const isSelected = selectedResource?.id === resource.id;
  const statusColor = STATUS_COLORS[resource.status] ?? '#64748b';

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setSelectedResource(isSelected ? null : resource)}
      className={cn(
        "p-3 rounded-xl border cursor-pointer transition-all",
        isSelected ? "border-indigo-500/60 bg-indigo-500/5" : "border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50"
      )}
    >
      <div className="flex items-start gap-2">
        <div className="text-xl mt-0.5">{TYPE_ICONS[resource.type] ?? '📦'}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-semibold text-white truncate">{resource.name}</p>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-500 uppercase">{resource.type}</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500">{resource.region}</span>
            <span className="text-xs font-semibold ml-auto" style={{ color: resource.cost > 300 ? '#f59e0b' : '#94a3b8' }}>
              ${resource.cost > 0 ? resource.cost.toFixed(0) : '—'}/mo
            </span>
          </div>

          {/* CPU/Memory bar */}
          {resource.cpu !== undefined && (
            <div className="mt-2 flex gap-1.5">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-slate-600">CPU</span>
                  <span className={resource.cpu > 70 ? 'text-amber-400' : 'text-slate-500'}>{resource.cpu}%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${resource.cpu}%`, background: resource.cpu > 70 ? '#f59e0b' : '#6366f1' }}
                  />
                </div>
              </div>
              {resource.memory !== undefined && (
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-600">MEM</span>
                    <span className={resource.memory > 80 ? 'text-amber-400' : 'text-slate-500'}>{resource.memory}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${resource.memory}%`, background: '#22d3ee' }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
