markdown
# LearnLink - Accessible Education Platform

## 🏗️ Project Structure (Monorepo)
learnlink-app/
├── client/ # Frontend React/Next.js application
│ ├── src/ # Source code
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
├── server/ # Backend API server
│ ├── src/ # Server source code
│ └── package.json # Backend dependencies
├── shared/ # Shared utilities and types
│ └── package.json # Shared dependencies
├── package.json # Root package.json (workspace config)
└── README.md # This file

text

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install root dependencies:**
   ```bash
   npm install
Install all workspace dependencies:

bash
npm run install:all
Development
Frontend (Client):

bash
cd client
npm run dev
Frontend will run on http://localhost:3000

Backend (Server):

bash
cd server
npm run dev
Backend will run on http://localhost:3001 (or your configured port)

Building for Production
Build all workspaces:

bash
npm run build:all
Build client only:

bash
cd client
npm run build
Build server only:

bash
cd server
npm run build
📦 Workspace Scripts
From the root directory, you can run:

npm run dev:client - Start client development

npm run dev:server - Start server development

npm run build:client - Build client for production

npm run build:server - Build server for production

npm run install:all - Install all workspace dependencies

🛠️ Technologies Used
Frontend:

Next.js 14

React 18

TypeScript

Tailwind CSS

Vite (for development)

Backend:

Node.js

Express/NestJS (depending on your server)

Drizzle ORM

PostgreSQL

🌐 API Endpoints
The server provides REST API endpoints at:

GET /api/content - Fetch learning content

POST /api/auth - Authentication routes

Additional endpoints for mentors, courses, etc.

📁 Important Files
client/package.json - Frontend dependencies

server/package.json - Backend dependencies

shared/package.json - Shared utilities

package.json - Root workspace configuration

drizzle.config.ts - Database configuration

tailwind.config.ts - Styling configuration

text

