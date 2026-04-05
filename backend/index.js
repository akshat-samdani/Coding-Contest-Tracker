/**
 * Main server entry point
 * Coding Contest Tracker API Server
 */
const express = require('express');
const cors = require('cors');
const config = require('./config/environment');
const logger = require('./utils/logger');

// Import routes
const codeforcesRoutes = require('./routes/codeforces');
const codechefRoutes = require('./routes/codechef');
const leetcodeRoutes = require('./routes/leetcode');
const allRoutes = require('./routes/all');

// Initialize Express app
const app = express();

// ==================== Middleware ====================
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ==================== Routes ====================
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/codechef', codechefRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/all', allRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// ==================== Start Server ====================
app.listen(config.PORT, () => {
  logger.info('🚀 Contest API Server started');
  logger.info(`📍 Running on http://localhost:${config.PORT}`);
  logger.info(`📚 Environment: ${config.NODE_ENV}`);
  logger.info('');
  logger.info('📡 Available endpoints:');
  logger.info('   GET  /api/codeforces           - CodeForces contests');
  logger.info('   GET  /api/codechef             - CodeChef contests');
  logger.info('   GET  /api/leetcode             - LeetCode contests');
  logger.info('   GET  /api/all                  - All contests (default)');
  logger.info('   GET  /api/all?platforms=...    - Specific platforms');
  logger.info('   GET  /health                   - Health check');
  logger.info('');
});
