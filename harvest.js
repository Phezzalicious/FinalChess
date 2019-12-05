const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/chess');
const Player = mongoose.model('Player');


const writeplayerModelListToPersist = (player_list) => {

    //pull connection string from environment variable
    const uri = process.env.MONGODB_ATLAS_URL;

    //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => console.log(err));
   
    //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
    var promise = player.insertMany(player_list, (err, docs) => {
        if(!err){
            console.log(`INSERTED: ${player_list.length} records`);
        }else{
            console.log(err);
        }
    });
}

const createplayerModel = (player) => {
    return {
        username: player.white.username,
        rating: player.white.rating,
        games: [{
            url : player.url,
            pgn : player.pgn,
            timecontrol : player.time_control,
            endtime : player.end_time,
            rated : player.rated,
            time_class : player.time_class,
            rules : player.rules,
            Whiteresult: player.white.result,
            BlackResult: player.black.result

        }],
        
       
       
    }
};





const parseChess = (data) => {

    const playerModelList = [];

    let start = false;

    data.forEach(element => {
    playerModelList.push(createplayerModel(element));
        });
   

    console.log("WRITING TO DB " + new Date().toTimeString());    
    writeplayerModelListToPersist(playerModelList);

};

const task = cron.schedule('*/2 * * * *', () => {

   axios.get('https://api.chess.com/pub/player/phezzalicious/games/2019/11')
    .then( (response) => {
        //console.log(response.data.games);
        let newData = [];
        response.data.games.forEach(element => {
        {

     }
        });
        //console.log("This is what i also Receive: response " + response);
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