const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/chess');
const Client = mongoose.model('Client');


const writeClientModelListToPersist = (client_list) => {

    //pull connection string from environment variable
    const uri = process.env.MONGODB_ATLAS_URL;

    //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .catch(err => console.log(err));
   
    //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
    var promise = Client.insertMany(client_list, (err, docs) => {
        if(!err){
            console.log(`INSERTED: ${client_list.length} records`);
        }else{
            console.log(err);
        }
    });
}

const createClientModel = (client) => {
    return {
        url : client.url,
        pgn : client.pgn,
        timecontrol : client.time_control,
        endtime : client.end_time,
        rated : client.rated,
        time_class : client.time_class,
        rules : client.rules,
        white: [{
            rating: client.white.rating,
            result: client.white.result,
            username: client.white.username
        }],
        black: [{
            rating: client.black.rating,
            result: client.black.result,
            username: client.black.username

        }],       
    }
};





const parseChess = (data) => {

    const clientModelList = [];

    let start = false;

    data.forEach(element => {
    clientModelList.push(createClientModel(element));
        });
   

    console.log("WRITING TO DB " + new Date().toTimeString());    
    writeClientModelListToPersist(clientModelList);

};

const task = cron.schedule('*/2 * * * *', () => {

   axios.get('https://api.chess.com/pub/player/phezzalicious/games/2019/11')
    .then( (response) => {
        //console.log(response.data.games);
        response.data.games.forEach(element => {
            //console.log(element.white.result);
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