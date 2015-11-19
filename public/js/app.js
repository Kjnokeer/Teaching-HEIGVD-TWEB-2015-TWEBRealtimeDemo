angular.module('app', [
  'ui.router',
  'app.ChartCtrl',
  'btford.socket-io'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'views/index.jade'
      })
      .state('audiance', {
        url: '/audiance',
        templateUrl: 'views/partials/audiance.jade'
      })
      .state('board', {
        url: '/board',
        templateUrl: 'views/partials/board.jade'
      })
      .state('debug', {
        url: '/debug',
        templateUrl: 'views/partials/debug.jade'
      });
  })
  .factory('mySocket', function(socketFactory) {
    return socketFactory();
  });
