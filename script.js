//initializing variables:
var Board;
const human = 'O';
const AIplayer = 'X';
const huPlayer1 = 'O';
const huPlayer2 = 'X';

//These are the winning combinations of the table cells for the game:
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
const winningcombinations2=
[
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [9, 13, 17, 21],
    [10, 14, 18, 22],
    [11, 15, 19, 23],
    [12, 16, 20, 24],
    [9, 14, 19, 24],
    [12, 15, 18, 21],
  ]

//To make certain options appear only when user chooses to play with the computer:
function Check() {
    if (document.getElementById('r7').checked && document.getElementById('r13').checked==false) {
        document.getElementById('ifComp').style.visibility = 'visible';
    }
    else {
        document.getElementById('ifComp').style.visibility = 'hidden';
        document.getElementById('ifNo').style.visibility = 'hidden';
        document.getElementById('r9').checked = false;
        document.getElementById('r8').checked = true;
    }
}


//To make certain options appear only when a certain size of board is chosen:
function Chec() {
    if (document.getElementById('r12').checked) {
        document.getElementById('ifg1').style.visibility = 'visible';
        document.getElementById('ifbt1').style.visibility = 'visible';
        document.getElementById('ifbt2').style.visibility = 'hidden';
       
        document.querySelector(".endgame").style.display = "none";
    }
    else if (document.getElementById('r13').checked) {
        document.getElementById('ifg1').style.visibility = 'hidden';
        document.getElementById('ifComp').style.visibility = 'hidden';
        document.getElementById('r7').checked = false;
        document.getElementById('ifNo').style.visibility = 'hidden';
        document.getElementById('ifbt1').style.visibility = 'hidden';
        document.getElementById('ifbt2').style.visibility = 'visible';
       
        document.querySelector(".endgame").style.display = "none";
        document.querySelector(".endgame").style.display = "none";
        
    }
}


//To make the varying levels of difficulty option appear only when hints are disabled:
function yesnoCheck() {
    if (document.getElementById('r7').checked && document.getElementById('r9').checked && document.getElementById('r13').checked==false) {
        document.getElementById('ifNo').style.visibility = 'visible';
    }
    else document.getElementById('ifNo').style.visibility = 'hidden';
}


//The pointer variable stores a referance to each of the cells in the table:
const pointer = document.querySelectorAll('.cell');
let circleTurn;
startGame();

// When start/replay game button is clicked ,code comes here:
function startGame() {
    if (document.getElementById('r12').checked == false && document.getElementById('r13').checked == false) {
        alert("Please select either 3X3 or 4X4");
    }
    document.querySelector(".endgame").style.display = "none";
    
    //remove the Xs and Os and background color from previously played games for all the cells
    for (var i = 0; i < pointer.length; i++) {
        pointer[i].innerText = '';
        pointer[i].style.removeProperty('background-color');

    }
    if (document.getElementById("r12").checked == true) {
        startGame1();
    }
    else if (document.getElementById("r13").checked == true) {

        startGame2();
    }
}


function startGame1() {
    //To deselect the 'select first player' option when user chooses to play with a friend:
    if (document.getElementById("r2").checked == true && document.getElementById("r6").checked == true) {
        document.getElementById("r2").checked = false;
    }
   
    //When user chooses to play with a friend,we make circleTurn variable as false initially:
    if (document.getElementById("r6").checked == true) {
        circleTurn = false;
    }
    
    //Disable all the radio buttons once the game starts:
    document.getElementById("r1").disabled = true;
    document.getElementById("r2").disabled = true;
    document.getElementById("r3").disabled = true;
    document.getElementById("r4").disabled = true;
    document.getElementById("r5").disabled = true;
    document.getElementById("r6").disabled = true;
    document.getElementById("r7").disabled = true;
    document.getElementById("r8").disabled = true;
    document.getElementById("r9").disabled = true;
    document.getElementById("r10").disabled = true;
    document.getElementById("r11").disabled = true;
    document.getElementById("r12").disabled = true;
    document.getElementById("r13").disabled = true;
    
    //make the endgame box which shows game result disappear once game starts:
    document.querySelector(".endgame").style.display = "none";
    
    //make the board variable as an array of 9 elements from 0 to 8:
    Board = Array.from(Array(9).keys());

  

    for (var i = 0; i < 9; i++) {
        //pointer[i] refers to ith cell in the table:
        
    /*add an event listener to the click event to call the switchonClick function
     whenever user clicks anywhere inside the table:*/
        pointer[i].addEventListener('click', switchonClick, false);
    }
    for (var i = 9; i < pointer.length; i++) {
      
        pointer[i].removeEventListener('click', switchonClick, false);
    }

    
     //When user chooses the computer to be the first player:
    if (document.getElementById("r2").checked == true) {
         //p is a random number between 0 and 8 inclusive for the computer to take it's turn:
        var p = randomNumber(0, 8)
        
        //Computer as the 1st player places 'X' at a random position:
        Board[p] = AIplayer;
        document.getElementById(p).innerText = AIplayer;
    }

     //When the 1st player is computer and hints are also enabled:
    if (document.getElementById("r8").checked == true && document.getElementById("r2").checked == true) {
        
    /*The AIplayer(computer) has already taken it's first turn so now to get the hint for the user,we go to the
      minimax algorithm so as to get the best possible turn for the user and highlight that cell for
      the user to get a hint*/
        
        document.getElementById(minimax(Board, 100, human).index).style.backgroundColor = "#fff70a";
    }

}

