var express = require('express');
var router = express.Router();
const ctrlChess = require('../controllers/chess');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chess Games' });
});



/* doing arrivals the server-side (Express and Pug) way */
router.get('/chess', ctrlChess.chessGameSelection);

router.post('/submitPlayer/:playername', ctrlChess.submitPlayer)



module.exports = router;
