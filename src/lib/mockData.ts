export type ResourceType = 'ec2' | 'rds' | 'lambda' | 's3' | 'elb' | 'vpc' | 'elasticache' | 'ecs';
export type ResourceStatus = 'running' | 'stopped' | 'pending' | 'error' | 'available';

export interface AWSResource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  region: string;
  cost: number; // monthly USD
  cpu?: number;
  memory?: number;
  tags: Record<string, string>;
  createdAt: string;
  details: Record<string, string>;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export const MOCK_RESOURCES: AWSResource[] = [
  {
    id: 'i-0a1b2c3d4e5f6789', name: 'prod-web-server-01', type: 'ec2', status: 'running',
    region: 'us-east-1', cost: 142.80, cpu: 68, memory: 72,
    tags: { Environment: 'production', Team: 'platform', App: 'web' },
    createdAt: '2024-01-15', details: { 'Instance Type': 't3.xlarge', 'VPC': 'vpc-prod-main', 'AZ': 'us-east-1a', 'Public IP': '54.23.11.42' },
  },
  {
    id: 'i-0b2c3d4e5f678901', name: 'prod-api-server-01', type: 'ec2', status: 'running',
    region: 'us-east-1', cost: 285.60, cpu: 82, memory: 65,
    tags: { Environment: 'production', Team: 'backend', App: 'api' },
    createdAt: '2024-01-20', details: { 'Instance Type': 'm5.2xlarge', 'VPC': 'vpc-prod-main', 'AZ': 'us-east-1b', 'Private IP': '10.0.1.42' },
  },
  {
    id: 'i-0c3d4e5f67890123', name: 'staging-web-01', type: 'ec2', status: 'running',
    region: 'us-west-2', cost: 71.40, cpu: 12, memory: 18,
    tags: { Environment: 'staging', Team: 'platform', App: 'web' },
    createdAt: '2024-02-01', details: { 'Instance Type': 't3.large', 'VPC': 'vpc-staging', 'AZ': 'us-west-2a' },
  },
  {
    id: 'i-0d4e5f6789012345', name: 'dev-worker-01', type: 'ec2', status: 'stopped',
    region: 'us-east-1', cost: 0, cpu: 0, memory: 0,
    tags: { Environment: 'development', Team: 'backend' },
    createdAt: '2024-03-10', details: { 'Instance Type': 't3.medium', 'VPC': 'vpc-dev' },
  },
  {
    id: 'db-prod-pg-01', name: 'prod-postgres-primary', type: 'rds', status: 'available',
    region: 'us-east-1', cost: 524.16, cpu: 45, memory: 82,
    tags: { Environment: 'production', Team: 'data', Engine: 'postgres' },
    createdAt: '2023-11-01', details: { 'Engine': 'PostgreSQL 15.4', 'Class': 'db.r6g.2xlarge', 'Storage': '500 GB gp3', 'Multi-AZ': 'Yes' },
  },
  {
    id: 'db-prod-pg-replica', name: 'prod-postgres-replica', type: 'rds', status: 'available',
    region: 'us-east-1', cost: 524.16, cpu: 15, memory: 30,
    tags: { Environment: 'production', Team: 'data', Engine: 'postgres', Role: 'replica' },
    createdAt: '2023-11-01', details: { 'Engine': 'PostgreSQL 15.4', 'Class': 'db.r6g.2xlarge', 'Storage': '500 GB gp3', 'Role': 'Read Replica' },
  },
  {
    id: 'fn-auth-handler', name: 'auth-token-validator', type: 'lambda', status: 'running',
    region: 'us-east-1', cost: 12.40, cpu: 5, memory: 10,
    tags: { Environment: 'production', Team: 'security', Runtime: 'nodejs20' },
    createdAt: '2024-01-05', details: { 'Runtime': 'Node.js 20.x', 'Memory': '512 MB', 'Timeout': '30s', 'Invocations': '2.4M/month' },
  },
  {
    id: 'fn-image-processor', name: 'image-resize-processor', type: 'lambda', status: 'running',
    region: 'us-east-1', cost: 28.60, cpu: 20, memory: 35,
    tags: { Environment: 'production', Team: 'media', Runtime: 'python3.12' },
    createdAt: '2024-02-10', details: { 'Runtime': 'Python 3.12', 'Memory': '1024 MB', 'Timeout': '60s', 'Invocations': '890K/month' },
  },
  {
    id: 's3-assets-prod', name: 'company-assets-prod', type: 's3', status: 'available',
    region: 'us-east-1', cost: 48.20, cpu: 0, memory: 0,
    tags: { Environment: 'production', Team: 'platform', Type: 'assets' },
    createdAt: '2023-06-01', details: { 'Storage': '2.4 TB', 'Objects': '1.2M', 'Versioning': 'Enabled', 'Replication': 'Cross-region' },
  },
  {
    id: 's3-logs-archive', name: 'audit-logs-archive', type: 's3', status: 'available',
    region: 'us-east-1', cost: 18.90, cpu: 0, memory: 0,
    tags: { Environment: 'production', Team: 'security', Type: 'logs' },
    createdAt: '2023-06-01', details: { 'Storage': '890 GB', 'Objects': '45M', 'Lifecycle': 'IA after 90d, Glacier after 365d' },
  },
  {
    id: 'elb-prod-main', name: 'prod-application-lb', type: 'elb', status: 'running',
    region: 'us-east-1', cost: 32.40,
    tags: { Environment: 'production', Team: 'platform' },
    createdAt: '2023-11-15', details: { 'Type': 'Application', 'Targets': '4', 'Requests': '8.4M/day', 'SSL': 'ACM cert' },
  },
  {
    id: 'cache-prod-redis', name: 'prod-redis-cluster', type: 'elasticache', status: 'available',
    region: 'us-east-1', cost: 182.40, cpu: 22, memory: 48,
    tags: { Environment: 'production', Team: 'platform', Engine: 'redis' },
    createdAt: '2024-01-10', details: { 'Engine': 'Redis 7.2', 'Node Type': 'cache.r6g.large', 'Nodes': '3 (1 primary, 2 replicas)', 'Backup': 'Daily' },
  },
];

