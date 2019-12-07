const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const gameSchema = new Schema({
    url: String,
    pgn: String,
    time_control: String,
    end_time: Number,
    rated: Boolean,
    time_class: String,
    rules: String,
    whiteResult: String,
    blackResult: String,
    whiteUsername: String,
    blackUsername: String
    
   
});
const playerSchema = new Schema({
    username: String,
    rating: Number,
    games: [gameSchema]
});


mongoose.model('Player', playerSchema);

//const Client = mongoose.model('Client', clientSchema);