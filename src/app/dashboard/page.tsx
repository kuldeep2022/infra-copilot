'use client';
import { useState } from 'react';
import { useInfraStore } from '@/lib/store';
import { MOCK_RESOURCES } from '@/lib/mockData';
import ResourceCard from '@/components/ResourceCard';
import ResourceDetail from '@/components/ResourceDetail';
import MetricsBar from '@/components/MetricsBar';
import CopilotChat from '@/components/CopilotChat';
import Link from 'next/link';
import { Filter, MessageSquare, X } from 'lucide-react';

export default function Dashboard() {
  const { filterType, filterRegion, filterEnv, setFilterType, setFilterRegion, setFilterEnv } = useInfraStore();
  const [showChat, setShowChat] = useState(false);

  const filtered = MOCK_RESOURCES.filter(r => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (filterRegion !== 'all' && r.region !== filterRegion) return false;
    if (filterEnv !== 'all' && r.tags.Environment?.toLowerCase() !== filterEnv) return false;
    return true;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#030b18' }}>
      {/* Toolbar */}
      <div className="border-b border-slate-800 bg-slate-950/80 flex-shrink-0">
        <div className="h-12 flex items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80">
              <div className="w-6 h-6 rounded bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xs">☁️</div>
              <span className="font-semibold text-sm text-white">InfraCopilot</span>
            </Link>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1 hidden sm:block">Mock AWS</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <select value={filterType} onChange={e => setFilterType(e.target.value as typeof filterType)} className="bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 px-1.5 sm:px-2 py-1 focus:outline-none">
              <option value="all">All Types</option>
              <option value="ec2">EC2</option>
              <option value="rds">RDS</option>
              <option value="lambda">Lambda</option>
              <option value="s3">S3</option>
              <option value="elasticache">ElastiCache</option>
              <option value="elb">ELB</option>
            </select>
            <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} className="bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 px-2 py-1 focus:outline-none hidden sm:block">
              <option value="all">All Regions</option>
              <option value="us-east-1">us-east-1</option>
              <option value="us-west-2">us-west-2</option>
            </select>
            <select value={filterEnv} onChange={e => setFilterEnv(e.target.value)} className="bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 px-2 py-1 focus:outline-none hidden sm:block">
              <option value="all">All Envs</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
            <button onClick={() => setShowChat(!showChat)} className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800">
              {showChat ? <X size={16} /> : <MessageSquare size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <MetricsBar />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Resource list */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500">{filtered.length} resources</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        </div>

        {/* Right panel: detail + chat */}
        <div className={`${showChat ? 'absolute inset-y-0 right-0 z-20 w-80 bg-[#030b18]' : 'hidden'} lg:relative lg:block lg:w-80 border-l border-slate-800 flex flex-col overflow-hidden`}>
          <ResourceDetail />
          <CopilotChat />
        </div>
      </div>
    </div>
  );
}