export const COST_HISTORY: MetricPoint[] = Array.from({ length: 30 }, (_, i) => ({
  time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: 1600 + Math.sin(i * 0.4) * 120 + i * 8 + Math.random() * 40,
}));

export const CPU_HISTORY: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 40 + Math.sin(i * 0.5) * 20 + Math.random() * 15,
}));

export type QueryIntent = 'cost' | 'security' | 'performance' | 'resource' | 'general';

export interface ParsedQuery {
  intent: QueryIntent;
  filters: { type?: ResourceType; region?: string; env?: string; status?: string };
  question: string;
}

export function parseQuery(query: string): ParsedQuery {
  const q = query.toLowerCase();
  const intent: QueryIntent =
    q.includes('cost') || q.includes('spend') || q.includes('expensive') || q.includes('cheap') || q.includes('price') ? 'cost' :
    q.includes('security') || q.includes('public') || q.includes('exposure') ? 'security' :
    q.includes('cpu') || q.includes('memory') || q.includes('performance') || q.includes('slow') ? 'performance' :
    q.includes('running') || q.includes('stopped') || q.includes('instance') || q.includes('server') ? 'resource' : 'general';

  const filters: ParsedQuery['filters'] = {};
  if (q.includes('ec2')) filters.type = 'ec2';
  if (q.includes('rds') || q.includes('database')) filters.type = 'rds';
  if (q.includes('lambda') || q.includes('function')) filters.type = 'lambda';
  if (q.includes('s3') || q.includes('bucket')) filters.type = 's3';
  if (q.includes('us-east') || q.includes('virginia')) filters.region = 'us-east-1';
  if (q.includes('us-west') || q.includes('oregon')) filters.region = 'us-west-2';
  if (q.includes('production') || q.includes('prod')) filters.env = 'production';
  if (q.includes('staging')) filters.env = 'staging';
  if (q.includes('stopped')) filters.status = 'stopped';
  if (q.includes('running')) filters.status = 'running';

  return { intent, filters, question: query };
}

