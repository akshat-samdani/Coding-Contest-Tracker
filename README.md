# Coding Contest Tracker API

Backend-only repository for the Coding Contest Tracker API server. This branch contains the Express API and is ready for Vercel deployment.

## Quick Links

- [Backend Setup](./BACKEND_SETUP.md)
- [Quick Start](./QUICKSTART.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [File Reference](./FILES_REFERENCE.md)

## What this repository contains

- Express.js API server under `backend/`
- Aggregated contest endpoints for CodeForces, CodeChef, and LeetCode
- CORS support for browser or client applications
- Modular controllers, routes, utilities, and configuration
- Production-ready setup for deployment on Vercel

## Installation

### Prerequisites
- Node.js v14 or higher
- npm

### Setup

```bash
git clone <repository-url>
cd Coding-Contest-Tracker
npm install
cp .env.example .env
```

## Running the backend server

### Start in production mode

```bash
npm start
```

### Start in development mode

```bash
npm run dev
```

### Verify the server

```bash
curl http://localhost:5001/health
```

## API Endpoints

- `GET /api/all`
- `GET /api/codeforces`
- `GET /api/codechef`
- `GET /api/leetcode`
- `GET /health`

### Example

```bash
curl http://localhost:5001/api/all
curl "http://localhost:5001/api/all?platforms=codeforces,leetcode"
```

## Environment

Copy `.env.example` to `.env` and update values as needed.

```env
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

## Deployment

This repository is structured for backend deployment. Vercel will start the server with `npm start` by default. Set required environment variables in the Vercel dashboard.

## Documentation

- `BACKEND_SETUP.md` - detailed backend setup and verification
- `QUICKSTART.md` - fast startup instructions
- `PROJECT_STRUCTURE.md` - folder layout and architecture
- `FILES_REFERENCE.md` - file-level reference guide
