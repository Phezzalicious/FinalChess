const mongoose = require('mongoose');
const Player = mongoose.model('Player');

const formData = (req, res) => {

 
  Player.findOne({ username: req.params.player},
    (err, docs) => {
      if (!err) {
        //res.send(docs);
      }
      res.send(docs);
      
    }
  );
}

//    '/games/:player/:year/:month'
const playerData = (req, res) => {
  const playerName = req.params.player;
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  let msg = "";

  Player.find({},
    (err, docs) => {
      if (!err) {
        //res.send(docs);
      }
      res.send(docs);
    }
  );
}


module.exports = {

  playerData,
 formData

};