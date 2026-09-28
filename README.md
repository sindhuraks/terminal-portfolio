# Matrix.dev

A terminal-inspired personal portfolio and AI-powered assistant built with Next.js. The site presents Sindhura's background, skills, work experience, projects, and research in a Matrix-style interface, while also giving visitors a chat experience that answers portfolio-related questions using a retrieval-augmented generation (RAG) pipeline over structured profile data.

## Overview

This project is a modern personal portfolio designed to feel like an interactive terminal or command-line dashboard. It combines:

- structured content for about, skills, experience, projects, and research
- a built-in chatbot that answers questions with citations to portfolio data
- embeddings generation to power semantic retrieval against the portfolio content

## What changed in this version

The current version includes several major improvements over a basic static portfolio:

### 1. Terminal-style portfolio UI
The app uses a terminal-inspired layout, custom CSS, and matrix-style visual effects to present the portfolio as a command-line interface instead of a standard landing page.

### 2. Structured portfolio data layer
Profile content is centralized in a data file and is used to generate both the UI sections and the searchable chatbot context. This keeps the portfolio content consistent and easier to maintain.

### 3. RAG-enabled assistant
The site includes a chatbot that:

- receives a user question
- converts the question into an embedding with OpenAI
- compares it to pre-generated portfolio chunks
- retrieves the most relevant content
- sends that context to a chat model along with the question
- returns a concise answer grounded in the portfolio

This makes the assistant behave more like a knowledgeable portfolio concierge than a generic chatbot.

### 4. Embedding generation as part of the build pipeline
The app includes a script that generates embeddings for portfolio chunks and writes them to a JSON file used at runtime. This script is configured to run before build so the data is ready in deployment environments.

### 5. Better maintainability
The portfolio content is not hard-coded in multiple places. The site reads from a single content source and derives retrievable chunks automatically, which makes updates simpler as experience, projects, or publications change.

## Tech stack

- Next.js
- React
- JavaScript
- OpenAI Embeddings API
- OpenAI Chat Completions API

## Project structure

```text
.
├── README.md
├── package.json
├── jsconfig.json
├── next.config.mjs
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.js
│   │   ├── chatbot.css
│   │   ├── chatbot.js
│   │   ├── generate-embeddings.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── page.module.css
│   │   ├── terminal.css
│   │   ├── terminal.js
│   │   └── page.module.css
│   └── data/
│       ├── portfolioContent.js
│       └── portfolioEmbeddings.json
└── .env.local (local environment file, not committed)
```

## Core files

### src/data/portfolioContent.js
This file contains the structured portfolio facts such as:

- about/summary data
- skills and technology tags
- work experience entries
- projects
- research/publications
- contact information

It also includes a function that automatically builds portfolio chunks for retrieval.

### src/app/generate-embeddings.js
This script:

- loads portfolio content from the structured dataset
- creates text chunks for retrieval
- sends each chunk to the OpenAI embeddings endpoint
- saves the resulting vectors to src/data/portfolioEmbeddings.json

### src/app/api/chat/route.js
This is the backend chat API. It:

- validates the incoming question
- looks up the OpenAI API key
- embeds the question
- compares it to stored vectors using cosine similarity
- selects the top relevant chunks
- sends those context blocks to the chat model
- returns the answer and source IDs

### src/app/terminal.js
This is the main portfolio interface. It renders the terminal-style experience and includes the interactive sections for:

- about
- skills
- work history
- projects
- research
- contact

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.local.example .env.local
```

If you do not have a .env.local.example file, create `.env.local` manually and add:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

3. Generate embeddings:

```bash
node src/app/generate-embeddings.js
```

4. Start the app:

```bash
npm run dev
```

The app will be available at http://localhost:3000.

## Build and deployment notes

This project includes the following build-related scripts in package.json:

```json
"generate-embeddings": "node src/app/generate-embeddings.js",
"prebuild": "npm run generate-embeddings"
```

That means the embeddings are generated automatically before each production build. In deployment environments such as Vercel, make sure `OPENAI_API_KEY` is set in the environment variables for the build environment, otherwise the build will fail.

## Environment variables

Required:

- `OPENAI_API_KEY` — used for generating embeddings and completing chat responses

## How the chatbot works

The portfolio assistant is intentionally restricted to information present in the portfolio content. The app does not ask the model to invent details; instead, it uses relevant context blocks from the portfolio dataset to answer questions.

The retrieval flow is roughly:

1. User asks a question
2. Question is embedded
3. Similarity search compares it with the stored portfolio embeddings
4. Top matching content chunks are selected
5. Those chunks are inserted into the prompt as context
6. The model responds with a concise answer grounded in that context

## Customization

To update the portfolio content, edit the data in `src/data/portfolioContent.js`.

If you add:

- a new experience item
- a new project
- a new paper
- a new skill category

then the content can be automatically re-used for embedded retrieval the next time the embeddings script runs.

## Notes

This project is a personal portfolio and assistant, so it is intentionally optimized for:

- strong visual identity
- clear professional storytelling
- AI-assisted discovery of portfolio details
- straightforward maintenance through structured content
