const fs = require('fs');
const path = require('path');
const { buildPortfolioChunks } = require('../data/portfolioContent');

const EMBEDDING_MODEL = 'text-embedding-3-small';
const OUTPUT_PATH = path.join(__dirname, '../data/portfolioEmbeddings.json');

async function embedChunk(text, apiKey) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI embeddings request failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.data[0].embedding;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      'Missing OPENAI_API_KEY. In Vercel, add it under Project -> Settings -> ' +
        'Environment Variables and make sure it is enabled for the Build ' +
        'environment, since this script runs at build time.'
    );
    process.exit(1);
  }

  const chunks = buildPortfolioChunks();
  console.log(`Embedding ${chunks.length} chunks with ${EMBEDDING_MODEL}...`);

  const indexed = [];
  for (const chunk of chunks) {
    process.stdout.write(`  - ${chunk.id}... `);
    const embedding = await embedChunk(chunk.text, apiKey);
    indexed.push({ id: chunk.id, text: chunk.text, embedding });
    console.log('done');
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ model: EMBEDDING_MODEL, chunks: indexed }, null, 2));
  console.log(`\nWrote ${indexed.length} vectors to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});