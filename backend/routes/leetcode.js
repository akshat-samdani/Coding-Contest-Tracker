const express = require('express');
const router = express.Router();
const { getLeetcodeContests } = require('../controllers/leetcodeController');
const { handleError } = require('../utils/errorHandler');

/**
 * GET /api/leetcode
 * Fetch all LeetCode contests
 */
router.get('/', async (req, res) => {
  try {
    const contests = await getLeetcodeContests();
    res.json(contests);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
