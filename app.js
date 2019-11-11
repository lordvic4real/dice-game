/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 20 points on GLOBAL score wins the game

*/
// declare variables
var scores, roundScore, currentPlayer, isGamePlaying;

start();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isGamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceElement = document.querySelector(".dice");
    diceElement.style.display = "block";
    diceElement.src = "dice-" + dice + ".png";

    if (dice !== 1) {
      roundScore += dice; // roundScore = roundScore + dice;
      document.querySelector(
        "#current-" + currentPlayer
      ).textContent = roundScore;
    } else {
      //   if(currentPlayer === 0) {
      //       currentPlayer = 1;
      //   } else if(currentPlayer === 1) {
      //       currentPlayer = 0
      //   }

      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isGamePlaying) {
    //add current score to player's global score
    scores[currentPlayer] += roundScore;
    //show it in the UI
    document.querySelector("#score-" + currentPlayer).textContent =
      scores[currentPlayer];
    //check if player has won the game
    if (scores[currentPlayer] >= 20) {
      document.querySelector("#name-" + currentPlayer).textContent = "Winner";
      //hide th dice
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.add("winner");
      isGamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  roundScore = 0;

  //hide the dice again;
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
}

function start() {
  //assign values to variables
  scores = [0, 0];
  roundScore = 0;
  currentPlayer = 0;
  isGamePlaying = true;

  //resetting scores
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector(".dice").style.display = "none";

  //reset player names

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  //remove the winner player class and add the active class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  //add active to player 1
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-new").addEventListener("click", start);
