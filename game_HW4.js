'use strict';

angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp'])
  .controller('Ctrl', function (
      $window, $scope, $log,
      messageService, stateService, gameLogic) {

	 $scope.yo = function($yindex, $index ) {    
        alert($yindex+ "  " +$index);
    }
    
    $scope.map = [
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[3,13],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[4,13],[3.5,12],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[5,13],[4.5,12],[4,11],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[6,13],[5.5,12],[5,11],[4.5,10],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[9,17],[8.5,16],[8,15],[7.5,14],[7,13],[6.5,12],[6,11],[5.5,10],[5,9],[4.5,8],[4,7],[3.5,6],[3,5],[0,0]],
		[[0,0],[0,0],[9.5,16],[9,15],[8.5,14],[8,13],[7.5,12],[7,11],[6.5,10],[6,9],[5.5,8],[5,7],[4.5,6],[4,5],[0,0]],
		[[0,0],[0,0],[0,0],[10,15],[9.5,14],[9,13],[8.5,12],[8,11],[7.5,10],[7,9],[6.5,8],[6,7],[5.5,6],[5,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[10.5,14],[10,13],[9.5,12],[9,11],[8.5,10],[8,9],[7.5,8],[7,7],[6.5,6],[6,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[11,13],[10.5,12],[10,11],[9.5,10],[9,9],[8.5,8],[8,7],[7.5,6],[7,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[12,13],[11.5,12],[11,11],[10.5,10],[10,9],[9.5,8],[9,7],[8.5,6],[8,5],[7.5,4],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[13,13],[12.5,12],[12,11],[11.5,10],[11,9],[10.5,8],[10,7],[9.5,6],[9,5],[8.5,4],[8,3],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[14,13],[13.5,12],[13,11],[12.5,10],[12,9],[11.5,8],[11,7],[10.5,6],[10,5],[9.5,4],[9,3],[8.5,2],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[15,13],[14.5,12],[14,11],[13.5,10],[13,9],[12.5,8],[12,7],[11.5,6],[11,5],[10.5,4],[10,3],[9.5,2],[9,1],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[13.5,8],[13,7],[12.5,6],[12,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[14,7],[13.5,6],[13,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[14.5,6],[14,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[15,5],[0,0]],
		[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
		];
		
		
	$scope.newposition = 50;
    $scope.newpositionTop = 50;
    $scope.setPagePosition = function(index, parentIndex) {
        //$scope.newposition = (((index - 9) * (-0.4471) - (18 - parentIndex - 9) * 0.894) +9) *20 + 'px'; 
        $scope.newposition =  $scope.map[parentIndex][index][0] * 40 - 65 + 'px'
        return $scope.newposition;
    }
    $scope.setPagePositionTop = function(parentIndex, index){
        //$scope.newpositionTop = (18 - (((index - 9) * 0.894 + (18 - parentIndex - 9) * (-0.4471)) + 9)) *20 + 'px';
        $scope.newpositionTop = $scope.map[parentIndex][index][1] * 35 -20 + 'px'
        return $scope.newpositionTop;
    }

    function updateUI(params) {
      $scope.jsonState = angular.toJson(params.stateAfterMove, true);
      $scope.board = params.stateAfterMove.board;
      if ($scope.board === undefined) {
        $scope.board = [
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
    }
    updateUI({stateAfterMove: {}});
    var game = {
      gameDeveloperEmail: "zoj2005@gmail.com",
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      exampleGame: gameLogic.getExampleGame(),
      //riddles: gameLogic.getRiddles()
    };

    var isLocalTesting = $window.parent === $window;
    $scope.move = JSON.stringify([{setTurn: {turnIndex: 1}}, {set: {key: 'board', value:[
    	['','','','','','','','','','','','','','',''],
		['','','','','','a','','','','','','','','',''],
		['','','','','','a','a','','','','','','','',''],
		['','','','','','a','a','a','','','','','','',''],
		['','','','','','a','a','a','a','','','','','','','','',''],
		['','O','O','O','a','O','a','a','a','a','a','a','a','a',''],
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
		['','','','','','','','','','','','','','','']]}}, {set: {key: 'delta', value: {oldrow: 5, oldcol: 4, row: 5, col: 5}}}]);
    $scope.makeMove = function () {
      $log.info(["Making move:", $scope.move]);
      var moveObj = eval($scope.move);
      if (isLocalTesting) {
        stateService.makeMove(moveObj);
      } else {
        messageService.sendMessage({makeMove: moveObj});
      }
    };

    if (isLocalTesting) {
      game.isMoveOk = gameLogic.isMoveOk;
      game.updateUI = updateUI;
      stateService.setGame(game);
    } else {
      messageService.addMessageListener(function (message) {
        if (message.isMoveOk !== undefined) {
          var isMoveOkResult = gameLogic.isMoveOk(message.isMoveOk);
          messageService.sendMessage({isMoveOkResult: isMoveOkResult});
        } else if (message.updateUI !== undefined) {
          updateUI(message.updateUI);
        }
      });

      messageService.sendMessage({gameReady : game});
    }
  });
