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

function Check()
{
	 if (document.getElementById('r7').checked) {
        document.getElementById('ifComp').style.visibility = 'visible';
    }
    else{ document.getElementById('ifComp').style.visibility = 'hidden';
          document.getElementById('ifNo').style.visibility = 'hidden';
          document.getElementById('r9').checked=false;
         }
}

function yesnoCheck()
{
	 if (document.getElementById('r7').checked && document.getElementById('r9').checked) {
        document.getElementById('ifNo').style.visibility = 'visible';
    }
    else document.getElementById('ifNo').style.visibility = 'hidden';
}

const pointer = document.querySelectorAll('.cell');
startGame();


function startGame() {
	document.getElementById("r1").disabled = true;
	document.getElementById("r2").disabled = true;
	document.getElementById("r3").disabled = true;
	document.getElementById("r4").disabled = true;
	document.getElementById("r5").disabled = true;
	document.querySelector(".endgame").style.display = "none";
	Board = Array.from(Array(9).keys());
	for (var i = 0; i < pointer.length; i++) {
		pointer[i].innerText = '';
		pointer[i].style.removeProperty('background-color');
		pointer[i].addEventListener('click', switchonClick, false);
	}
  
   if(document.getElementById("r2").checked == true)
    { var p=randomNumber(0, 8) 
      Board[p] = AIplayer;
	  document.getElementById(p).innerText = AIplayer;
    }
 
}
 


function switchonClick(square) {
	   if(!checkWin(Board,AIplayer) && typeof Board[square.target.id]=='number' )
		{ turn(square.target.id, human)
		  if (!checkTie()&&!checkWin(Board,human)) turn(bestSpot(), AIplayer);
	    }
}

function turn(squareId, player) {
	Board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(Board, player)
	if (gameWon) gameOver(gameWon)
	checkTie();
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winningcombinations.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}

	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winningcombinations[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human ? "blue" : "red";
	}
	for (var i = 0; i < pointer.length; i++) {
		pointer[i].removeEventListener('click', switchonClick, false);
	}
  

  declareWinner(gameWon.player == human ? "You win!" : "You lose.");
      document.getElementById("r1").removeAttribute("disabled"); 
      document.getElementById("r2").removeAttribute("disabled"); 
      document.getElementById("r3").removeAttribute("disabled"); 
      document.getElementById("r4").removeAttribute("disabled"); 
      document.getElementById("r5").removeAttribute("disabled");   
	
}

function declareWinner(who) {
	document.querySelector(" .endgame").style.display = "block";
	document.querySelector(" .endgame .text").innerText = who;
}

function emptySquares() {
	return Board.filter(s => typeof s == 'number');
}




function checkTie() {
	if (!checkWin(Board,human) && !checkWin(Board,AIplayer) && emptySquares().length == 0) {
		for (var i = 0; i < pointer.length; i++) {
			pointer[i].style.backgroundColor = "green"; 
			pointer[i].removeEventListener('click', switchonClick, false);
		}

      document.getElementById("r1").removeAttribute("disabled"); 
      document.getElementById("r2").removeAttribute("disabled"); 
      document.getElementById("r3").removeAttribute("disabled"); 
      document.getElementById("r4").removeAttribute("disabled"); 
      document.getElementById("r5").removeAttribute("disabled"); 
	  declareWinner("Tie Game!");
		return true;
	}
	return false;
}

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  


function bestSpot() {
	

  if(document.getElementById("r3").checked == true)
   {
	var available=emptySquares(Board);
	return available[randomNumber(0,available.length-1)];
   }
  

  else if(document.getElementById("r5").checked == true)
        {     
          return minimax(Board, AIplayer).index;
        }
 
  else
   { 
   	 if(randomNumber(0,100)<=30)
	    {
	  	var available=emptySquares(Board);
	    return available[randomNumber(0,available.length-1)];
        }

      else
        {     
          return minimax(Board, AIplayer).index;
        }

   }

}


function minimax(newBoard, player,alpha=-(Number.MIN_VALUE),beta=Number.MAX_VALUE) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, human)) {
		return {score: -10};
	} else if (checkWin(newBoard, AIplayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	

  if (player == AIplayer) {
			var moves = [];
			var bestMove;
			var bestScore = -10000;
	     for (var i = 0; i < availSpots.length; i++) {
		    var move = {};
		    move.index = newBoard[availSpots[i]];
		    newBoard[availSpots[i]] = player;
			var result = minimax(newBoard, human,alpha,beta);
			move.score = result.score;
			newBoard[availSpots[i]] = move.index;
            moves.push(move);
		    if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
				alpha=(bestScore>alpha)?bestScore:alpha;
					if(beta<=alpha){
						break;
					}
			}
		}
  
     return moves[bestMove];

	} else {
			var bestMove; 
			var moves = [];
			var bestScore = 10000;
	     for (var i = 0; i < availSpots.length; i++) {
		       var move = {};
		       move.index = newBoard[availSpots[i]];
		       newBoard[availSpots[i]] = player;
			   var result = minimax(newBoard, AIplayer,alpha,beta);
			   move.score = result.score;
			   newBoard[availSpots[i]] = move.index;
               moves.push(move);
		    if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
				beta=(bestScore<beta)?bestScore:beta;
				if(beta<=alpha){
					break;
				}
			}
		}
	
	 return moves[bestMove];	
	}

}
	
