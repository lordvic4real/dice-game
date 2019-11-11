//declare variables
var scores, roundScore, activePlayer, isGamePlaying;

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0; //based on zero-based index of scores array

init();

//The document object gives us access to the DOM
//set the current score to the dice random integer
// document.querySelector("#current-0").textContent = dice;
//textContent sets plain text. innerHTML can set HTML tags

// dice = Math.floor(Math.random() * 6) + 1;
// document.querySelector("#current-" + activePlayer).textContent = dice;

//hide the dice on page load
// document.querySelector(".dice").style.display = "none";

// //reset scores to 0 on page load
// document.getElementById("score-0").textContent = "0";
// document.getElementById("score-1").textContent = "0";
// document.getElementById("current-0").textContent = "0";
// document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isGamePlaying) {
    //generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display the result
    var diceElement = document.querySelector(".dice");
    diceElement.style.display = "block";
    diceElement.src = "dice-" + dice + ".png";

    //update the round score if the rolled number was not a 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //switch to the next player
      //ternary operator
      // activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      // //reset the round score
      // roundScore = 0;

      // //reset current scores visually
      // document.getElementById("current-0").textContent = "0";
      // document.getElementById("current-1").textContent = "0";

      // //switch active class
      // // document.querySelector(".player-0-panel").classList.remove("active");
      // // document.querySelector(".player-1-panel").classList.add("active");
      // document.querySelector(".player-0-panel").classList.toggle("active");
      // document.querySelector(".player-1-panel").classList.toggle("active");

      // //hide the dice again
      // document.querySelector(".dice").style.display = "none";

      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isGamePlaying) {
    //add current score to player's global score
    scores[activePlayer] += roundScore;
    //update the UI to reflect the same
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      //hide the dice again
      document.querySelector(".dice").style.display = "none";
      //remove the active player class
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      //set game playing to false
      isGamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //switch to the next player
  //ternary operator
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //reset the round score
  roundScore = 0;

  //reset current scores visually
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //switch active class
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //hide the dice again
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  //reset players scores
  scores = [0, 0];
  //reset active player
  activePlayer = 0;
  //reset round score
  roundScore = 0;

  document.querySelector(".dice").style.display = "none";

  //reset scores to 0 on page load
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

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

  //set game playing to true
  isGamePlaying = true;
}
