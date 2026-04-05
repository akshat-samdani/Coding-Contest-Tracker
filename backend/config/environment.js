/**
 * Environment configuration
 */
const config = {
  PORT: process.env.PORT || 5003,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : ['http://localhost:3000'],
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

module.exports = config;
