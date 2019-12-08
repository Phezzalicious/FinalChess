const mongoose = require('mongoose');
const Player = mongoose.model('Player');

/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
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
// //     /games/:player/
// const otherPlayerData = (req, res) => {
//   Player.find({},
//     (err, docs) => {
//       if (!err) {
//         docs.forEach((stuff) => {
//           console.log(stuff.username);
//           msg += stuff.username + "\n";
//           stuff.games.forEach((game) => {
//             console.log("\t" + game.url);
//             msg += "\t" + game.url + "\n";
//           })
//         });

//         res.send(msg);

//       }
//     }
//   );
// }

module.exports = {

  playerData,
 

};