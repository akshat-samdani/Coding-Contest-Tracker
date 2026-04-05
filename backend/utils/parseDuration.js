/**
 * Parse duration string to hours
 * Handles formats like "0 days 4 hours 30 minutes", "2 hours", "120 minutes"
 */
const parseDuration = (durationStr) => {
  if (!durationStr) return 2; // Default 2 hours

  let totalHours = 0;

  const dayMatch = durationStr.match(/(\d+)\s*days?/i);
  const hourMatch = durationStr.match(/(\d+)\s*hours?|(\d+)\s*hrs?/i);
  const minMatch = durationStr.match(/(\d+)\s*minutes?|(\d+)\s*mins?/i);

  if (dayMatch) totalHours += parseInt(dayMatch[1]) * 24;
  if (hourMatch) totalHours += parseInt(hourMatch[1] || hourMatch[2]);
  if (minMatch) totalHours += Math.ceil(parseInt(minMatch[1] || minMatch[2]) / 60);

  return totalHours || 2;
};

module.exports = parseDuration;
