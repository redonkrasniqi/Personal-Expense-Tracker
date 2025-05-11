# 📦 Typescript Full-Stack Project  
*A React + Node/Express + Prisma + PostgreSQL application*

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Directory Structure](#directory-structure)  
4. [Prerequisites](#prerequisites)  
5. [Setup & Installation](#setup--installation)  
6. [Environment Variables](#environment-variables)  
7. [Database & Prisma Workflow](#database--prisma-workflow)  
8. [Running the App](#running-the-app)  
9. [Scripts Reference](#scripts-reference)  
13. [Author & License](#author--license)

---

## Project Overview
This coursework delivers a **full-stack web application** built entirely with **TypeScript**. The **client** (React) provides a modern SPA front-end, while the **server** (Node/Express) exposes a JSON REST API backed by **Prisma ORM** and a **PostgreSQL** database.  
Key goals:

* Demonstrate clean, type-safe code across front and back end.  
* Employ Prisma’s migration system for reproducible schemas.  
* Provide a concise yet complete developer experience for future maintainers.

---

## Tech Stack
| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Front End** | React 18, Vite, React Router, React Query | Fast dev server, component-driven UI, data fetching with caching |
| **Back End**  | Node 20, Express 5, Zod (validation), ts-node-dev | Minimal HTTP server with runtime type-safety |
| **ORM** | Prisma 6.x | Type-safe DB access, schema migrations, and seed scripting |
| **Database** | PostgreSQL 15 | Relational strength, JSONB support, open source |
---

## Directory Structure
\`\`\`
.
├── client/          # React SPA (Vite)
│   ├── public/
│   ├── src/
│   └── vite.config.ts
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── index.ts
│   └── tsconfig.json
└── README.md        # (this file)
\`\`\`

---

## Prerequisites
* **Node ≥ 20 LTS** and **npm ≥ 10** *(or pnpm/yarn)*  
* **PostgreSQL ≥ 15** running locally **OR** Docker installed  
* **git**  

---

## Setup & Installation

#### 1. Clone & Navigate
\`\`\`bash
git clone https://github.com/<your-username>/<project>.git
cd <project>
\`\`\`

#### 2. Install Dependencies
\`\`\`bash
# root-level convenience script
yarn inst
# – or manually –
cd server && yarn install
cd ../client && yarn install
\`\`\`

#### 3. Configure Environment
Copy sample env files and fill in credentials (see next section):

\`\`\`bash
cp server/.env.example server/.env
cp client/.env.example client/.env
\`\`\`

---

## Environment Variables
| File | Key | Description |
|------|-----|-------------|
| \`server/.env\` | \`DATABASE_URL\` | PostgreSQL connection string |
| | \`PORT\` | API port (default : 4000) |
| | \`CORS_ORIGIN\` | Front-end URL (e.g. \`http://localhost:5173\`) |
| \`client/.env\` | \`VITE_API_URL\` | Base URL of Express API |

---

## Database & Prisma Workflow
\`\`\`bash
# 1. Generate & apply latest migrations
cd server
npx prisma migrate deploy
npx prisma migrate dev --name init 

# 2. Generate Prisma client
npx prisma generate

\`\`\`

Prisma keeps schema history in \`server/prisma/migrations/**\`.

---

## Running the App

### Development mode
\`\`\`bash
# root (parallel)
yarn dev    # starts: server @4000 + client @5173

# …or individual shells
yarn workspace server dev
yarn workspace client start
\`\`\`

---

## Scripts Reference
| Location | Command | Purpose |
|----------|---------|---------|
| root | \`yarn dev\` | Concurrent dev servers |
| root | \`yarn inst\` | Install root + both workspaces |

---

## Author & License
Created by **Redon Krasniqi** for *Applied Computer Science* coursework.  
Licensed under the MIT License (see \`LICENSE\`).

---

> **Need Help?** Open an issue or email *rkrasniqi@constructor.university.de*.
