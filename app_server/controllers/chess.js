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
const ParseElement = (url) => {

  console.log("FOR ME PARSE ELEMENT " + url);
  const gameID = "";

  return url;

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
  const gameNum = [];
  responseBody.forEach(player => {
    player.games.forEach(element => {
      gameNum.push(element.url);
    });

  });
  gameNum.forEach(element => {
    element = ParseElement(element.url);
  });
  res.render('chess',
    {
      players: Players,
      chosenPlayers: responseBody,
      selectedMonth,
      selectedYear,
      selectedPlayer,
      message,
      gameNum


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
  console.log("SRSLY SHOW UP" + req.body);
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';

  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  res.render('chessplayer',
    {



    }
  );
};
/**
 * 
 * { (req, res) => {
  const username = req.body.username
  //...
  res.end()
})} req 
 * 
 */
const submitPlayer = (req, res) => {
  const path = `/submitPlayer`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',

  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
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