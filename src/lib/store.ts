import { create } from 'zustand';
import { AWSResource, ResourceType } from './mockData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface InfraStore {
  selectedResource: AWSResource | null;
  filterType: ResourceType | 'all';
  filterRegion: string;
  filterEnv: string;
  chatMessages: ChatMessage[];
  isQuerying: boolean;
  showChat: boolean;
  setSelectedResource: (r: AWSResource | null) => void;
  setFilterType: (t: ResourceType | 'all') => void;
  setFilterRegion: (r: string) => void;
  setFilterEnv: (e: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setIsQuerying: (v: boolean) => void;
  setShowChat: (v: boolean) => void;
}

export const useInfraStore = create<InfraStore>((set) => ({
  selectedResource: null,
  filterType: 'all',
  filterRegion: 'all',
  filterEnv: 'all',
  chatMessages: [
    {
      id: '0',
      role: 'assistant',
      content: 'Infra Copilot online. I have visibility into your mock AWS environment with 12 resources across us-east-1 and us-west-2. Ask me anything — cost analysis, performance, security posture, or resource inventory.',
      timestamp: Date.now(),
    }
  ],
  isQuerying: false,
  showChat: true,
  setSelectedResource: (r) => set({ selectedResource: r }),
  setFilterType: (t) => set({ filterType: t }),
  setFilterRegion: (r) => set({ filterRegion: r }),
  setFilterEnv: (e) => set({ filterEnv: e }),
  addMessage: (msg) => set(s => ({ chatMessages: [...s.chatMessages, msg] })),
  setIsQuerying: (v) => set({ isQuerying: v }),
  setShowChat: (v) => set({ showChat: v }),
}));
