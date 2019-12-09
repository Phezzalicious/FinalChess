const request = require('request');
const selected_port = process.env.PORT || '3000';
const apiOptions = {

  server: 'http://localhost:' + selected_port
};



const Players = [
  "Hikaru",
  "Phezzalicious",
  "abhijeetgupta1016",
  "Izoria123"



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
  console.log("HEY THIS IS WHAT IM SENDING TO PUG: " + responseBody.username);
  res.render('chessplayer',
    {
      chosenPlayer: responseBody,
      players: Players,
      username: responseBody.username



    }
  );
};

const submitPlayer = (req, res) => {
  const username = req.body.selectedPlayer;

  const path = `/api/chess/submitPlayer/${username}`;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: {}
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      renderPlayersPage(req, res, body)
    }
  );

}
const MakePlayerInfo = (responseBody) => {

  //OVERALL WIN-LOSS-DRAW WHITE WIN-LOSS-DRAW BLACK WIN-LOSS-DRAW
  let myNumbers = [];

  //theres 100% a better way to do this Math (for my pug template)
  let totalGames = 0;
  let whiteWins = 0;
  let blackWins = 0;
  let drawWins = 0;
  let whiteGames = 0;
  let blackGames = 0;
  let WdrawWins = 0;
  let BdrawWins = 0;
  let ourUserName = responseBody.username;
  responseBody.games.forEach(element => {
    totalGames += 1;
    if (element.whiteResult == "repetition" || element.blackResult == "agreed") {
      drawWins += 1;
      if (ourUserName == element.whiteUsername) {
        WdrawWins += 1;
      } else {
        BdrawWins += 1;
      }
    }


    if (element.whiteUsername == ourUserName) {
      whiteGames += 1;
      if (element.whiteResult == "win") {
        whiteWins += 1;
      }
    } else {
      blackGames += 1;
      if (element.blackResult == "win") {
        blackWins += 1;
      }

    }
  });
  //overall
  myNumbers.push((whiteWins + blackWins) / totalGames.toString());
  myNumbers.push((totalGames - drawWins - whiteWins - blackWins) / totalGames.toString());
  myNumbers.push(drawWins / totalGames.toString());
  //white
  myNumbers.push(whiteWins / whiteGames.toString());
  myNumbers.push((whiteGames - WdrawWins - whiteWins) / whiteGames.toString());
  myNumbers.push((WdrawWins / whiteGames).toString());
  myNumbers.push((whiteWins + blackWins) / totalGames.toString());
  //black
  myNumbers.push(blackWins / blackGames.toString());
  myNumbers.push((blackGames - BdrawWins - blackWins) / blackGames.toString());
  myNumbers.push(BdrawWins / blackGames.toString());
  //to send over pretty
  let myFixedNumbers = [];

  myNumbers.forEach(number => {

    if (number.toString().slice(2, 3) == '0') {
      number = number.toString().slice(3, 4) + ' %';
    } else {
      number = number.toString().slice(2, 4) + ' %';
    }


    myFixedNumbers.push(number);

  });

  return myFixedNumbers;
}
const renderPlayersInfoPage = (req, res, responseBody) => {
  let message = null;

  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';

  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  let myNumbers = MakePlayerInfo(responseBody);

  res.render('chessplayerinfo',
    {
      chosenPlayer: responseBody,
      players: Players,
      username: responseBody.username,
      Numbers: myNumbers



    }
  );
};
const submitPlayerInfo = (req, res) => {
  let username = req.body.selectedPlayer;
  if (req.body.selectedPlayer == null) {
    username = 'Hikaru';
  }

  const path = `/api/chess/submitPlayer/${username}`;
  console.log(`${apiOptions.server}${path}`);
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "POST",
    json: {}
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      renderPlayersInfoPage(req, res, body)
    }
  );

}


module.exports = {
  submitPlayer,
  chessGameSelection,
  submitPlayerInfo

};