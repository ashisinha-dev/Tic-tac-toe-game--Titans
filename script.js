  
var Board;
const human = 'O';
const AIplayer = 'X';
const winningcombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const pointer = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	Board = Array.from(Array(9).keys());
	for (var i = 0; i < pointer.length; i++) {
		pointer[i].innerText = '';
		pointer[i].style.removeProperty('background-color');
		pointer[i].addEventListener('click', switchonClick, false);
	}
}

function switchonClick(square) {
	turn(square.target.id, human)
}

function turn(squareId, player) {
	Board[squareId] = player;
	document.getElementById(squareId).innerText = player;
}