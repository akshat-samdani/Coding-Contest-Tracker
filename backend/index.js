/**
 * Main server entry point
 * Coding Contest Tracker API Server
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
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

const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});
app.use(apiLimiter);

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

// Email notification endpoint
const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 20,
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'vqakkms@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  if (!process.env.GMAIL_PASSWORD) {
    logger.error('Missing GMAIL_PASSWORD in environment. Email sending is disabled.');
    return res.status(500).json({ success: false, message: 'Email service not configured.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'vqakkms@gmail.com',
    to: email,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('Email send error:', error);
      res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    } else {
      logger.info('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

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
