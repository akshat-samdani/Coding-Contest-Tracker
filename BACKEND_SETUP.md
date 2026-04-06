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
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
GMAIL_USER=your_gmail_account@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=your_gmail_account@gmail.com
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
- `POST /send-email` - Send contest reminder emails (requires SMTP env config)
- `GET /health` - health check

> All API routes are protected by rate limiting to prevent abuse. The rate limit defaults to 100 requests per 15 minutes.

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

### Recommended Vercel environment variables

- `NODE_ENV=production`
- `LOG_LEVEL=info`
- `CORS_ORIGIN=https://<your-frontend-domain>`

> If the API is consumed by a frontend hosted elsewhere, set `CORS_ORIGIN` to that frontend URL.

### Vercel deployment tips

- Leave `PORT` unset unless Vercel explicitly requests it.
- Leave the output directory blank for backend-only projects.
- If Vercel prompts for a build command, use `npm install` or leave blank.

### Post-deploy verification

```bash
curl https://<your-vercel-project>.vercel.app/health
curl https://<your-vercel-project>.vercel.app/api/leetcode
```

## Troubleshooting

- If the port is already in use, set `PORT` in `.env` or via environment variables.
- If requests fail, verify the server is running and the requested endpoint exists.
- Use `curl http://localhost:5001/health` to confirm the process is active.
