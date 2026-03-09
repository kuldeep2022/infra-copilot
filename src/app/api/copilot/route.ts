import Anthropic from '@anthropic-ai/sdk';
import { MOCK_RESOURCES } from '@/lib/mockData';

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'no_key' }, { status: 503 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const resourceSummary = MOCK_RESOURCES.map(r =>
    `- ${r.name} (${r.type.toUpperCase()}, ${r.region}): status=${r.status}, cost=$${r.cost}/mo, cpu=${r.cpu ?? 'N/A'}%, mem=${r.memory ?? 'N/A'}%, env=${r.tags.Environment ?? 'unknown'}`
  ).join('\n');

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: `You are Infra Copilot, an AI assistant for cloud infrastructure management. You have access to the following AWS resources:\n\n${resourceSummary}\n\nAnswer questions about cost, performance, security, and resource management. Be concise and actionable. Use **bold** for key numbers and resource names. Use bullet points for lists.`,
    messages: [{ role: 'user', content: query }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return Response.json({ response: text });
}
