const mongoose = require('mongoose');
const Player = mongoose.model('Player');
/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
const player1 = (req, res) => {
  console.log(req.params.player);
    const player = req.params.player;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
   //query here
   Player.findOne({
     username: player
   }),
      //callback
      (err, docs) => {
        console.log(docs);
          //send records back
          let records = [];
          let isItThere = false;
          docs.forEach(element => {
           records.forEach(record => {
            console.log("WHY YOU NO SHOW UP?????" + record.games.url);
            if(record.games.url == element.game.url){
              isItThere = true;
            }
           });
           if(isItThere){
            records.push(element);
           }
                        
          });
          if(!err){
              res.send(records);
          }else{
              res.send(err);
              console.log(err);
          }
        }
    
    
}





module.exports = {

  player1,

};