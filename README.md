# InfraCopilot — Natural Language Cloud Infrastructure Manager

> Talk to your AWS infrastructure in plain English. Query costs, performance, and security posture — no CLI, no SQL, just ask.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Claude AI](https://img.shields.io/badge/Claude-Haiku-orange?style=flat-square)
![Mock AWS](https://img.shields.io/badge/AWS-Mock_Environment-yellow?style=flat-square)

## What it does

InfraCopilot is an AI-powered cloud infrastructure dashboard where you manage and query AWS resources using natural language. It ships with a mock AWS environment (12 resources across 2 regions) so everything works without real cloud credentials. Optionally connect Claude AI for more intelligent responses.

**Ask questions like:**
- *"Show me the most expensive resources"*
- *"Which EC2 instances have high CPU utilization?"*
- *"Check the security posture of my production environment"*
- *"List all stopped instances that are wasting money"*
- *"What is my total monthly cloud spend?"*

## Mock Infrastructure

12 pre-loaded AWS resources across `us-east-1` and `us-west-2`:

| Resource | Type | Monthly Cost |
|----------|------|-------------|
| prod-web-server-01 | EC2 t3.xlarge | $142.80 |
| prod-api-server-01 | EC2 m5.2xlarge | $285.60 |
| prod-postgres-primary | RDS r6g.2xlarge | $524.16 |
| prod-postgres-replica | RDS r6g.2xlarge | $524.16 |
| prod-redis-cluster | ElastiCache r6g.large | $182.40 |
| prod-application-lb | ELB (ALB) | $32.40 |
| auth-token-validator | Lambda | $12.40 |
| image-resize-processor | Lambda | $28.60 |
| company-assets-prod | S3 (2.4TB) | $48.20 |
| audit-logs-archive | S3 (890GB) | $18.90 |
| staging-web-01 | EC2 t3.large | $71.40 |
| dev-worker-01 | EC2 t3.medium (stopped) | $0 |

**Total: ~$1,871/month**

## Features

- **Resource Dashboard** — Grid view of all resources with CPU/memory utilization bars
- **Smart Filters** — Filter by type (EC2, RDS, Lambda, S3...), region, and environment
- **Resource Detail Panel** — Click any resource to see full config, tags, cost breakdown
- **Copilot Chat** — Natural language queries with intelligent mock responses
- **Metrics Bar** — Live summary: total spend, active resources, alerts, regions
- **Intent Detection** — Query parser detects cost/performance/security/resource intent
- **Claude AI Integration** — Upgrades to full Claude responses when API key is provided

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| Charts | Recharts |
| AI | Anthropic Claude API (optional) |
| Icons | Lucide React |

## Getting Started

```bash
git clone https://github.com/kuldeep2022/infra-copilot.git
cd infra-copilot
npm install

# Optional: enable Claude AI for smarter NL responses
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## How the NL Query System Works

1. User submits a natural language query
2. App calls `/api/copilot` — if `ANTHROPIC_API_KEY` is set, uses Claude with full resource context
3. If no API key (or API error), falls back to the built-in intent parser:
   - Detects intent: `cost | performance | security | resource | general`
   - Applies filters: type, region, environment, status
   - Generates a structured markdown response from mock data
4. Response rendered with inline markdown (bold, bullets, headers)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Enables Claude AI for intelligent NL query responses |

---

Built by [Kuldeep Dave](https://portfolio-v2-kuldeep.vercel.app) — Software Engineer 2 @ Meta
