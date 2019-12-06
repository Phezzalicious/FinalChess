const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
require('./app_api/models/chess');
const Player = mongoose.model('Player');
const usernameForEndPoint = "Phezzalicious";


const writeplayerModelListToPersist = (player_list) => {
    console.log("Player_list.length "+player_list.length);
    //pull connection string from environment variable
    const uri = process.env.MONGODB_ATLAS_URL;
    const new_games_list = [];
    const new_player_list = [];
    player_list.forEach(element => {
       console.log( "playerlist each element length " + element.games.url);
       
       new_games_list.push(element.games[0]);// true
            
      
        
    });
    console.log("new games list length" + new_games_list.length + new_games_list[0].url);

    player_list.forEach(element => {
        if(element.username == usernameForEndPoint){
            if(new_player_list.length == 0){
                new_player_list.push(element);
            }
        }
       
    });
    new_games_list.forEach(element =>{
        let alreadyThere = false;
       new_player_list[0].games.forEach( gameElement => {
        if(gameElement.url == element.url){
            alreadyThere = true;
        }
       });
       if(!alreadyThere){
        new_player_list[0].games.push(element);
       }
        

    });
    console.log("new_player_list[0].games[0].url " + new_player_list[0].games[0].url );
    console.log("new_player_list[0].games[1].url " + new_player_list[0].games[1].url );
    
   
    console.log("games length" + new_player_list[0].games.length);
    console.log();

    //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => console.log(err));
   
    //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
    var promise = Player.insertMany([new_player_list[0]], (err, docs) => {
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
        username: player.black.username,
        rating: player.black.rating,
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
}







//this is receiving what i see in postman, within the games array
const parseChess = (data) => {

    const playerModelList = [];
    
    console.log("Data.length " + data.length);
    console.log("^^^ Should be Equal^^^");
    data.forEach(gameInstance => {
        if(gameInstance.white.username == usernameForEndPoint){
            playerModelList.push(createWplayerModel(gameInstance));
        }else if(gameInstance.black.username == usernameForEndPoint){
            playerModelList.push(createBplayerModel(gameInstance));
        }

    });

 console.log("Parse Chess::Playermodel list Games  Lengt" + playerModelList[0].games.length);
    console.log("Parse Chess:: PlayerModelList Length" + playerModelList.length);
    playerModelList.forEach(element => {
        
       
    });
     


    writeplayerModelListToPersist(playerModelList);

};

const task = cron.schedule('* * * * *', () => {
   

   axios.get('https://api.chess.com/pub/player/' + usernameForEndPoint + '/games/2019/11')
    .then( (response) => {
        //console.log(response.data.games);
        //console.log("This is what i also Receive: response " + response);
        console.log("response.data.games length" + response.data.games.length);
        const goodData = [];
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