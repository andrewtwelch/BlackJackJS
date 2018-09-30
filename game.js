var freshDeck = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
                 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
                 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
                 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD'];

var currentDeck = [];

var playerHand = [];
var dealerHand = [];

var playerMoney, win, lose, draw, currentBet, dealerRevealed;

function clearGameArea() {
  $("#gamearea").html("");
}

function buildGameArea() {
  $("<h4>").text("Dealer Hand").appendTo("#gamearea");
  $("<div>").attr("id", "dealerhand").appendTo("#gamearea");
  $("<h4>").text("Player Hand").appendTo("#gamearea");
  $("<div>").attr("id", "playerhand").appendTo("#gamearea");
}

function initialiseGame() {
  playerMoney = 50;
  win = 0;
  lose = 0;
  draw = 0;
  currentBet = 0;
  dealerRevealed = false;
}

function newGame() {
  currentBet = 0;
  dealerRevealed = false;
  playerHand = [];
  dealerHand = [];
  newDeck();
  initialDeal();
  updateDealerHand();
  updatePlayerHand();
}

function resetDeck() {
  currentDeck = freshDeck;
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
  if (!dealerRevealed) {
    var cardImage = $("<img>");
    cardImage.attr("src", getCardFilename(dealerHand[0]));
    cardImage.attr("width", "100");
    $(area).append(cardImage);
    var cardImage = $("<img>");
    cardImage.attr("src", "cards/CardBack.svg");
    cardImage.attr("width", "100");
    $(area).append(cardImage);
  }
  else {
    for (i = 0; i < dealerHand.length; i++) {
      var cardImage = $("<img>");
      cardImage.attr("src", getCardFilename(dealerHand[i]));
      cardImage.attr("width", "100");
      $(area).append(cardImage);
    }
  }
}

function updatePlayerHand() {
  var area = "#playerhand";
  $(area).html("");
  for (i = 0; i < playerHand.length; i++) {
    var cardImage = $("<img>");
    cardImage.attr("src", getCardFilename(playerHand[i]));
    cardImage.attr("width", "100");
    $(area).append(cardImage);
  }
}
