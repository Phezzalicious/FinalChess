const express = require('express');
const router = express.Router();
const ctrlChess = require('../controllers/chess');

router
  .route('/games/:player/:year/:month')
  .get(ctrlChess.player1);

module.exports = router;