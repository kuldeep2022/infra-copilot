'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { useInfraStore } from '@/lib/store';

export default function ResourceDetail() {
  const { selectedResource, setSelectedResource } = useInfraStore();

  return (
    <AnimatePresence>
      {selectedResource && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-72 border-l border-slate-800 bg-slate-900/30 flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{selectedResource.type.toUpperCase()}</p>
              <p className="text-sm font-semibold text-white mt-0.5">{selectedResource.name}</p>
            </div>
            <button onClick={() => setSelectedResource(null)} className="text-slate-500 hover:text-slate-300 transition-colors">
              <X size={14} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Cost */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs text-slate-500 mb-1">Monthly Cost</p>
              <p className="text-2xl font-bold text-white">${selectedResource.cost.toFixed(2)}</p>
              <p className="text-xs text-slate-500">≈ ${(selectedResource.cost * 12).toFixed(0)}/year</p>
            </div>

            {/* ID & Region */}
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500">Resource ID</p>
                <p className="text-xs text-slate-300 font-mono mt-0.5 break-all">{selectedResource.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Region</p>
                <p className="text-xs text-slate-300 mt-0.5">{selectedResource.region}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedResource.status === 'running' || selectedResource.status === 'available' ? 'bg-green-400' : 'bg-slate-500'}`} />
                  <p className="text-xs text-slate-300 capitalize">{selectedResource.status}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Created</p>
                <p className="text-xs text-slate-300 mt-0.5">{selectedResource.createdAt}</p>
              </div>
            </div>

            {/* Details */}
            {Object.keys(selectedResource.details).length > 0 && (
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Configuration</p>
                <div className="space-y-1.5">
                  {Object.entries(selectedResource.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}</span>
                      <span className="text-slate-300 text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {Object.keys(selectedResource.tags).length > 0 && (
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Tag size={10} /> Tags</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(selectedResource.tags).map(([k, v]) => (
                    <span key={k} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {k}={v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
