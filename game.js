var freshDeck = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
                 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
                 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
                 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD'];

var currentDeck = [];

var playerHand = [];
var dealerHand = [];

var playerMoney, win, lose, draw, currentBet, dealerRevealed;

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
  for (; i < 3;) {
    playerHand.push(getCard());
    dealerHand.push(getCard());
  }
}
