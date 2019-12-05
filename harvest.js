const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log(process.env.MONGODB_ATLAS_URL) 
require('./app_api/models/chess');
const Player = mongoose.model('Player');
const usernameForEndPoint = "Phezzalicious";


const writeplayerModelListToPersist = (player_list) => {
    console.log("Player_list.length "+player_list.length);
    //pull connection string from environment variable
    const uri = process.env.MONGODB_ATLAS_URL;
    const new_player_list = [];
    player_list.forEach(element => {
      let myBool = true;
        new_player_list.forEach(playerInList => {
            if(element.username == playerInList.username){
                if(!element.username == usernameForEndPoint){
                    myBool = false;
                }
                
            }

        });
      if(myBool){
        new_player_list.push(element);
      }else{
          new_player_list.forEach(playerInList => {
            playerInList.games.push(element.games)
          });
          
      }
    });

    //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => console.log(err));
   
    //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
    var promise = Player.insertMany(new_player_list, (err, docs) => {
        if(!err){
            console.log(`INSERTED: ${new_player_list.length} records`);
        }else{
            console.log(err);
        }
    });
}


const createWplayerModel = (player) => {
    return {
        username: player.white.username,
        rating: player.white.rating,
        games: [createGameModel(player)],  
    }
};
const createBplayerModel = (player) => {
    return {
        username: player.white.username,
        rating: player.white.rating,
        games: [createGameModel(player)],  
    }
};
const createGameModel = (player) => {
    return {
            url : player.url,
            pgn : player.pgn,
            timecontrol : player.time_control,
            endtime : player.end_time,
            rated : player.rated,
            time_class : player.time_class,
            rules : player.rules,
            Whiteresult: player.white.result,
            BlackResult: player.black.result    
       
    }
};





//this is receiving what i see in postman, within the games array
const parseChess = (data) => {

    const playerModelList = [];

 
    console.log("Data,length " + data.length);

    data.forEach(element => {
        console.log("USER" + element.white.username + element.black.username);
        if(element.white.username == usernameForEndPoint){ 
            console.log("element length " + element.length);
            playerModelList.push(createWplayerModel(element));
        }
        if (element.black.username == usernameForEndPoint){
            playerModelList.push(createBplayerModel(element));
        }
    });
console.log("playerModelList length " + playerModelList.length)
    console.log("WRITING TO DB " + new Date().toTimeString());  
    writeplayerModelListToPersist(playerModelList);

};

const task = cron.schedule('* * * * *', () => {
   

   axios.get('https://api.chess.com/pub/player/' + usernameForEndPoint + '/games/2019/11')
    .then( (response) => {
        //console.log(response.data.games);
        //console.log("This is what i also Receive: response " + response);
        console.log("responsedatagames length" + response.data.games.length);
        parseChess(response.data.games);
    })
    .catch( (error) => {
        console.log(error);
    });

    },{
        scheduled: false
    }
);

module.exports = task;