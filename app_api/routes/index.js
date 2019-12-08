const express = require('express');
const router = express.Router();
const ctrlChess = require('../controllers/chess');

router
  .route('/games/:player/:year/:month')
  .get(ctrlChess.playerData);
// router
//   .route('/games/:player')
//   .get(ctrlChess.otherPlayerData);
router
  .route('/chess/submitPlayer/:player')
  .post(ctrlChess.formData)

module.exports = router;