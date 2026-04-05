const fetch = require('node-fetch');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/errorHandler');

/**
 * Fetch LeetCode contests
 */
const getLeetcodeContests = async () => {
  try {
    logger.info('Fetching LeetCode contests');
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        query: `
          {
            allContests {
              title
              titleSlug
              startTime
              duration
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new ApiError(response.status, `LeetCode API error: ${response.status}`);
    }

    const data = await response.json();
    const contests = data.data?.allContests || [];

    const formatContest = (contest) => {
      const now = Date.now();
      const startTimeMs = contest.startTime * 1000;
      const endTimeMs = startTimeMs + contest.duration * 1000;

      let status = 'upcoming';
      if (startTimeMs <= now && now <= endTimeMs) {
        status = 'ongoing';
      } else if (now > endTimeMs) {
        status = 'completed';
      }

      const isoDate = new Date(startTimeMs).toISOString();

      return {
        id: contest.titleSlug,
        platform: 'LeetCode',
        status,
        name: contest.title,
        startTime: isoDate,
        startTimeISO: isoDate,
        duration: `${(contest.duration / 3600).toFixed(2)} hours`,
        href: `https://leetcode.com/contest/${contest.titleSlug}`,
      };
    };

    const formattedContests = contests.map(formatContest);
    logger.info(`Found ${formattedContests.length} LeetCode contests`);

    return formattedContests;
  } catch (error) {
    logger.error('LeetCode fetch failed', error.message);
    throw error;
  }
};

module.exports = { getLeetcodeContests };
