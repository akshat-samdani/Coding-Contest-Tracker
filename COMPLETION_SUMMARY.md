# Backend Deployment Branch Ready

## Summary

This branch is now dedicated to the backend API server only. The React frontend has been removed so the repository can be deployed as a standalone API service.

## Completed

- ✅ Backend-only repo structure
- ✅ Express API server under `backend/`
- ✅ Aggregated contest endpoints for CodeForces, CodeChef, and LeetCode
- ✅ CORS configured for client access
- ✅ `.env.example` and docs updated for backend usage
- ✅ Vercel deployment readiness with `npm start`

## Usage

```bash
npm install
cp .env.example .env
npm start
```

## Notes

- No frontend code remains in this branch.
- All documentation now reflects backend-only usage.
