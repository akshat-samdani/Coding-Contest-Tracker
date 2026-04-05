const express = require('express');
const router = express.Router();
const { getCodeforcesContests } = require('../controllers/codeforcesController');
const { handleError } = require('../utils/errorHandler');

/**
 * GET /api/codeforces
 * Fetch all CodeForces contests
 */
router.get('/', async (req, res) => {
  try {
    const contests = await getCodeforcesContests();
    res.json(contests);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
