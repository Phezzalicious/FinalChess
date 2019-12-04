const express = require('express');
const router = express.Router();
const ctrlChess = require('../controllers/chess');

router
  .route('/api/games/:player/:year/:month')
  .get(ctrlChess.player);

module.exports = router;