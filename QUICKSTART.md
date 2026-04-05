# Quick Start Guide

## Backend-only API Server

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Start the server

```bash
npm start
```

### 4. Verify the server is running

```bash
curl http://localhost:5001/health
```

### API examples

```bash
curl http://localhost:5001/api/all
curl "http://localhost:5001/api/all?platforms=codeforces,leetcode"
curl http://localhost:5001/api/codechef
```

### Notes

- This repository contains only the backend API server.
- If you deploy to Vercel, the API will be served from the deployment URL.
