const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/chess');
const Player = mongoose.model('Player');
const usernameForEndPoint = "Hikaru";
  

//------------Database interactions ----------\\
const queryMethod = (player_list) => {
    //cleanDataBase(player_list);
    console.log("games[5] user: " + player_list.games[5].blackUsername);
    Player.findOneAndDelete({ 'username': player_list.username }, (err, whatIFound)=> {
        console.log(player_list.username);
        console.log("This is my object" + whatIFound);
    });
    Player.create(player_list, (err, docs) => {
        if (!err) {
            console.log(`INSERTED: ${player_list.username}'s records`);
        } else {
            console.log(err);
        }
    });
}
const writeplayertoDataBase = (player_list) => {
    console.log("WriteplayerModeListToPersist: ");
    const uri = process.env.MONGODB_ATLAS_URL;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.log(err));
    queryMethod(player_list);
};

// ----------------- MODELS -------------------\\

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

        url: player.url,
        pgn: player.pgn,
        timecontrol: player.time_control,
        endtime: player.end_time,
        rated: player.rated,
        time_class: player.time_class,
        rules: player.rules,
        whiteResult: player.white.result,
        blackResult: player.black.result,
        whiteUsername: player.white.username,
        blackUsername: player.black.username

    }
}
//clean the data 
const cleanChess = (player_list) => {
    //.games[o] attached to each object
    const games_list = [];
    const new_player = [];
    console.log("cleanChess: ");
    //every player pushes his game to the list
    player_list.forEach(element => {
        games_list.push(element.games[0]);// true

    });
    console.log("gameslist length, games list[0].games.url: " + games_list.length + " " + games_list[0].url);

    //place my object i want INTO AN ARRAY..... ONE TIME
    player_list.forEach(element => {
        if (element.username == usernameForEndPoint) {
            if (!new_player.length > 0) {
                new_player.push(element);
            }
        }

    });

    games_list.forEach(element => {
        let alreadyThere = false;
        new_player[0].games.forEach(gameElement => {
            if (gameElement.url == element.url) {
                alreadyThere = true;
            }
        });
        if (!alreadyThere) {
            new_player[0].games.push(element);
        }
    });
    const formatted_player_list = new_player[0];
    writeplayertoDataBase(formatted_player_list);
}
//shape the data
const shapeChess = (data) => {
    console.log("I am in Parse Chess:")
    const player_list = [];
    //
    data.forEach(gameInstance => {
        if (gameInstance.white.username == usernameForEndPoint) {
            player_list.push(createWplayerModel(gameInstance));
        } else if (gameInstance.black.username == usernameForEndPoint) {
            player_list.push(createBplayerModel(gameInstance));
        }

    });

    cleanChess(player_list);
};

//----------- GET Data------------\\
const task = cron.schedule('* * * * *', () => {

    
    axios.get('https://api.chess.com/pub/player/' + usernameForEndPoint + '/games/2019/11')
        .then((response) => {

            console.log("response.data.games Length: " + response.data.games.length);

            shapeChess(response.data.games);
        })
        .catch((error) => {
            console.log(error);
        });

}, {
    scheduled: false
}
);

module.exports = task;