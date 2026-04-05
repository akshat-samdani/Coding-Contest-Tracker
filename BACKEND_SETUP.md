# Backend API Server Setup

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   React Frontend (Port 3000)            │
│   - Calls localhost:5000/api/...        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Express Backend Server (Port 5000)    │
│   - Wraps official platform APIs        │
│   - Handles CORS                        │
│   - Aggregates contest data             │
└──────────────┬──────────────────────────┘
               │
         ┌─────┼─────┐
         │     │     │
         ▼     ▼     ▼
    CodeForces CodeChef LeetCode
```

## 🚀 How to Run

### Option 1: Run Both Backend + Frontend Together (Recommended)

```bash
# From project root
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React app on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Start Backend:**
```bash
npm run server
```
You should see:
```
🚀 Contest API Server running on http://localhost:5000
📍 Available endpoints:
   GET /api/codeforces - CodeForces contests
   GET /api/codechef - CodeChef contests
   GET /api/leetcode - LeetCode contests
   GET /api/all - All contests aggregated
   GET /api/all?platforms=codeforces,leetcode - Specific platforms
   GET /health - Health check
```

**Terminal 2 - Start React App:**
```bash
npm run client
```

## 📡 API Endpoints

### Get all contests from all platforms
```
GET http://localhost:5000/api/all
```

### Get contests from specific platforms
```
GET http://localhost:5000/api/all?platforms=codeforces,codechef
GET http://localhost:5000/api/all?platforms=leetcode
```

### Get contests from single platform
```
GET http://localhost:5000/api/codeforces
GET http://localhost:5000/api/codechef
GET http://localhost:5000/api/leetcode
```

### Response Format
```json
[
  {
    "id": "1234",
    "platform": "CodeForces",
    "status": "upcoming",
    "name": "Codeforces Round #930 (Div. 1)",
    "startTime": "2024-04-20T10:00:00.000Z",
    "startTimeISO": "2024-04-20T10:00:00.000Z",
    "duration": "2 hours",
    "href": "https://codeforces.com/contest/1234"
  }
]
```

## ✅ Verification

Test the server with:
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok"}

curl http://localhost:5000/api/codeforces
# Should return: [array of CodeForces contests]
```


## 📝 Initial Setup

If you haven't installed dependencies yet:
```bash
npm run install-all
```

This will:
1. Install root dependencies (express, cors, node-fetch, concurrently)
2. Install React app dependencies


## 🐛 Troubleshooting

**Port 5000 already in use?**
```bash
# Change port in server.js line 5:
const PORT = process.env.PORT || 5000;
# OR set environment variable:
PORT=5001 npm run server
```

**React still showing CORS errors?**
- Make sure server is running on port 5000
- Restart both backend and frontend
- Clear browser cache (Ctrl+Shift+Delete)

**Specific platform data not loading?**
- Check browser console for specific errors
- Platform APIs might be temporarily down
- Try individual endpoints: `curl http://localhost:5000/api/codeforces`


## 📚 Architecture Notes

- Backend is standalone and can run independently
- Easy to add more platforms
- Caching can be added for better performance
- Suitable for multiple frontends (web, mobile, etc.)
