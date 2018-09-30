var freshDeck = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
                 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
                 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
                 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD'];

var currentDeck = [];
var playerHand = [];
var dealerHand = [];
var playerMoney;
var win;
var lose;
var draw;
var currentBet;
var playerStand;

function clearGameArea() {
  $("#gamearea").html("");
}

function buildGameArea() {
  $("<h4>").text("Dealer Hand").attr("id", "dealertitle").appendTo("#gamearea");
  $("<div>").attr("id", "dealerhand").appendTo("#gamearea");
  $("<h4>").text("Player Hand").attr("id", "playertitle").appendTo("#gamearea");
  $("<div>").attr("id", "playerhand").appendTo("#gamearea");
  $("<div>").attr("id", "buttonarea").appendTo("#gamearea");
}

function setMoney() {
  if (currentBet > 0) {
    $("#money").text("Money: $" + playerMoney + " Current Bet: $" + currentBet);
  }
  else {
    $("#money").text("Money: $" + playerMoney);
  }
}

function setStats() {
  $("#stats").text("Wins: " + win + " Losses: " + lose + " Draws: " + draw);
}

function startGameButtons(prevGame, gameResult) {
  $("#buttonarea").html("");
  if (prevGame) {
    if (gameResult == 0) {
      $("<p>").text("Game lost.").appendTo("#buttonarea");
    }
    else if (gameResult == 1) {
      $("<p>").text("Game drawn.").appendTo("#buttonarea");
    }
    else if (gameResult == 2) {
      $("<p>").text("Game won.").appendTo("#buttonarea");
    }
  }
  if (playerMoney > 0) {
    $("<button>").text("Play").attr("onclick", "start()").appendTo("#buttonarea");
  }
  else {
    $("<p>").text("You have no money, refresh page to start again.").appendTo("#buttonarea");
    $("<button>").text("Refresh").attr("onclick", "location.reload()").appendTo("#buttonarea");
  }
}

function bettingButtons() {
  $("#buttonarea").html("");
  $("#playertitle").text("Player Hand");
  $("#dealertitle").text("Dealer Hand");
  $("#playerhand").html("");
  $("#dealerhand").html("");
  $("<button>").text("Bet 10").attr("onclick", "bet(10)").appendTo("#buttonarea");
  $("<button>").text("Bet 50").attr("onclick", "bet(50)").appendTo("#buttonarea");
  $("<button>").text("Bet 100").attr("onclick", "bet(100)").appendTo("#buttonarea");
  $("<button>").text("Bet 500").attr("onclick", "bet(500)").appendTo("#buttonarea");
  $("<button>").text("Confirm Bet").attr("onclick", "confirmBet()").appendTo("#buttonarea");
}

function hitStandButtons() {
  $("#buttonarea").html("");
  $("<button>").text("Hit").attr("onclick", "hit()").appendTo("#buttonarea");
  $("<button>").text("Stand").attr("onclick", "stand()").appendTo("#buttonarea");
}

function hitStand() {
  if (getPlayerHandValue() < 21) {
    if (!playerStand) {
      hitStandButtons();
    }
    else {
      calculateWinner();
    }
  }
  else {
    playerStand = true;
    calculateWinner();
  }
}


function start() {
  setMoney();
  bettingButtons();
}

function hit() {
  playerHand.push(getCard());
  updatePlayerHand();
  hitStand();
}

function stand() {
  playerStand = true;
  calculateWinner();
}

function winGame() {
  win += 1;
  playerMoney = playerMoney + (currentBet * 2);
  currentBet = 0;
  setMoney();
  setStats();
  startGameButtons(true, 2);
}

function loseGame() {
  lose += 1;
  currentBet = 0;
  setMoney();
  setStats();
  startGameButtons(true, 0);
}

function drawGame() {
  draw += 1;
  playerMoney = playerMoney + currentBet;
  currentBet = 0;
  setMoney();
  setStats();
  startGameButtons(true, 1);
}

function calculateWinner() {
  updateDealerHand();
  var playerValue = getPlayerHandValue()
  var dealerValue = getDealerHandValue()

  if (playerValue > 21) {
    loseGame();
  }
  else {
    while (dealerValue < 17) {
      dealerHand.push(getCard());
      updateDealerHand();
      dealerValue = getDealerHandValue()
    }

    if (dealerValue > 21) {
      winGame();
    }
    else if (dealerValue > playerValue) {
      loseGame();
    }
    else if (dealerValue < playerValue) {
      winGame();
}
    else if (dealerValue == playerValue) {
      drawGame();
}
  }
}

