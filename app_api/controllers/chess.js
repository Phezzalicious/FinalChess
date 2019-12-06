const mongoose = require('mongoose');
const Player = mongoose.model('Player');
/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
const player = (req, res) => {
  console.log(req.params.player);
    const player = req.params.player;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
   //query here
   Player.find({ 
   
      username: player

   }),
      //callback
      (err, docs) => {
          //send records back
          let records = [];
          let isItThere = false;
          docs.forEach(element => {
           records.forEach(record => {
            if(record.games.url == element.game.url){
              isItThere = true;
            }
           });
           if(isItThere){
            records.push(element);
           }
                        
          });
          if(!err){
              res.send(docs);
          }else{
              res.send(err);
              console.log(err);
          }
        }
    
    
}





module.exports = {

  player,

};