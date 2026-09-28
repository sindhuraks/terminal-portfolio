const ABOUT_DATA = [
  //{ key: 'location', val: '"Bentonville, AR"' },
  { key: 'interests', val: '["backend", "ai/ml"]' },
  { key: 'education', val: '"CS @ University of Florida | Go Gators!🐊"' },
];

const SKILLS = [
  { tag: 'LANGUAGES', title: 'LANGUAGES', items: ['Python', 'Java', 'JavaScript', 'Go'] },
//   { tag: 'FRONTEND', title: 'FRONTEND', items: ['React (Next.js)'] },
  { tag: 'BACKEND & FRONTEND', title: 'BACKEND & FRONTEND', items: ['Spring Boot', 'FastAPI','Node.js (Express)', 'React (Next.js)'] },
  { title: 'AI / ML', items: ['HuggingFace', 'LangChain', 'PyTorch', 'spaCy', 'Prompt Engineering', 'RAG'] },
  { tag: 'DATA', title: 'DATA', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'DuckDB'] },
  { tag: 'DEVOPS', title: 'DEVOPS', items: ['Docker', 'Git', 'AWS', 'Kubernetes', 'Git'] },
  { tag: 'MESSAGE QUEUE(S)', title: 'MESSAGE QUEUE(S)', items: ['RabbitMQ', 'Apache Kafka'] },
  { tag: 'ENTERPRISE PLATFORM(S)', title: 'ENTERPRISE PLATFORM(S)', items: ['Temenos Transact T24'] },
  { tag: 'TOOLS', title: 'TOOLS', items: ['Postman', 'cURL'] },
];

const EXPERIENCE = [
  {
    role: 'Software Engineer Apprentice',
    company: 'UF WiCSE | UF ACM-W',
    location: 'Gainesville, FL',
    period: 'Jan 2026 – Apr 2026',
    type: 'APPRENTICESHIP',
    tags: ['Spring Boot', 'PostgreSQL', 'LLM APIs', 'REST APIs', 'React.js', 'Next.js','Git'],
    bullets: [
      'Built Spring Boot microservices backed by a PostgreSQL database to explain log messages, identify their first occurrence, integrating OpenAI, Claude, and Llama APIs for automated log analysis; added retry mechanism for API overload failures to improve resilience.',
      'Implemented LLM-as-a-Judge (Claude Sonnet) to evaluate responses on correctness, completeness, clarity, and answer relevance, improving response quality to 90–95% for clarity/relevance and 85–90% for correctness/completeness.',
    ],
  },
  {
    role: 'Graduate Research Assistant',
    company: 'Trustworthy Engineered Autonomy Lab',
    location: 'Gainesville, FL',
    period: 'Aug 2025 – Apr 2026',
    type: 'RESEARCH',
    tags: ['HuggingFace', 'PyTorch', 'Python', 'FastAPI', 'Git'],
    bullets: [
      'Built a FastAPI multi-GPU inference service for Llama, Qwen, and Gemma using HuggingFace Transformers, incorporating Chain-of-Thought prompting and analyzing latency, token probabilities, and top-50 logits.',
      'Co-authored "Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning," accepted to Findings of ACL 2026.',
    ],
  },
  {
    role: 'Associate Product Engineer',
    company: 'Temenos',
    location: 'Chennai, India',
    period: 'Nov 2021 – Jul 2024',
    type: 'FULL-TIME',
    tags: ['JBase', 'SQL', 'Java', 'REST APIs', 'Transact T24', 'Git', 'JIRA'],
    bullets: [
      'Built scalable backend solutions for asset lease lifecycle, bill generation, payment processing and settlement; automating recurring bill schedules across 2000+ active arrangement contracts with time-triggered payment workflows.',
      'Delivered high-performance code with 95% test coverage, resulting in consistently low production defect rates and minimal need for post-release hotfixes across core asset-finance workflows.',
      'Resolved client and production defects with low MTTR; ensuring 100% on-time release delivery.',
    ],
  },
  {
    role: 'Programmer Analyst',
    company: 'Cognizant',
    location: 'Chennai, India',
    period: 'Nov 2020 – Nov 2021',
    type: 'FULL-TIME',
    tags: ['SAP'],
    bullets: [
      'Developed a custom UI feature for displaying purchase order discrepancies, enhancing visibility and decision-making using SAP tools.',
    ],
  },
];

