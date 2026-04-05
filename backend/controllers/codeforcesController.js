const fetch = require('node-fetch');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/errorHandler');

/**
 * Fetch CodeForces contests
 */
const getCodeforcesContests = async () => {
  try {
    logger.info('Fetching CodeForces contests');
    const response = await fetch('https://codeforces.com/api/contest.list');

    if (!response.ok) {
      throw new ApiError(response.status, `CodeForces API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      logger.warn('No CodeForces contests found');
      return [];
    }

    const result = data.result;

    const formatContest = (contest, status) => {
      const isoDate = new Date(contest.startTimeSeconds * 1000).toISOString();
      return {
        id: contest.id,
        platform: 'CodeForces',
        status,
        name: contest.name,
        startTime: isoDate,
        startTimeISO: isoDate,
        duration: `${(contest.durationSeconds / 3600).toFixed(2)} hours`,
        href: `https://codeforces.com/contest/${contest.id}`,
      };
    };

    const upcoming = result
      .filter((c) => c.phase === 'BEFORE')
      .map((c) => formatContest(c, 'upcoming'));

    const ongoing = result
      .filter((c) => c.phase === 'CODING')
      .map((c) => formatContest(c, 'ongoing'));

    const completed = result
      .filter((c) => c.phase === 'FINISHED')
      .slice(0, 10)
      .map((c) => formatContest(c, 'completed'));

    const contests = [...upcoming, ...ongoing, ...completed];
    logger.info(`Found ${contests.length} CodeForces contests`);

    return contests;
  } catch (error) {
    logger.error('CodeForces fetch failed', error.message);
    throw error;
  }
};

module.exports = { getCodeforcesContests };