/*When user clicks on the gameboard to take turn,the code comes here :
  (We've passed in the click event to this function)*/

function switchonClick(square) {
    //When opponent is a friend:
    if (document.getElementById("r6").checked == true) {
        
         //a player can take it's turn only if the cell is empty:
        if (typeof Board[square.target.id] == 'number') {
            const player = circleTurn ? huPlayer1 : huPlayer2;
            
            //to take a turn, we call this turn function:
            turn(square.target.id, player)
            //for every turn we negate the value of circleTurn variable to change the players:
            if (!checkTie()) { circleTurn = !circleTurn }
        }


    }

    //if hints are enabled while playing with the computer:
    else if (document.getElementById("r8").checked == true) {
        if (!checkWin(Board, AIplayer) && typeof Board[square.target.id] == 'number') {
             //To remove the previous hint highlight once user clicks for her/his turn:
            pointer[minimax(Board, 100, human).index].style.removeProperty('background-color');
            turn(square.target.id, human);
            
              //if the user did not win and there wasn't a tie,code goes to hint function for AI's turn:
            if (!checkWin(Board, human) && !checkTie()) hint(turn);


        }

    }




    //when opponent is the computer and hints are disabled:
    else if (!checkWin(Board, AIplayer) && typeof Board[square.target.id] == 'number') {
        turn(square.target.id, human);
         //after the user's turn ,AI chooses the best spot for it's turn depending on the depth chosen:
        if (!checkTie() && !checkWin(Board, human)) turn(bestSpot(), AIplayer);
    }
}

function turn(squareId, player) {
    //set the board array at the id clicked to the corresponding player who took a turn at that spot:
    Board[squareId] = player;
    
    //to display where the player clicked on the game board:
    document.getElementById(squareId).innerText = player;
    //to check if this turn made that player win or resulted in a draw so that the we can end the game if this happens:
    let gameWon = checkWin(Board, player)
    if (gameWon) gameOver(gameWon)
    checkTie();


}

function hint(callback) {
    /*callback function means that all subsequent statements will be executed after the 
     execution of this function.Here the turn function has been passed as the callback function.
     So when hints are enabled,the AI will take it's turn first and then code goes to the minimax algorithm
     for a hint for the user */
    
    
    callback(bestSpot(), AIplayer);

    document.getElementById(minimax(Board, 100, human).index).style.backgroundColor = "#fff70a";



}



function checkWin(board, player) {
     
        
        //to find all the places in the board that have already been played in by this player:
     /*The reduce method goes through every element in the board array and
     if the element is a player, it updates the accumulator array with the corresponding index*/
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        
        //to check if the game has been won:
    //we go through every element in all the winning combinations to check if the player has gone thro
        for (let [index, win] of winningcombinations.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                
                 //gameWon contains which wincombo the player won at and which player won:
                gameWon = { index: index, player: player };
                break;
            }
        }

        return gameWon;
    

  
}

