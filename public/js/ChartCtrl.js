angular.module('app.ChartCtrl', [
  'chart.js'
])
.controller('ChartCtrl', function($scope, mySocket) {
  var votes = {
    'yes': 0,
    'no': 0,
    'iDontKnow': 0
  };

  $scope.labels = ['Yes', 'No', 'I don\'t know'];
  $scope.myData = [votes.yes, votes.no, votes.iDontKnow];

  $scope.vote = function(vote) {
    switch(vote) {
      case 'yes':
      votes.yes++;
      break;
      case 'no':
      votes.no++;
      break;
      case 'iDontKnow':
      votes.iDontKnow++;
      break;
    }

    mySocket.emit(vote);

    $scope.myData = [votes.yes, votes.no, votes.iDontKnow];
  }

  $scope.reset = function() {
    console.log('reset client');
    mySocket.emit('reset');
  }

  mySocket.forward('initVotes', $scope);
  mySocket.forward('updateVotes', $scope);

  $scope.$on('socket:initVotes', function(ev, data) {
    $scope.allData = [data.yes, data.no, data.iDontKnow];
  });

  $scope.$on('socket:updateVotes', function(ev, data) {
    $scope.allData = [data.yes, data.no, data.iDontKnow];
  })
});
