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
    
  const path = `/api/games/${selectedPlayer}/${selectedYear}/${selectedMonth}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      renderGamesPage(req, res, body);
    }
  );
    
}


  
const renderGamesPage = (req, res, responseBody) => {
  let message = null;
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
const renderPlayersPage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
   
  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  res.render('chessplayer', 
      {
        players: Players,
       
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
const submitPlayer = (req, res) =>{
  const path = `/api/games/${selectedPlayer}/${selectedYear}/${selectedMonth}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      renderPlayersPage(req, res, body);
    }
  );

}

  module.exports = {
   submitPlayer,
    chessGameSelection,
    renderGamesPage,
    renderPlayersPage
   
  };