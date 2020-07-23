
function startGame2() {
   
    
  
    document.querySelector(".endgame").style.display = "none";
    if (document.getElementById("r2").checked == true && document.getElementById("r6").checked == true) {
        document.getElementById("r2").checked = false;
    }

    if (document.getElementById("r6").checked == true) {
        circleTurn = false;
    }
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

    Board = Array.from(Array(25).keys());
    for (var x = 0; x < 9; x++) {

        Board[x] = 'X';
    }
    for (var i = 0; i < pointer.length; i++) {
        pointer[i].innerText = '';
        pointer[i].style.removeProperty('background-color');

    }
    for (var i = 9; i < pointer.length; i++) {

        pointer[i].addEventListener('click', switchonClick1, false);
    }




}

function switchonClick1(square) {
    if (document.getElementById("r6").checked == true) {
        if (typeof Board[square.target.id] == 'number') {
            const player = circleTurn ? huPlayer1 : huPlayer2;
            turn1(square.target.id, player);
            checkStatus();
            circleTurn = !circleTurn;
        }
    }

    else if (document.getElementById("r7").checked == true) {
        if (typeof Board[square.target.id] == 'number') {
            turn1(square.target.id, human);
            checkStatus();
        }
        var emptycount = 0;
        for (var k = 9; k < 25; k++) {
            if (typeof Board[k] == 'number') {
                emptycount++;
            }
        }
        if (emptycount > 10) {
            for (var x = 9; x < 25; x++) {
                if (typeof Board[x] == 'number') {
                    Board[x] = AIplayer;
                    document.getElementById(x).innerText = AIplayer;
                    checkStatus();
                    break;
                }
            }
        }

        else if (emptycount > 10) {
            var p = minimax(Board, 1, AIplayer).index;
            Board[p] = AIplayer;
            document.getElementById(p).innerText = AIplayer;
        }

    }
}

function turn1(squareId, player) {
    Board[squareId] = player;
    document.getElementById(squareId).innerText = player;
}

function checkStatus() {
    // all possible winning combinations in Tic Tac Toe
    let checks = [
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
    ];

    for (var i = 0; i < checks.length; i++) {
        let check = checks[i];
        let checkArr = [];
        for (var j = 0; j < check.length; j++) {
            checkArr.push(Board[check[j]]);
        }

        if (checkArr[0] == huPlayer1 && checkArr[1] == huPlayer1 && checkArr[2] == huPlayer1 && checkArr[3] == huPlayer1) {
            for (var j = 0; j < check.length; j++) {
                document.getElementById(check[j]).style.backgroundColor = "blue";
            }

            for (var i = 9; i < pointer.length; i++) {
                pointer[i].removeEventListener('click', switchonClick1, false);
            }

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
            document.getElementById('r13').checked = false
            declareWinner("O wins!");;
        }

        else if (checkArr[0] == huPlayer2 && checkArr[1] == huPlayer2 && checkArr[2] == huPlayer2 && checkArr[3] == huPlayer2) {
            for (var j = 0; j < check.length; j++) {
                document.getElementById(check[j]).style.backgroundColor = "red";

            }

            for (var i = 9; i < pointer.length; i++) {
                pointer[i].removeEventListener('click', switchonClick1, false);
            }

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

            declareWinner("X wins!");
        }

    }

    var count = 0;
    for (var k = 9; k < 25; k++) {
        if (typeof Board[k] !== 'number') {
            count++;
        }
    }

    if (count == 16) {
        for (var x = 9; x < 25; x++) {
            document.getElementById(x).style.backgroundColor = "green";
        }

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

        declareWinner("Tie game!");
    }
}
