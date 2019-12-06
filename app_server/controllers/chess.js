const request = require('request');
const selected_port = process.env.PORT || '3000';
const apiOptions = {

  server: 'http://localhost:' + selected_port
};



const Players = [
"hikaru",
"phezzalicious",


];
const selectedPlayer = "phezzalicious";
const selectedMonth = "2019";
const selectedYear = "11";


const chessGameSelection = (req, res) => {
    console.log(req.body);

    chessArrivals(req, res);
}

const chessArrivals = (req, res) => {
    const path = `/api/games/${selectedPlayer}/${selectedYear}/${selectedMonth}`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        console.log("Length of body: " + body.length);
        let data = [];
        
         
            data = body;
       
        console.log("data = body;   " + data.length);
        renderGamesPage(req, res, data);
      }
    );
};
  
const renderGamesPage = (req, res, responseBody) => {
    let message = null;
    console.log("renderGamesPage received responseBody as:  " + responseBody.length);
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
     
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }

    res.render('chess', 
        {
          players: Players,
          chosenPlayers: responseBody,
          selectedMonth,
          selectedYear,
          selectedPlayer,
          message,

            //airports: Airports,
            //clients: responseBody,
            //message,
            //selectedAirport
        }
    );
};

  module.exports = {
    chessArrivals,
    chessGameSelection,
    renderGamesPage,
   
  };