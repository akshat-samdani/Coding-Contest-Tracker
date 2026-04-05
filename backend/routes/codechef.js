const express = require('express');
const router = express.Router();
const { getCodechefContests } = require('../controllers/codechefController');
const { handleError } = require('../utils/errorHandler');

/**
 * GET /api/codechef
 * Fetch all CodeChef contests
 */
router.get('/', async (req, res) => {
  try {
    const contests = await getCodechefContests();
    res.json(contests);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
