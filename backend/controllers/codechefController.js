const fetch = require('node-fetch');
const logger = require('../utils/logger');
const parseDuration = require('../utils/parseDuration');
const { ApiError } = require('../utils/errorHandler');

/**
 * Fetch CodeChef contests
 */
const getCodechefContests = async () => {
  try {
    logger.info('Fetching CodeChef contests');
    const response = await fetch(
      'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all'
    );

    if (!response.ok) {
      throw new ApiError(response.status, `CodeChef API error: ${response.status}`);
    }

    const data = await response.json();

    const formatContest = (contest, status) => ({
      id: contest.contest_code,
      platform: 'CodeChef',
      status,
      name: contest.contest_name,
      startTime: contest.contest_start_date_iso,
      startTimeISO: contest.contest_start_date_iso,
      duration: `${parseDuration(contest.contest_duration)} hours`,
      href: `https://www.codechef.com/${contest.contest_code}`,
    });

    const upcoming = (data.future_contests || []).map((c) =>
      formatContest(c, 'upcoming')
    );
    const ongoing = (data.present_contests || []).map((c) =>
      formatContest(c, 'ongoing')
    );
    const completed = (data.past_contests || []).slice(0, 10).map((c) =>
      formatContest(c, 'completed')
    );

    const contests = [...upcoming, ...ongoing, ...completed];
    logger.info(`Found ${contests.length} CodeChef contests`);

    return contests;
  } catch (error) {
    logger.error('CodeChef fetch failed', error.message);
    throw error;
  }
};

module.exports = { getCodechefContests };
