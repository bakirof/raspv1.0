function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
      bindToController:true
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
