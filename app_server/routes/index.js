var express = require('express');
var router = express.Router();
const ctrlChess = require('../controllers/chess');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chess Games API' });
});

router.get('/chess', ctrlChess.chessGameSelection);
router.post('/chess/submitPlayer', ctrlChess.submitPlayer);

router.get('/chess/PlayerInfo', ctrlChess.submitPlayerInfo);
router.post('/chess/PlayerInfo', ctrlChess.submitPlayerInfo);

module.exports = router;
