const request = require('request');
const selected_port = process.env.PORT || '3000';
const apiOptions = {

  server: 'http://localhost:' + selected_port
};



const Players = [
  "Hikaru",
  "Phezzalicious",


];
const selectedPlayer = "phezzalicious";
const selectedMonth = "2019";
const selectedYear = "11";

const ParseElement = (url) => {
  const gameNum = url.slice(32);
  // https://www.chess.com/live/game/  ====== 32      4251189374
  return gameNum;

}


//render my page, give my pug some data 
const renderGamesPage = (req, res, responseBody) => {
  console.log("OK WHATS GOING ON" + responseBody);
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';

  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  responseBody.forEach(element => {
    console.log("MY FOREACH WORKS" + element.username);
  });
res.render('chess',
  {
    players: Players,
    chosenPlayers: responseBody,
    selectedMonth,
    selectedYear,
    selectedPlayer,
    message,



  }
);
};
const chessGameSelection = (req, res) => {

  const path = `/api/games/${selectedPlayer}/${selectedYear}/${selectedMonth}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      renderGamesPage(req, res, body);
    }
  );

}


const renderPlayersPage = (req, res, responseBody) => {
  let message = null;
  //console.log("SRSLY SHOW UP" + responseBody[0].username);
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';

  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  console.log("HEY THIS IS WHAT IM SENDING TO PUG: " + res.username);
  res.render('chessplayer',
    {
      chosenPlayers: responseBody,
      players: Players



    }
  );
};

const submitPlayer = (req, res) => {
  const username = req.body.selectedPlayer;
  //console.log("HELLLLLLLOOOOOOOO " + req.body.selectedPlayer);
  const path = `/api/chess/submitPlayer/${username}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
  
    }
  );

}

module.exports = {
  submitPlayer,
  chessGameSelection,
  renderGamesPage,
  renderPlayersPage

};