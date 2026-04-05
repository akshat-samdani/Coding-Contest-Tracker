# Coding Contest Tracker

A full-stack application to track and aggregate coding contests from multiple platforms in one place.

## 📚 Quick Links

- [Quick Start Guide](./QUICKSTART.md) - Get started in 2 minutes
- [Project Structure](./PROJECT_STRUCTURE.md) - Understand the architecture
- [Backend Setup](./BACKEND_SETUP.md) - Detailed backend documentation

## 🎯 Features

- **Real-time Contest Updates** from multiple platforms
- **Platform Support**: CodeForces, CodeChef, LeetCode
- **Contest Filtering** by platform and status
- **User Authentication** with Firebase
- **Personal Contest Subscriptions** saved to database
- **Responsive UI** built with React
- **Production-Ready Backend** built with Express.js

## 🏗️ Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Firebase** - Authentication & Database
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### Backend
- **Node.js + Express** - Server framework
- **CORS** - Cross-Origin Resource Sharing
- **Node Fetch** - HTTP requests

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Coding-Contest-Tracker
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**
   ```bash
   # Backend configuration
   cp .env.example .env
   
   # Frontend configuration
   cp coding-contest-tracker-app/.env.example coding-contest-tracker-app/.env
   ```

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
npm run dev
```
This starts both the backend (port 5001) and frontend (port 3000) concurrently.

### Running Separately

**Backend Only:**
```bash
npm run server
```
Server runs on `http://localhost:5001`

**Frontend Only:**
```bash
cd coding-contest-tracker-app
npm start
```
Frontend runs on `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized build in `coding-contest-tracker-app/build/`

## 📡 API Endpoints

### Get Contests

**All Platforms:**
```bash
GET /api/all
```

**Specific Platform:**
```bash
GET /api/codeforces
GET /api/codechef
GET /api/leetcode
```

**Multiple Platforms:**
```bash
GET /api/all?platforms=codeforces,leetcode
```

**Health Check:**
```bash
GET /health
```

### Response Format
```json
[
  {
    "id": "contest-id",
    "platform": "CodeForces",
    "status": "upcoming",
    "name": "Codeforces Round #930",
    "startTime": "2026-04-07T14:35:00.000Z",
    "startTimeISO": "2026-04-07T14:35:00.000Z",
    "duration": "2.25 hours",
    "href": "https://codeforces.com/contest/1234"
  }
]
```

## 🔧 Configuration

### Backend (.env)
```
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:5001
```

## 📂 Project Structure

```
Coding-Contest-Tracker/
├── backend/                 # Express backend server
│   ├── index.js            # Main entry point
│   ├── config/             # Configuration
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   └── utils/              # Utilities
├── coding-contest-tracker-app/  # React frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── contestApi.js   # API service
│   │   ├── firebase.js
│   │   └── components/
│   └── package.json
├── .env                    # Backend env
├── .env.example
└── package.json
```

## 🏃 Performance Features

- **Modular Architecture** - Easy to add new platforms
- **Error Handling** - Comprehensive error handling with proper HTTP codes
- **Logging** - Built-in logging for debugging
- **Environment Configuration** - Easy environment management
- **CORS Support** - Seamless cross-origin requests

## 🧪 Testing the API

```bash
# Get all contests
curl http://localhost:5001/api/all

# Get only CodeForces contests
curl http://localhost:5001/api/codeforces

# Filter specific platforms
curl "http://localhost:5001/api/all?platforms=codeforces,leetcode"

# Health check
curl http://localhost:5001/health
```

## 📝 Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5001 | Backend server port |
| NODE_ENV | development | Environment (development/production) |
| CORS_ORIGIN | http://localhost:3000 | Allowed CORS origin |
| LOG_LEVEL | info | Logging level |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_BASE_URL | http://localhost:5001 | Backend API URL |

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env file or use:
PORT=8000 npm run server
```

### CORS Errors
- Ensure backend is running on configured port
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CORS_ORIGIN in .env matches your frontend URL

### API Not Responding
- Check if backend is running: `curl http://localhost:5001/health`
- Check logs for error messages
- Verify network connectivity to external APIs

## 📚 Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Detailed architecture
- [Backend Setup](./BACKEND_SETUP.md) - Backend-specific docs
- [Quick Start](./QUICKSTART.md) - Quick start guide

## 🚀 Deployment

### Backend Deployment Options
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean
- Your own VPS

Update `REACT_APP_API_BASE_URL` in frontend .env to point to deployed backend.

### Frontend Deployment Options
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📄 License

This project is open source. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.