function gameOver(gameWon) {
    //to make the winning combination indices red or blue depending on whether AI wins or user:
    for (let index of winningcombinations[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == human ? "blue" : "red";
    }
    //to disable clicking on the board once game has been won:
    for (var i = 0; i < pointer.length; i++) {
        pointer[i].removeEventListener('click', switchonClick, false);
    }

    //go to declareWinner function to declare the winner:
    if (document.getElementById("r6").checked == true) {
        document.getElementById('r12').checked = false;
        document.getElementById('r13').checked = false;
        declareWinner(gameWon.player == huPlayer1 ? "O wins!" : "X wins!");
    }

    else {
        document.getElementById('r12').checked = false;
        document.getElementById('r13').checked = false;
        declareWinner(gameWon.player == human ? "You win!" : "You lose.");
    }
    //enable all the radio buttons for reselection for the next game:
    document.getElementById("r1").removeAttribute("disabled");
    document.getElementById("r2").removeAttribute("disabled");
    document.getElementById("r3").removeAttribute("disabled");
    document.getElementById("r4").removeAttribute("disabled");
    document.getElementById("r5").removeAttribute("disabled");
    document.getElementById("r6").removeAttribute("disabled");
    document.getElementById("r7").removeAttribute("disabled");
    document.getElementById("r8").removeAttribute("disabled");
    document.getElementById("r9").removeAttribute("disabled");
    document.getElementById("r10").removeAttribute("disabled");
    document.getElementById("r11").removeAttribute("disabled");
    document.getElementById("r12").removeAttribute("disabled");
    document.getElementById("r13").removeAttribute("disabled");
  
}

//declares the winner in the endgame box:
function declareWinner(who) {
    document.querySelector(" .endgame").style.display = "block";
    document.querySelector(" .endgame .text").innerText = who;
}

//filters every element in the game board to see if it's type of is a number implying it's empty so return it:
function emptySquares() {
    return Board.filter(s => typeof s == 'number');
}


//to check if there has been a tie:

function checkTie() {
    if (!checkWin(Board, human) && !checkWin(Board, AIplayer) && emptySquares().length == 0) {
        //make all the cells green in color if there is a tie:
        for (var i = 0; i < 9; i++) {
            pointer[i].style.backgroundColor = "green";
            pointer[i].removeEventListener('click', switchonClick, false);
        }
       //enable all the radio buttons for reselection for the next game:
        document.getElementById("r1").removeAttribute("disabled");
        document.getElementById("r2").removeAttribute("disabled");
        document.getElementById("r3").removeAttribute("disabled");
        document.getElementById("r4").removeAttribute("disabled");
        document.getElementById("r5").removeAttribute("disabled");
        document.getElementById("r6").removeAttribute("disabled");
        document.getElementById("r7").removeAttribute("disabled");
        document.getElementById("r8").removeAttribute("disabled");
        document.getElementById("r9").removeAttribute("disabled");
        document.getElementById("r10").removeAttribute("disabled");
        document.getElementById("r11").removeAttribute("disabled");
        document.getElementById("r12").removeAttribute("disabled");
        document.getElementById("r13").removeAttribute("disabled");
        document.getElementById('r12').checked = false;
        document.getElementById('r13').checked = false;


        declareWinner("Tie Game!");
        return true;
    }
    //when it's not a draw:
    return false;
}

//generates a random number between min and max inclusive of both:
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//pass different depths to the minimax function depending on level of difficulty for the AI to take it's turn:
function bestSpot() {


    if (document.getElementById("r3").checked == true && document.getElementById("r8").checked == false) {
        return minimax(Board, 1, AIplayer).index;
    }


    else if (document.getElementById("r8").checked == true || document.getElementById("r11").checked == true) {
        return minimax(Board, 100, AIplayer).index;
    }

    else if (document.getElementById("r8").checked == false && document.getElementById("r4").checked == true) {
        return minimax(Board, 2, AIplayer).index;

    }

    else if (document.getElementById("r8").checked == false && document.getElementById("r5").checked == true) {
        return minimax(Board, 3, AIplayer).index;

    }

    else if (document.getElementById("r8").checked == false && document.getElementById("r10").checked == true) {
        return minimax(Board, 4, AIplayer).index;

    }

}


//minimax algorithm with alpha beta pruning for optimization through recursion :

function minimax(newBoard, depth, player, alpha = -(Number.MIN_VALUE), beta = Number.MAX_VALUE) {

    //finds the available empty spots in the board passed into the function: 
    var availSpots = emptySquares();

    /*return the respective values once there is a win or a draw or depth of difficulty becomes zero.The depth
     keep reducing as we go further steps deeper.*/
    if (checkWin(newBoard, human)) {
        return { score: (-10 - depth) };
    } else if (checkWin(newBoard, AIplayer)) {
        return { score: (10 + depth) };
    } else if (depth == 0 || availSpots.length === 0) {
        return { score: 0 };
    }

    /*In the following section, we make an array called moves to collect the scores from each of the empty 
      spots to evaluate later.We loop through empty spots to collect each move's index and score in an object 
      called move and push move object to the moves array.We get the score by calling the minimax function 
      on each available spot:*/

    //When computer is the present player:

    if (player == AIplayer) {
        var moves = [];
        var bestMove;
        var bestScore = -10000;
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            //store the ith index in move object:
            move.index = newBoard[availSpots[i]];

            //Place the AI player in the newBoard array in the ith available spot:
            newBoard[availSpots[i]] = player;

            //See where this leads to by calling the minimax function with human as the next player:
            var result = minimax(newBoard, depth - 1, human, alpha, beta);

            //Store the result in move object:
            move.score = result.score;

            //remove the previous move from the newboard array:
            newBoard[availSpots[i]] = move.index;

            //push the move object to moves array: 
            moves.push(move);

            //choose bestScore which as the maximum score :
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
                alpha = (bestScore > alpha) ? bestScore : alpha;
                //Alpha-beta pruning:
                if (beta <= alpha) {
                    break;
                }
            }
        }

        return moves[bestMove];

    } else { //when the computer places itself in the user's shoes and chooses the best possible move:
        var bestMove;
        var moves = [];
        var bestScore = 10000;
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};

            //store the ith index in move object:
            move.index = newBoard[availSpots[i]];

            //Place the user in the newBoard array in the ith available spot:
            newBoard[availSpots[i]] = player;

            //See where this leads to by calling the minimax function with AI as the next player:
            var result = minimax(newBoard, depth - 1, AIplayer, alpha, beta);


            //Store the result in move object:
            move.score = result.score;

            //remove the previous move from the newboard array:
            newBoard[availSpots[i]] = move.index;
            //push the move object to moves array:
            moves.push(move);

            //choose bestScore which as the minimum score :
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
                beta = (bestScore < beta) ? bestScore : beta;
                //Alpha-beta pruning:
                if (beta <= alpha) {
                    break;
                }
            }
        }

        return moves[bestMove];
    }

}