const PROJECTS = [
  {
    id: 'PROJECT_001',
    name: 'Reddit Clone',
    description: 'A Reddit simulator built with the actor model, supporting account registration, subreddit management, posting, commenting, voting, and direct messaging functionalities.',
    tags: ['Go', 'Protoactor', 'Protobuf', 'Git'],
    github: 'https://github.com/sindhuraks/RedditClone',
  },
  {
    id: 'PROJECT_002',
    name: 'StartupNexus',
    description: 'A responsive web app for startup collaboration, featuring user feeds, profiles, and full post CRUD operations.',
    tags: ['React', 'Next.js', 'Go'],
    github: 'https://github.com/sindhuraks/StartupNexus',
  },
  {
    id: 'PROJECT_003',
    name: 'Incident Radius Analyzer',
    description: 'A Python tool that queries incident data from APIs, stores it in a DuckDB database, identifies the traffic crash affecting the most people on a given date, and finds other incidents within a 1 km radius using geodesic distance.',
    tags: ['Python', 'DuckDB'],
    github: 'https://github.com/sindhuraks/cis6930sp25-project1',
  },
  {
    id: 'PROJECT_004',
    name: 'Data Redaction Platform',
    description: 'A redaction system for sensitive information in PDF documents using Named Entity Recognition (NER) and coreference resolution to redact specified names and entities.',
    tags: ['Python', 'spaCy', 'Apptainer', 'NER'],
    github: 'https://github.com/sindhuraks/cis6930sp25-project2',
  },
  {
    id: 'PROJECT_005',
    name: 'GenAI Log Analyzer',
    description: 'An AI-powered log analysis tool that ingests system logs, explains errors and root causes, recommends remediation actions using Claude, OpenAI, and Llama APIs, and evaluates responses with an LLM-as-a-Judge framework across correctness, completeness, clarity, relevance, and reasoning while identifying first occurrence and recurrence of anomalies.',
    tags: ['Spring Boot', 'PostgreSQL', 'LLMs', 'REST APIs'],
    github: 'https://github.com/sindhuraks/genai-log-analyzer',
  },
  {
    id: 'PROJECT_006',
    name: 'Matrix.dev',
    description: 'A terminal-inspired portfolio exploring backend systems, AI agents, and intelligent software.',
    tags: ['React', 'HTML', 'CSS', 'Next.js', 'RAG'],
    github: 'https://github.com/sindhuraks/terminal-portfolio',
  },
];

const RESEARCH = [
  {
    id: 'PAPER_001',
    title: 'Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning',
    authors: [
      'Zhenjiang Mao*',
      'Anirudhh Venkat*',
      'Artem Bisliouk',
      'Akshat Kothiyal',
      'Sindhura Kumbakonam Subramanian',
      'Saithej Singhu',
      'Ivan Ruchkin',
    ],
    venue: 'Findings of ACL',
    year: 2026,
    arxiv: 'https://arxiv.org/abs/2601.13387',
  },
];

const ME = 'Sindhura Kumbakonam Subramanian';

const CONTACT = {
  email: 'sindhu.ss10@gmail.com',
  github: 'https://github.com/sindhuraks',
  linkedin: 'https://linkedin.com/in/sindhura-k-subramanian',
};

/**
 * Derives retrievable RAG chunks from the structured data above. Add a
 * new job to EXPERIENCE, a new entry to PROJECTS, etc., and a matching
 * chunk is produced automatically the next time this runs — nothing
 * else to maintain.
 */
function buildPortfolioChunks() {
  const chunks = [];

  chunks.push({
    id: 'about',
    text: `Sindhura is a Software Engineer. ${ABOUT_DATA.map((d) => `${d.key}: ${d.val}`).join(', ')}. She is currently available for full-time opportunities.`,
  });

  SKILLS.forEach((s, i) => {
    chunks.push({
      id: `skills-${(s.tag || s.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      text: `${s.title} skills: ${s.items.join(', ')}.`,
    });
  });

  EXPERIENCE.forEach((e, i) => {
    chunks.push({
      id: `experience-${i}-${e.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      text: `${e.role} at ${e.company}, ${e.location} (${e.period}, ${e.type}). ${e.bullets.join(' ')} Tech: ${e.tags.join(', ')}.`,
    });
  });

  PROJECTS.forEach((p) => {
    chunks.push({
      id: `project-${p.id.toLowerCase()}`,
      text: `Project: ${p.name}. ${p.description} Tech: ${p.tags.join(', ')}. GitHub: ${p.github}`,
    });
  });

  RESEARCH.forEach((r) => {
    const authors = r.authors.map((a) => a.replace(/\*/g, '')).filter((a) => a !== ME).join(', ');
    chunks.push({
      id: `research-${r.id.toLowerCase()}`,
      text: `Find the paper on arXiv: ${r.arxiv}`,
    });
  });

  chunks.push({
    id: 'contact',
    text: `Contact info: email ${CONTACT.email}, GitHub ${CONTACT.github}, LinkedIn ${CONTACT.linkedin}. Sindhura is open to new full-time roles, collaborations, and conversations.`,
  });

  return chunks;
}

module.exports = {
  ABOUT_DATA,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  CONTACT,
  buildPortfolioChunks,
};