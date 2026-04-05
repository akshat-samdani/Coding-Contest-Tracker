# Backend API Server Setup

## Architecture

```
┌───────────────────────────────────────────┐
│ Backend API Server                         │
│ - Express.js                              │
│ - Aggregates contests from third-party APIs
│ - Serves platform-specific and aggregated endpoints
└───────────────────────────────────────────┘
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Copy the example environment file

```bash
cp .env.example .env
```

3. Review and update `.env` if needed

```env
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

## Run the server

```bash
npm start
```

Or for development mode:

```bash
npm run dev
```

The API server listens on `http://localhost:5001` by default.

## API Endpoints

- `GET /api/all` - all contests aggregated
- `GET /api/codeforces` - CodeForces contests
- `GET /api/codechef` - CodeChef contests
- `GET /api/leetcode` - LeetCode contests
- `GET /health` - health check

## Example requests

```bash
curl http://localhost:5001/api/all
curl "http://localhost:5001/api/all?platforms=codeforces,leetcode"
curl http://localhost:5001/health
```

## Vercel deployment

This branch is ready for deployment to Vercel.

- Use `npm start` as the production command.
- Configure environment variables in the Vercel dashboard.
- Vercel will assign the runtime port automatically.

## Troubleshooting

- If the port is already in use, set `PORT` in `.env` or via environment variables.
- If requests fail, verify the server is running and the requested endpoint exists.
- Use `curl http://localhost:5001/health` to confirm the process is active.
