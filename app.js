const boardWidth = 3;
const oPlayer = 1;
const xPlayer = 2;

var gameRunning = true;

var turn = 1;

var board = [
	[0,0,0],
	[0,0,0],
	[0,0,0]
];


var checkRows = function() {

	var xCount = 0;
	var oCount = 0;

	for (var i = 0; i < board.length; i++) {

		xCount = 0;
		oCount = 0;

		for (var j = 0; j < board.length; j++) {

			if (board[i][j] == oPlayer) {

				oCount++;
			}

			else if(board[i][j] == xPlayer) {

				xCount++;
			}
		}

		if (xCount >= boardWidth) {

			return xPlayer;
		}

		if (oCount >= boardWidth) {

			return oPlayer;
		}
	}
	
	return 0;
}

var checkColumns = function() {

	var xCount = 0;
	var oCount = 0;

	for (var i = 0; i < board.length; i++) {

		xCount = 0;
		oCount = 0;

		for (var j = 0; j < board.length; j++) {

			if (board[j][i] == oPlayer) {

				oCount++;
			}

			else if(board[j][i] == xPlayer) {

				xCount++;
			}
		}

		if (xCount >= boardWidth) {

			return xPlayer;
		}

		if (oCount >= boardWidth) {

			return oPlayer;
		}
	}

	return 0;
}

var checkDiags = function () {

	var xCount = 0;
	var oCount = 0;

	for (var i = 0; i < boardWidth; i++) {

		if (board[i][i] == xPlayer) {

			xCount++;
		}

		else if (board[i][i] == oPlayer) {

			oCount++;
		}
	}

	if (xCount >= boardWidth) {

		return xPlayer;
	}

	if (oCount >= boardWidth) {

		return oPlayer;
	}

	xCount = 0;
	oCount = 0;

	for (var i = 0; i < boardWidth; i++) {


		if (board[i][boardWidth - 1- i] == xPlayer) {

			xCount++;
		}

		else if (board[i][boardWidth - 1 - i ] == oPlayer) {

			oCount++;
		}
	}

	if (xCount >= boardWidth) {

		return xPlayer;
	}

	if (oCount >= boardWidth) {

		return oPlayer;
	}

	return 0;

}

var endGame = function(state) {

	if (state == oPlayer) {

		$("#result").html("O's Win!");
	}

	else if (state == xPlayer) {

		$("#result").html("X's Win!");
	}

	else {

		$("#result").html("Tie Game!")
	}
} 

var update = function() {

	if (turn < 9) {

		if (checkColumns() != 0) {

			gameRunning = false;
			endGame(checkColumns());
		} 

		else if (checkRows() != 0) {

			gameRunning = false;
			endGame(checkRows());
		} 

		else if (checkDiags() != 0) {

			gameRunning = false;
			endGame(checkDiags());
		}
	}

	else if (turn >= 9) {

		gameRunning = false;

		if (checkColumns() != 0) {

			endGame(checkColumns());
		} 

		else if (checkRows() != 0) {

			endGame(checkRows());
		} 

		else if (checkDiags() != 0) {

			endGame(checkDiags());
		}

		else {

			endGame(0);
		}
	}
}

$("#board td ").click(function() {

	if (gameRunning) {

		var col = $(this).parent().children().index($(this));
	  	var row = $(this).parent().parent().children().index($(this).parent());

	  	if (board[row][col] == 0) {

		  	if (turn % 2 == 0) {

		  		$(this).html("X");
		  		board[row][col] = xPlayer;

		  	}

		  	else {

		  		$(this).html("O");
		  		board[row][col] = oPlayer;
		  	}

		  	update();
		  	turn++;
	  	}
  	}
});