export function generateMockAnswer(query: ParsedQuery): string {
  const resources = MOCK_RESOURCES.filter(r => {
    if (query.filters.type && r.type !== query.filters.type) return false;
    if (query.filters.region && r.region !== query.filters.region) return false;
    if (query.filters.env && r.tags.Environment?.toLowerCase() !== query.filters.env) return false;
    if (query.filters.status && r.status !== query.filters.status) return false;
    return true;
  });

  const totalCost = resources.reduce((s, r) => s + r.cost, 0);

  switch (query.intent) {
    case 'cost': {
      const sorted = [...resources].sort((a, b) => b.cost - a.cost);
      return `**Cost Analysis** (${resources.length} resources matched)\n\nTotal monthly cost: **$${totalCost.toFixed(2)}**\n\nTop 3 most expensive:\n${sorted.slice(0, 3).map((r, i) => `${i + 1}. **${r.name}** — $${r.cost.toFixed(2)}/mo (${r.type.toUpperCase()})`).join('\n')}\n\nRecommendation: ${sorted[0]?.cpu !== undefined && (sorted[0]?.cpu ?? 0) < 20 ? `**${sorted[0].name}** appears underutilized (${sorted[0].cpu}% CPU). Consider downsizing to save ~$${(sorted[0].cost * 0.35).toFixed(2)}/mo.` : 'All resources appear appropriately sized.'}`;
    }
    case 'performance': {
      const highCpu = resources.filter(r => (r.cpu ?? 0) > 70);
      return `**Performance Report** (${resources.length} resources)\n\n${highCpu.length > 0 ? `⚠️ High CPU (>70%):\n${highCpu.map(r => `• **${r.name}**: ${r.cpu}% CPU, ${r.memory}% memory`).join('\n')}` : '✅ All resources within normal CPU thresholds (<70%)'}\n\nAverage CPU: ${resources.filter(r => r.cpu !== undefined).length > 0 ? (resources.reduce((s, r) => s + (r.cpu ?? 0), 0) / resources.filter(r => r.cpu !== undefined).length).toFixed(1) : 'N/A'}%`;
    }
    case 'security': {
      const public_ips = resources.filter(r => r.details['Public IP']);
      return `**Security Scan** (${resources.length} resources)\n\n${public_ips.length > 0 ? `⚠️ Resources with public IPs:\n${public_ips.map(r => `• **${r.name}** — ${r.details['Public IP']}`).join('\n')}\n\nRecommendation: Review security groups for these instances.` : '✅ No resources with public IPs found in this scope.'}\n\n✅ S3 buckets: Versioning enabled on prod assets\n✅ RDS: Multi-AZ enabled for production databases`;
    }
    case 'resource': {
      const running = resources.filter(r => r.status === 'running' || r.status === 'available');
      const stopped = resources.filter(r => r.status === 'stopped');
      return `**Resource Inventory** (${resources.length} total)\n\nRunning/Available: **${running.length}** resources\nStopped: **${stopped.length}** resources${stopped.length > 0 ? `\n\nStopped resources (no cost):\n${stopped.map(r => `• **${r.name}** (${r.type.toUpperCase()}) — ${r.tags.Environment}`).join('\n')}` : ''}\n\nBy type: ${[...new Set(resources.map(r => r.type))].map(t => `${t}: ${resources.filter(r => r.type === t).length}`).join(' · ')}`;
    }
    default:
      return `I found **${resources.length} resources** matching your query.\n\nTotal infrastructure cost: **$${MOCK_RESOURCES.reduce((s, r) => s + r.cost, 0).toFixed(2)}/month** across ${MOCK_RESOURCES.length} resources.\n\nTry asking:\n• "Show me all expensive EC2 instances"\n• "Which resources have high CPU?"\n• "List all stopped instances"\n• "Check security of production resources"\n\n*Add your Anthropic API key to enable Claude AI for more intelligent queries.*`;
  }
}
