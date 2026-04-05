const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to parse duration
const parseDuration = (durationStr) => {
  if (!durationStr) return 0;

  let totalHours = 0;

  const dayMatch = durationStr.match(/(\d+)\s*days?/);
  const hourMatch = durationStr.match(/(\d+)\s*hours?/);
  const minMatch = durationStr.match(/(\d+)\s*minutes?/);

  if (dayMatch) totalHours += parseInt(dayMatch[1]) * 24;
  if (hourMatch) totalHours += parseInt(hourMatch[1]);
  if (minMatch) totalHours += Math.ceil(parseInt(minMatch[1]) / 60);

  return totalHours || 2;
};

// ==================== CodeForces API ====================
app.get('/api/codeforces', async (req, res) => {
  try {
    const response = await fetch('https://codeforces.com/api/contest.list');
    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      return res.json([]);
    }

    const result = data.result;

    const getFormattedContest = (contest, status) => {
      const isoDate = new Date(contest.startTimeSeconds * 1000).toISOString();
      return {
        id: contest.id,
        platform: 'CodeForces',
        status: status,
        name: contest.name,
        startTime: isoDate,
        startTimeISO: isoDate,
        duration: contest.durationSeconds / 3600 + ' hours',
        href: `https://codeforces.com/contest/${String(contest.id)}`,
      };
    };

    const futureContests = result
      .filter((c) => c.phase === 'BEFORE')
      .map((c) => getFormattedContest(c, 'upcoming'));

    const presentContests = result
      .filter((c) => c.phase === 'CODING')
      .map((c) => getFormattedContest(c, 'ongoing'));

    const pastContests = result
      .filter((c) => c.phase === 'FINISHED')
      .slice(0, 10)
      .map((c) => getFormattedContest(c, 'completed'));

    const allContests = [...futureContests, ...presentContests, ...pastContests];
    res.json(allContests);
  } catch (error) {
    console.error('Error fetching CodeForces:', error);
    res.status(500).json({ error: 'Failed to fetch CodeForces contests' });
  }
});

// ==================== CodeChef API ====================
app.get('/api/codechef', async (req, res) => {
  try {
    const response = await fetch(
      'https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all'
    );
    const data = await response.json();

    const getFormattedContest = (contest, status) => ({
      id: contest.contest_code,
      platform: 'CodeChef',
      status: status,
      name: contest.contest_name,
      startTime: contest.contest_start_date_iso,
      startTimeISO: contest.contest_start_date_iso,
      duration: parseDuration(contest.contest_duration) + ' hours',
      href: `https://www.codechef.com/${contest.contest_code}`,
    });

    const futureContests = (data.future_contests || []).map((c) =>
      getFormattedContest(c, 'upcoming')
    );
    const presentContests = (data.present_contests || []).map((c) =>
      getFormattedContest(c, 'ongoing')
    );
    const pastContests = (data.past_contests || []).slice(0, 10).map((c) =>
      getFormattedContest(c, 'completed')
    );

    const allContests = [...futureContests, ...presentContests, ...pastContests];
    res.json(allContests);
  } catch (error) {
    console.error('Error fetching CodeChef:', error);
    res.status(500).json({ error: 'Failed to fetch CodeChef contests' });
  }
});

// ==================== LeetCode API ====================
app.get('/api/leetcode', async (req, res) => {
  try {
    const upcomingResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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

    let contests = [];

    if (upcomingResponse.ok) {
      const data = await upcomingResponse.json();
      contests = data.data?.allContests || [];
    }

    const getFormattedContest = (contest) => {
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
        status: status,
        name: contest.title,
        startTime: isoDate,
        startTimeISO: isoDate,
        duration: contest.duration / 3600 + ' hours',
        href: `https://leetcode.com/contest/${contest.titleSlug}`,
      };
    };

    const formattedContests = contests.map(getFormattedContest);
    res.json(formattedContests);
  } catch (error) {
    console.error('Error fetching LeetCode:', error);
    res.status(500).json({ error: 'Failed to fetch LeetCode contests' });
  }
});

// ==================== Aggregate API ====================
// Fetch contests from specific platforms or all
app.get('/api/all', async (req, res) => {
  try {
    const platforms = req.query.platforms
      ? req.query.platforms.split(',')
      : ['codeforces', 'codechef', 'leetcode'];

    const requests = [];

    if (platforms.includes('codeforces')) {
      requests.push(
        fetch(`http://localhost:${PORT}/api/codeforces`).then((r) => r.json())
      );
    }

    if (platforms.includes('codechef')) {
      requests.push(
        fetch(`http://localhost:${PORT}/api/codechef`).then((r) => r.json())
      );
    }

    if (platforms.includes('leetcode')) {
      requests.push(
        fetch(`http://localhost:${PORT}/api/leetcode`).then((r) => r.json())
      );
    }

    const results = await Promise.all(requests);

    const allContests = results.reduce((acc, curr) => {
      return acc.concat(Array.isArray(curr) ? curr : []);
    }, []);

    // Sort by start time (upcoming first)
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

    res.json(sorted);
  } catch (error) {
    console.error('Error fetching all contests:', error);
    res.status(500).json({ error: 'Failed to fetch contests' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Contest API Server running on http://localhost:${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   GET /api/codeforces - CodeForces contests`);
  console.log(`   GET /api/codechef - CodeChef contests`);
  console.log(`   GET /api/leetcode - LeetCode contests`);
  console.log(`   GET /api/all - All contests aggregated`);
  console.log(`   GET /api/all?platforms=codeforces,leetcode - Specific platforms`);
  console.log(`   GET /health - Health check`);
});
