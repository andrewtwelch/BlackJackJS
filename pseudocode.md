Shuffle new deck
Initial Deal
Bet
Hit/Stand
if Hit
	Deal 1 card to player
	if player hand value > 21
		Player loses
	Choose Again
else
Reveal second dealer card
While dealer hand value < 17
	Deal 1 card to dealer
If dealer hand value > 21
	Player wins
	Player Money += bet*2
If dealer hand value > player hand value
	Player loses
Elif dealer hand value = player hand value
	Player draws
	Player money += bet
Else
	Player wins
	Player Money += bet*2
Reset necessary game values
