const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const clientSchema = new Schema({
    url: String,
    pgn: String,
    time_control: String,
    end_time: Number,
    rated: Boolean,
    fen: String,
    time_class: String,
    rules: String,
    white: playerSchema,
    black: playerSchema,
   
});
const playerSchema = new Schema({
    rating: Number,
    result: String,
    id: String,
    username: String
});

mongoose.model('Client', clientSchema);

//const Client = mongoose.model('Client', clientSchema);