
var chinese_checker = (function () {
	
	function getWinner(board){
	var winStringX = JSON.stringify(
		  board[5][1] 
		+ board[5][2] + board[6][2]
		+ board[5][3] + board[6][3] + board[7][3]
		+ board[5][4] + board[6][4] + board[7][4] + board[8][4]
	);
	if (winStringX === JSON.stringify("XXXXXXXXXX")){
		return "X";
	}
	var winStringO = JSON.stringify(
		  board[13][17] 
		+ board[12][16] + board[13][16]
		+ board[11][15] + board[12][15] + board[13][15]
		+ board[10][14] + board[11][14] + board[12][14] + board[13][14]
	);
	if (winStringO === JSON.stringify("OOOOOOOOOO")){
		return "O";
	}
	return '';
	}




function isEqual(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }


function checkPosition(row,col,board){
	if(board[row][col] === '' || board[row][col] === undefined){
			console.log("The position of row: " + row + "and col: " + col + "has been outside of the board!");
			return false;
		}else{
			return true;
		}
}


function isOneStepMove(oldrow,oldcol,row,col){
	if( (Math.abs(oldrow-row)+Math.abs(oldcol-col))==1 ){
		console.log("move is one step around location");
		return true;
	}
	else if( (row==oldrow+1 && col==oldcol+1) || (row==oldrow-1 && col==oldcol-1) ){
		console.log("move is one step around location");
		return true;
	}else{
		console.log("move takes more steps around location");
		return false;
	}
}


function Jump(row,col,board) {
	var pointPool = new Array();
	var i = 0;
	if(board[row][col+1] != '' && board[row][col+1] != 'a'){
		if(board[row][col+2] == 'a'){
			pointPool[i] = [row,col+2];
			i+=1;
		}
	}
	if(board[row+1][col+1] != '' && board[row+1][col+1] != 'a'){
		if(board[row+2][col+2] == 'a'){
			pointPool[i] = [row+2,col+2];
			i+=1;
		}
	}
	if(board[row+1][col] != '' && board[row+1][col] != 'a'){
		if(board[row+2][col] == 'a'){
			pointPool[i] = [row+2,col];
			i+=1;
		}
	}
	if(board[row][col-1] != '' && board[row][col-1] != 'a'){
		if(board[row][col-2] == 'a'){
			pointPool[i] = [row,col-2];
			i+=1;
		}
	}
	if(board[row-1][col-1] != '' && board[row-1][col-1] != 'a'){
		if(board[row-2][col-2] == 'a'){
			pointPool[i] = [row-2,col-2];
			i+=1;
		}
	}
	if(board[row-1][col] != '' && board[row-1][col] != 'a'){
		if(board[row-2][col] == 'a'){
			pointPool[i] = [row-2,col];
		}
	}
	return pointPool;
}


function isContain(arr,value) {
	for(var i=0; i<arr.length; i++){
		if(arr[i][0] == value[0] && arr[i][1] == value[1]){
			return true;
		}
	}
	return false;
}


function isMultiStepMoves(oldrow,oldcol,row,col,boardBeforeMove){
	var key = true;
	var _row;
	var _col;
	var tempPool;
	var pointPool = new Array();
	pointPool[0] = [oldrow,oldcol,true];
	while(true){
	 	key = false;
		for(var i=0; i<pointPool.length; i++){
			if(pointPool[i][2] == true){
				_row = pointPool[i][0];
				_col = pointPool[i][1];
				pointPool[i][2] = false;
				key = true;
				break;
			}
		}
		if(key == false){
			//do something before break
			break;
		}
		tempPool = Jump(_row,_col,boardBeforeMove);
		if(tempPool.length == 0){
			continue;
		}
		for(var j=0; j<tempPool.length; j++){
			if(isContain(pointPool,tempPool[j])==true){
				continue;
			}
			pointPool[pointPool.length] = [tempPool[j][0],tempPool[j][1],true];
		}
		if(isContain(pointPool,[row,col]) == true){
			return true;
		}	
	}
	return false;	
}


function createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex){ 
	
	if(boardBeforeMove === undefined) {
		boardBeforeMove = [
		['','','','','','','','','','','','','','',''],
		['','','','','','a','','','','','','','','',''],
		['','','','','','a','a','','','','','','','',''],
		['','','','','','a','a','a','','','','','','',''],
		['','','','','','a','a','a','a','','','','','','','','',''],
		['','O','O','O','O','a','a','a','a','a','a','a','a','a',''],
		['','','O','O','O','a','a','a','a','a','a','a','a','a',''],
		['','','','O','O','a','a','a','a','a','a','a','a','a',''],
		['','','','','O','a','a','a','a','a','a','a','a','a',''],
		['','','','','','a','a','a','a','a','a','a','a','a',''],
		['','','','','','a','a','a','a','a','a','a','a','a','X',''],
		['','','','','','a','a','a','a','a','a','a','a','a','X','X',''],
		['','','','','','a','a','a','a','a','a','a','a','a','X','X','X',''],
		['','','','','','a','a','a','a','a','a','a','a','a','X','X','X','X',''],
		['','','','','','','','','','','a','a','a','a','','','','','','','',''],
		['','','','','','','','','','','','a','a','a',''],
		['','','','','','','','','','','','','a','a',''],
		['','','','','','','','','','','','','','a',''],
		['','','','','','','','','','','','','','','']
		];
	}
	
    //check the correctness of movement
 	if (checkPosition(row,col,boardBeforeMove) === false){  // checkPosition 01 - boundary
  		throw new Error("One can not make a move outside of the board!");
  	}
  	if(boardBeforeMove[row][col] !== 'a'){
  		throw new Error("One can only make a move in an empty position!");
  	}
  	var boardAfterMove = JSON.parse(JSON.stringify(boardBeforeMove));
  	boardAfterMove[row][col] = turnIndexBeforeMove===0?'O' : 'X';	    //Index => 0 than 'O', turnIndex => 1 than 'X'
  	if(boardAfterMove[oldrow][oldcol]===boardAfterMove[row][col]){
		boardAfterMove[oldrow][oldcol] = 'a';
	}else{
		throw new Error("The original chess piece is not the expected one!");
	}
	
	var winner = getWinner(boardAfterMove);
	var firstOperation;
	var score = [0, 1];
	if(winner !== ''){
		if(winner === 'O'){
			score = [1, 0];
		}
		firstOperation = {endMatch: {endMatchScores: score}};
        
        console.log("player: "+ winner + " WIN!");
	}else{
		firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
		if(turnIndex !== 1 - turnIndexBeforeMove){
			throw new Error("current Index doesn't match!");
		}
	}
	
	if (isOneStepMove(oldrow,oldcol,row,col)===true){
		console.log("single movement");
		return [firstOperation,
            {set: {key: 'board', value: boardAfterMove}},
            {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
	}
	if(isMultiStepMoves(oldrow,oldcol,row,col,boardBeforeMove)===true){
		console.log("multiple movements");
		return [firstOperation,
            {set: {key: 'board', value: boardAfterMove}},
            {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
	}
	else{
		console.log("illegal move!");
		throw new Error("Illegal move!");
	} 	
}

function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColSets){
	var exampleMove = [];
	var state = initialState;
	var turnIndex = initialTurnIndex;
	for(var i=0; i<arrayOfRowColSets.length; i++){
		var rowColSets = arrayOfRowColSets[i];
		var move = createMove(rowColSets.oldrow,rowColSets.oldcol,rowColSets.row, rowColSets.col,turnIndex,state.board,1-turnIndex);
		var stateAfterMove = {board : move[1].set.value, delta : move[2].set.value};
		exampleMove.push({
			stateBeforeMove: state,
        	stateAfterMove: stateAfterMove,
        	turnIndexBeforeMove: turnIndex,
        	turnIndexAfterMove: 1 - turnIndex,
        	move: move,
        	comment: {en: rowColSets.comment}
		});
		state = stateAfterMove;
		turnIndex = 1 - turnIndex;
	}
	return exampleMove;	
}

/*
	I choose to skip the getRiddle() function in that it's trivial for this specific chinese checker game.
	The basic strategy is simple: one should make move towards the opponsite corner as much as possible in
	ervry turn, ie, the more distance you make per turn the faster you reach your goal. This tactic is well
	embeded in the 70+ turns ExampleGame as below. One can check the corresponding comment to learn necessary
	information.
*/
function getExampleGame(){
	return getExampleMoves(0, {}, [
		{oldrow: 6, oldcol: 4, row: 6, col: 5, comment: "First player usually might move a topmost piece one step towards its opposite corner"},
		{oldrow: 11, oldcol: 14, row: 11, col: 13, comment: "Second player gets a similar move from his own corner"},
		{oldrow: 6, oldcol: 2, row: 6, col: 6, comment: "Two consecutive hops takes place during the first player's turn. A hop consist of jumping over a single adjacent piece, only the diagonal direction is allowed"},
		{oldrow: 12, oldcol: 15, row: 12, col: 13, comment: "Second player also provides a single hop from the middle of his second line, and jumps one more step based on one of the piece in his topmost line"},
		{oldrow: 7, oldcol: 4, row: 7, col: 5, comment: "One step in its adjacent empty position towards the opposite corner， A player may not combine hopping with a single move"},
		{oldrow: 13, oldcol: 14, row: 11, col: 12, comment: "A single hop based on his own pieces"},
		{oldrow: 5, oldcol: 2, row: 7, col: 6, comment: "Two consecutive hops based on his own pieces"},
		{oldrow: 11, oldcol: 12, row: 11, col: 11, comment: "One step in its adjacent empty position in order to provide other pieces a better chance to move more steps"},
		{oldrow: 7, oldcol: 6, row: 8, col: 7, comment:"First player gives a single move on the piece's adjacent empty space"},
		{oldrow: 13, oldcol: 16, row: 11, col: 10, comment:"Second player has a three-step-hops move towards the opposite corner, The more distance your piece takes place, the better chance you win"},
		{oldrow: 5, oldcol: 1, row: 5, col: 2, comment:"First player moves the innermost piece one step to prepare for another long jump"},
		{oldrow: 11, oldcol: 10, row: 10, col: 9, comment:"Second player takes one move to form a longer bridge to prepare for a long jump as well"},
		{oldrow: 5, oldcol: 2, row: 9, col: 8, comment:"First player provides a three-step-hops, now arround the new location, there are two kind of pieces"},
		{oldrow: 12, oldcol: 14, row: 10, col: 8, comment:"Second player takes a three-step-hops again"},
		{oldrow: 9, oldcol: 8, row: 13, col: 16, comment:"First player makes use of his opponent's pieces, provides a four-step-hops and finally located in his opponent's corner, He'll win the game if all his pieces firstly place in the opposite corner"},
		{oldrow: 11, oldcol: 15, row: 11, col: 14, comment:"Second player makes one step move"},
		{oldrow: 5, oldcol: 4, row: 13, col: 14, comment:"First player makes a five-step-hops based on both his and his opponent's pieces"},
		{oldrow: 11, oldcol: 14, row: 5, col: 2, comment:"Second player makes a even better six-step-hops based on both sides' pieces"},
		{oldrow: 6, oldcol: 6, row: 7, col: 6, comment:"First player takes a one step move, wants to block the 'bridge' as well as to prepare for the next long jump"},
		{oldrow: 13, oldcol: 17, row: 11, col: 15, comment:"Second player gives a hop from the innermost corner"},
		{oldrow: 7, oldcol: 6, row: 11, col: 14, comment:"First player takes a four-step-hops and settles another his piece in his opposite corner"},
		{oldrow: 10, oldcol: 14, row: 10, col: 10, comment:"Second player takes a three-step-hops"},
		{oldrow: 6, oldcol: 5, row: 7, col: 6, comment:"First player provides a single move"},
		{oldrow: 10, oldcol: 8, row: 9, col: 8, comment:"Second player also takes a single move to block his opponent's further jump"},
		{oldrow: 13, oldcol: 16, row: 13, col: 17, comment:"First player occupied the innermost corner with one single move, in most case this piece will never move again"},
		{oldrow: 10, oldcol: 10, row: 6, col: 4, comment:"Second player makes some progress, with a four-step-hops, another piece reaches the opposite corner"},
		{oldrow: 13, oldcol: 14, row: 13, col: 16, comment:"First player gets a hop in his opposite corner"},
		{oldrow: 11, oldcol: 13, row: 11, col: 12, comment:"Second player gives a single move before jumping "},
		{oldrow: 8, oldcol: 4, row: 7, col: 4, comment:"First player gives a single move before jumping"},
		{oldrow: 9, oldcol: 8, row: 9, col: 7, comment:"Second player moves away the blocker on 'bridge'"},
		{oldrow: 7, oldcol: 6, row: 11, col: 10, comment:"First player forward a piece on the bridge, but still be blocked by another piece, one can not jump through two or more adjacent pieces"},
		{oldrow: 11, oldcol: 12, row: 12, col: 12, comment:"Second player moves his bridge blocker one step away, try to use another diagonal way to jump, but this is a mistake, his opponent now can make use of the whole 'bridge'"},
		{oldrow: 11, oldcol: 10, row: 13, col: 14, comment:"First player gives a two-step-hops, another piece has been settled in the corner"},
		{oldrow: 12, oldcol: 12, row: 8, col: 6, comment:"Second player forward his piece by three-step-hops, but still blocked by his own piece"},
		{oldrow: 7, oldcol: 4, row: 11, col: 12, comment:"First player gives a four-step-hops"},
		{oldrow: 5, oldcol: 2, row: 5, col: 1, comment:"Second player moves a piece to the innermost corner"},
		{oldrow: 11, oldcol: 12, row: 11, col: 13, comment:"First player takes a single move to form a better 'bridge'"},
		{oldrow: 13, oldcol: 15, row: 12, col: 14, comment:"Second player provides a single move"},
		{oldrow: 11, oldcol: 14, row: 12, col: 15, comment:"First player also maneuvers his piece in the opposite corner to make room for newly imcoming pieces"},
		{oldrow: 12, oldcol: 14, row: 10, col: 8, comment:"Second player gives a three-step-hops on the bridge, but still be blocked"},
		{oldrow: 7, oldcol: 3, row: 7, col: 4, comment:"First player makes a single move on his side of 'bridge'"},
		{oldrow: 6, oldcol: 4, row: 6, col: 2, comment:"Second player gives a hop to clear the end of 'bridge'"},
		{oldrow: 7, oldcol: 4, row: 11, col: 14, comment:"First player provides a long consecutive jumps from the beginning of the 'bridge' to the end"},
		{oldrow: 8, oldcol: 6, row: 6, col: 4, comment:"Second player makes a one-step-hop to clean the end of his 'bridge'"},
		{oldrow: 11, oldcol: 14, row: 12, col: 14, comment:"First player makes a hop to clean his end of 'bridge' as well"},
		{oldrow: 12, oldcol: 16, row: 10, col: 14, comment:"Second player makes a hop"},
		{oldrow: 6, oldcol: 3, row: 7, col: 4, comment:"First player gives a single move before a long jump"},
		{oldrow: 6, oldcol: 4, row: 6, col: 3, comment:"Second player provides a hop to make room for a new long jump"},
		{oldrow: 7, oldcol: 4, row: 11, col: 14, comment:"First player makes a long jump, it's cool"},
		{oldrow: 6, oldcol: 3, row: 5, col: 2, comment:"Second player makes a single move"},
		{oldrow: 12, oldcol: 14, row: 13, col: 15, comment:"First player also makes a single move"},
		{oldrow: 10, oldcol: 8, row: 6, col: 4, comment:"Second player gets a two-step-hops and reaches the opposite corner"},
		{oldrow: 8, oldcol: 7, row: 9, col: 8, comment:"First player takes a single move, he may decide to fold his 'bridge' at the end of game"},
		{oldrow: 6, oldcol: 4, row: 6, col: 3, comment:"Second player makes a single move the clean up a room"},
		{oldrow: 5, oldcol: 3, row: 6, col: 4, comment:"First player makes a single move, the final piece in his corner is now waiting on the entry of the 'bridge'"},
		{oldrow: 11, oldcol: 15, row: 9, col: 13, comment:"Second player jumps with a hop in his own corner"},
		{oldrow: 6, oldcol: 4, row: 12, col: 16, comment:"First player makes a cool six-step-hops into his opposite corner"},
		{oldrow: 9, oldcol: 13, row: 10, col: 13, comment:"Second player wants to reach his 'bridge', so he makes a single move towards it"},
		{oldrow: 11, oldcol: 14, row: 11, col: 15, comment:"First player makes a single move"},
		{oldrow: 10, oldcol: 14, row: 10, col: 12, comment:"Second player just makes a hop in his own corner"},
		{oldrow: 9, oldcol: 8, row: 11, col: 14, comment:"First player takes a three-step-hops, now only two pieces are not in his opposite corner"},
		{oldrow: 10, oldcol: 13, row: 10, col: 11, comment:"Second player makes a hop towards still his 'bridge'"},
		{oldrow: 7, oldcol: 5, row: 8, col: 6, comment:"First player gives a single move before a long jump"},
		{oldrow: 10, oldcol: 12, row: 11, col: 12, comment:"Second player provides a single move"},
		{oldrow: 8, oldcol: 6, row: 12, col: 14, comment:"First player makes a four-step-hops into its corner"},
		{oldrow: 11, oldcol: 12, row: 9, col: 6, comment:"Second player gets a three-step-hops"},
		{oldrow: 11, oldcol: 14, row: 10, col: 14, comment:"First player makes a single move before final win"},
		{oldrow: 9, oldcol: 6, row: 8, col: 5, comment:"Second player makes a single move to form a new 'bridge'"},
		{oldrow: 11, oldcol: 13, row: 11, col: 14, comment:"First player makes a final single move, now all his pieces are firstly in his opponent's corner, this gets him win the game"}
	]);
}


function isMoveOk(params){
	try{
		var move = params.move;
		var winflag = move[0].endMatch === undefined? false : true;
		var turnIndexBeforeMove = params.turnIndexBeforeMove; 
    	var stateBeforeMove = params.stateBeforeMove;
    	var turnIndex = winflag === false? move[0].setTurn.turnIndex : 1-turnIndexBeforeMove;
    	
    	var deltaValue = move[2].set.value;
    	var oldrow = deltaValue.oldrow;
      	var oldcol = deltaValue.oldcol;
      	var row = deltaValue.row;
      	var col = deltaValue.col;
      	var boardBeforeMove = stateBeforeMove.board;
      	var boardAfterMove = move[1].set.value;
      	
		var expectedMove = createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex);
		if(!isEqual(move[1], expectedMove[1]) || !isEqual(move[2], expectedMove[2])){
			return false;
		}
	} catch(e) {
		return false;
	}
	return true;
  }
/*
var receiveMoves = getExampleGame();
for(var i=0; i<receiveMoves.length; i++){
	console.log(JSON.stringify(receiveMoves[i].stateAfterMove));
	console.log(receiveMoves[i].comment.en);
}
*/
  
//return isMoveOk;
return {isMoveOk: isMoveOk, getExampleGame: getExampleGame};

})();








