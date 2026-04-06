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

4. **Set up Firebase (Optional)**
   ```bash
   # Create your own Firebase project at https://console.firebase.google.com/
   # Add your Firebase configuration to coding-contest-tracker-app/.env
   # The app will work without authentication in offline mode if Firebase is not configured.
   ```
   **Note:** Firebase configuration is loaded from environment variables. The app gracefully falls back to offline mode without authentication if Firebase credentials are not provided.

## 🚀 Running the Application

### Local Development (Recommended)

For full local development with both backend and frontend:

1. **Ensure environment variables are set up** (from setup steps above)

2. **Start the backend server**
   ```bash
   npm run server
   ```
   Server runs on `http://localhost:5003`
   You should see:
   ```bash
   🚀 Contest API Server started
   📍 Running on http://localhost:5003
   📚 Environment: development
   ```

3. **Start the React frontend** (in a new terminal)
   ```bash
   cd coding-contest-tracker-app
   npm start
   ```
   Frontend runs on `http://localhost:3000` (or next available port)

4. **Verify setup**
   - Backend health: `curl http://localhost:5003/health`
   - API test: `curl http://localhost:5003/api/all`
   - Frontend: Open browser to the displayed URL

### Using Concurrently (Alternative)
```bash
npm run dev
```
This starts both backend (port 5003) and frontend concurrently using the `concurrently` package.

### Production Build Environment

The project supports a separate production environment file for builds.
- Use `.env` for local development.
- Use `.env.production` when building for production.

Create `coding-contest-tracker-app/.env.production` with your production backend URL and Firebase config.

When you run `npm run build`, Create React App automatically picks up `.env.production`.

### Production Deployment

- **Backend**: Deploy to Vercel, Railway, or similar platform
- **Frontend**: Build and deploy to Netlify, Vercel, or GitHub Pages
- **Environment Variables**: Set `REACT_APP_API_BASE_URL` to your deployed backend URL

### Troubleshooting

- **Port conflicts**: If ports 5003 or 3000 are busy, the apps will use next available ports
- **CORS issues**: The backend allows all `localhost` origins for development
- **Firebase offline mode**: If Firebase config is missing, the app runs without authentication

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

## � Firebase Authentication (Optional)

This project uses Firebase for user authentication and data persistence. Since this is an open source project, Firebase configuration is not committed to the repository.

### For Full Features (Recommended)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Realtime Database
3. Copy the example file:
   ```bash
   cp coding-contest-tracker-app/src/firebase.js.example coding-contest-tracker-app/src/firebase.js
   ```
4. Update `firebase.js` with your Firebase config
5. Enable the following Firebase services:
   - Authentication (Email/Password)
   - Realtime Database

### Offline Mode (No Authentication)

If you don't set up Firebase, the app will run in offline mode with:
- No user authentication
- Local storage for platform preferences
- All contest features available
- No data persistence across devices

The app automatically detects and handles missing Firebase configuration.

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

## 🌐 Chrome Extension Deployment

This repository includes a Chrome extension version that can be deployed to the Chrome Web Store.

### Build the Extension

1. **Navigate to the extension directory**
   ```bash
   cd coding-contest-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the React app**
   ```bash
   npm run build
   ```
   This build automatically uses `coding-contest-tracker-app/.env.production` when present.

4. **Package the extension**
   ```bash
   # Copy required files to build directory
   cp public/manifest.json build/
   cp public/favicon.ico build/
   cp public/logo192.png build/
   cp public/logo512.png build/

   # Create the extension zip file
   cd build
   zip -r ../coding-contest-tracker-extension.zip .
   cd ..
   ```

### Test in Chrome Developer Mode

1. **Open Chrome Extensions**
   - Go to `chrome://extensions`
   - Turn on **Developer mode** in the top right

2. **Load the unpacked extension**
   - Click **Load unpacked**
   - Select the `coding-contest-tracker-app/build` folder

3. **Verify the extension**
   - Open the extension popup or toolbar icon
   - Check the console via **Inspect views** for errors
   - Confirm the app fetches contests from the backend

4. **If using a local backend**
   - Start the backend server first:
     ```bash
     npm run server
     ```
   - Ensure `REACT_APP_API_BASE_URL` points to your local backend before building the extension.

5. **If using the deployed backend**
   - Build with a production backend URL:
     ```bash
     REACT_APP_API_BASE_URL=https://coding-contest-tracker.vercel.app npm run build
     ```

6. **Rebuild after changes**
   - Every time you update source files, rebuild and reload the unpacked extension.

### Upload to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click "Add a new item"
3. Upload the `coding-contest-tracker-extension.zip` file
4. Fill in the extension details:
   - Name: Coding Contest Tracker
   - Description: Track upcoming coding contests from CodeForces, CodeChef, and LeetCode
   - Icons: Use the provided logo files
5. Submit for review

### Extension Features

- **Contest Tracking**: View upcoming, live, and today's contests
- **Add to Calendar**: Add contests to Apple or Google Calendar
- **Notifications**: Get browser notifications for contests
- **User Authentication**: Sign in with Firebase to save preferences
- **Platform Filtering**: Filter contests by CodeForces, CodeChef, LeetCode

## 📄 License

This project is open source. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.