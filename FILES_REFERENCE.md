# Files Reference Guide

## Backend Files Structure

### Entry Point
- `backend/index.js` - Main Express server file

### Controllers
- `backend/controllers/codeforcesController.js` - CodeForces integration and contest formatting
- `backend/controllers/codechefController.js` - CodeChef integration and contest formatting
- `backend/controllers/leetcodeController.js` - LeetCode integration and contest formatting

### Routes
- `backend/routes/codeforces.js` - `/api/codeforces`
- `backend/routes/codechef.js` - `/api/codechef`
- `backend/routes/leetcode.js` - `/api/leetcode`
- `backend/routes/all.js` - `/api/all` aggregation endpoint

### Configuration
- `backend/config/environment.js` - Loads env variables and default values

### Utilities
- `backend/utils/errorHandler.js` - Central error response formatting
- `backend/utils/logger.js` - Basic request and server logging
- `backend/utils/parseDuration.js` - Duration normalization helper

## Root Files
- `.env.example` - Template environment file for local development
- `package.json` - Backend dependency and runtime scripts
- `README.md` - Main repository documentation
- `QUICKSTART.md` - Quick startup guide
- `BACKEND_SETUP.md` - Detailed backend setup instructions
- `PROJECT_STRUCTURE.md` - Architecture and folder layout
- `REFACTORING.md` - Summary of refactoring work
