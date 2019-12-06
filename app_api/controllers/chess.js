const mongoose = require('mongoose');
const Player = mongoose.model('Player');

/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
const player1 = (req, res) => {
  console.log("player1: " + req.params.player);
  const playerName = req.params.player;
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  let msg = "";

  Player.find({},
    (err, docs) => {
      if(!err){
        docs.forEach((stuff) => {
          console.log(stuff.username);
          msg += stuff.username + "\n";
          stuff.games.forEach((game) => {
            console.log("\t" + game.url);
            msg += "\t" + game.url + "\n";
          })
        });

        res.send(msg);

      }
    }
  );

  //query here
  // Player.findOne({
  //   username: playerName
  // }), (err, docs) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("THIS IS DOCS: " + docs);
  //   //send records back
  //   let records = [];
  //   let isItThere = false;
  //   docs.forEach(element => {
  //     records.forEach(record => {

  //       if (record.games.url == element.game.url) {
  //         isItThere = true;
  //       }
  //     });
  //     if (isItThere) {
  //       records.push(element);
  //     }

  //   });
  //   if (!err) {
  //     res.send(records);
  //   } else {
  //     res.send(err);
  //     console.log(err);
  //   }
  // }
}


module.exports = {

  player1,

};