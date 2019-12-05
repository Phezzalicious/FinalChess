const mongoose = require('mongoose');
const Client = mongoose.model('Client');
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
   Client.find({ 
    white: 



   }),
      //callback
      (err, docs) => {
          //send records back
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