function bet(number) {
  if (playerMoney >= number) {
    playerMoney -= number;
    currentBet = currentBet + number;
    setMoney();
  }
}

function confirmBet() {
  newGame();
  hitStand();
}

function getPlayerHandValue() {
  var value = 0;
  for (i = 0; i < playerHand.length; i++) {
    var card = playerHand[i];
    if (card.charAt(0) == "T") {
      value += 10;
    }
    else if (card.charAt(0) == "J") {
      value += 10;
    }
    else if (card.charAt(0) == "Q") {
      value += 10;
    }
    else if (card.charAt(0) == "K") {
      value += 10;
    }
    else if (card.charAt(0) == "A") {
      value += 11;
      }
    }
    else {
      value += Number(card.charAt(0));
    }
  }
  for (i = 0; i < playerHand.length; i++) {
    var card = playerHand[i];
    if ((card.charAt(0) == "A") && (value > 21)) {
     value +-= 10;
    }
  }
  return value;
}

function getDealerHandValue() {
  var value = 0;
  if (!playerStand) {
    var card = dealerHand[0];
    if (card.charAt(0) == "T") {
      value += 10;
    }
    else if (card.charAt(0) == "J") {
      value += 10;
    }
    else if (card.charAt(0) == "Q") {
      value += 10;
    }
    else if (card.charAt(0) == "K") {
      value += 10;
    }
    else if (card.charAt(0) == "A") {
      value += 11;
      }
    }
    else {
      value += Number(card.charAt(0));
    }
  }
  else {
    for (i = 0; i < dealerHand.length; i++) {
      var card = dealerHand[i];
      if (card.charAt(0) == "T") {
        value += 10;
      }
      else if (card.charAt(0) == "J") {
        value += 10;
      }
      else if (card.charAt(0) == "Q") {
        value += 10;
      }
      else if (card.charAt(0) == "K") {
        value += 10;
      }
      else if (card.charAt(0) == "A") {
        value += 11;
        }
      }
      else {
        value += Number(card.charAt(0));
      }
    }
    for (i = 0; i < playerHand.length; i++) {
      var card = playerHand[i];
      if ((card.charAt(0) == "A") && (value > 21)) {
       value +-= 10;
      }
    }
  }
  return value;
}

function initialiseGame() {
  playerMoney = 500;
  win = 0;
  lose = 0;
  draw = 0;
  currentBet = 0;
  playerStand = false;
}

function newGame() {
  playerStand = false;
  playerHand = [];
  dealerHand = [];
  $("#dealertitle").text("Dealer Hand");
  $("#playertitle").text("Player Hand");
  newDeck();
  initialDeal();
  updateDealerHand();
  updatePlayerHand();
}

function resetDeck() {
  currentDeck = freshDeck.slice();
}

function shuffleDeck() {
  currentDeck.sort(function(a,b){return 0.5 - Math.random()});
}

function newDeck() {
  resetDeck();
  shuffleDeck();
}

function getCard() {
  var card = currentDeck.pop();
  return card;
}

function initialDeal() {
  for (var i = 0; i < 2; i++) {
    playerHand.push(getCard());
    dealerHand.push(getCard());
  }
}

function getCardFilename(card) {
  var string = "cards/" + card + ".svg";
  return string;
}

function updateDealerHand() {
  var area = "#dealerhand";
  $(area).html("");
  if (!playerStand) {
    var cardImage = $("<img>");
    cardImage.attr("src", getCardFilename(dealerHand[0]));
    cardImage.attr("height", "150");
    $(area).append(cardImage);
    var cardImage = $("<img>");
    cardImage.attr("src", "cards/CardBack.svg");
    cardImage.attr("height", "150");
    $(area).append(cardImage);
  }
  else {
    for (i = 0; i < dealerHand.length; i++) {
      var cardImage = $("<img>");
      cardImage.attr("src", getCardFilename(dealerHand[i]));
      cardImage.attr("height", "150");
      $(area).append(cardImage);
    }
  }
  $("#dealertitle").text("Dealer Hand - " + getDealerHandValue());
}

function updatePlayerHand() {
  var area = "#playerhand";
  $(area).html("");
  for (i = 0; i < playerHand.length; i++) {
    var cardImage = $("<img>");
    cardImage.attr("src", getCardFilename(playerHand[i]));
    cardImage.attr("height", "150");
    $(area).append(cardImage);
  }
  $("#playertitle").text("Player Hand - " + getPlayerHandValue());
}
