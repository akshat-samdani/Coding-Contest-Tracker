const express = require('express');
const router = express.Router();
const { getCodeforcesContests } = require('../controllers/codeforcesController');
const { getCodechefContests } = require('../controllers/codechefController');
const { getLeetcodeContests } = require('../controllers/leetcodeController');
const { handleError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * GET /api/all
 * Fetch and aggregate contests from all platforms
 * Query params: ?platforms=codeforces,codechef,leetcode (optional)
 */
router.get('/', async (req, res) => {
  try {
    const platformsParam = req.query.platforms
      ? req.query.platforms.toLowerCase().split(',')
      : ['codeforces', 'codechef', 'leetcode'];

    const validPlatforms = ['codeforces', 'codechef', 'leetcode'];
    const platforms = platformsParam.filter((p) => validPlatforms.includes(p));

    logger.info(`Fetching contests for platforms: ${platforms.join(', ')}`);

    const requests = [];

    if (platforms.includes('codeforces')) {
      requests.push(
        getCodeforcesContests().catch((err) => {
          logger.error(`CodeForces error: ${err.message}`);
          return [];
        })
      );
    }

    if (platforms.includes('codechef')) {
      requests.push(
        getCodechefContests().catch((err) => {
          logger.error(`CodeChef error: ${err.message}`);
          return [];
        })
      );
    }

    if (platforms.includes('leetcode')) {
      requests.push(
        getLeetcodeContests().catch((err) => {
          logger.error(`LeetCode error: ${err.message}`);
          return [];
        })
      );
    }

    const results = await Promise.all(requests);

    const allContests = results.reduce((acc, curr) => {
      return acc.concat(Array.isArray(curr) ? curr : []);
    }, []);

    // Sort by status (upcoming first) then by start time
    const sorted = allContests.sort((a, b) => {
      const statusOrder = { upcoming: 0, ongoing: 1, completed: 2 };
      const statusDiff =
        (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);

      if (statusDiff !== 0) return statusDiff;

      return (
        new Date(a.startTimeISO).getTime() -
        new Date(b.startTimeISO).getTime()
      );
    });

    logger.info(`Returning ${sorted.length} contests`);
    res.json(sorted);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
