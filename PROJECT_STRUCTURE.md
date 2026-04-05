# Project Structure

```
Coding-Contest-Tracker/
├── backend/                  # Express backend server
│   ├── index.js              # Main server entry point
│   ├── config/               # Environment configuration
│   │   └── environment.js
│   ├── controllers/          # Platform-specific business logic
│   │   ├── codeforcesController.js
│   │   ├── codechefController.js
│   │   └── leetcodeController.js
│   ├── routes/               # API routes
│   │   ├── codeforces.js
│   │   ├── codechef.js
│   │   ├── leetcode.js
│   │   └── all.js
│   └── utils/                # Helper utilities
│       ├── errorHandler.js
│       ├── logger.js
│       └── parseDuration.js
├── .env.example              # Backend env template
├── .env                      # Local backend config (ignored)
├── package.json              # Backend scripts and dependencies
├── README.md                 # Overview and usage guide
├── QUICKSTART.md             # Fast start instructions
├── BACKEND_SETUP.md          # Detailed backend documentation
├── PROJECT_STRUCTURE.md      # Architecture overview
├── FILES_REFERENCE.md        # File reference guide
└── REFACTORING.md            # Refactoring summary
```

## Notes

- This repository contains only backend code for the coding contest tracker API.
- The frontend application has been removed from this branch.
- The server is built to run as a standalone API service.
