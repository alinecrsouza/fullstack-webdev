'use strict';

//angular.module('confusionApp', ['']);

//using angular-route
/*angular.module('confusionApp', ['ngRoute'])
 .config(function ($routeProvider) {
 $routeProvider
 // route for the contactus page
 .when('/contactus', {
 templateUrl: 'contactus.html',
 controller: 'ContactController'
 })
 // route for the menu page
 .when('/menu', {
 templateUrl: 'menu.html',
 controller: 'MenuController'
 })
 // route for the dish details page
 .when('/menu/:id', {
 templateUrl: 'dishdetail.html',
 controller: 'DishDetailController'
 })
 .otherwise('/contactus');
 })
 ;*/

//using Angular UI-Router
angular.module('confusionApp', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    // route for the home page
                    .state('app', {
                        url: '/',
                        params: {                            
                            dish_id: {
                                value: 0,
                                squash: false,
                            },                           
                            promotion_id: {
                                value: 0,
                                squash: false,
                            },
                            leader_id: {
                                value: 3,
                                squash: false,
                            },
                            // these param are not part of url                           
                            hiddenParam: 'YES',
                        },
                        views: {
                            'header': {
                                templateUrl: 'views/header.html'
                            },
                            'content': {
                                templateUrl: 'views/home.html',
                                controller: 'IndexController'
                            },
                            'footer': {
                                templateUrl: 'views/footer.html'
                            }
                        }
                    })
                    // route for the aboutus page
                    .state('app.aboutus', {
                        url: 'aboutus',
                        views: {
                            'content@': {
                                templateUrl: 'views/aboutus.html',
                                controller: 'AboutController'
                            }
                        }
                    })
                    // route for the contactus page
                    .state('app.contactus', {
                        url: 'contactus',
                        views: {
                            'content@': {
                                templateUrl: 'views/contactus.html',
                                controller: 'ContactController'
                            }
                        }
                    })

                    // route for the menu page
                    .state('app.menu', {
                        url: 'menu',
                        views: {
                            'content@': {
                                templateUrl: 'views/menu.html',
                                controller: 'MenuController'
                            }
                        }
                    })

                    // route for the dishdetail page
                    .state('app.dishdetails', {
                        url: 'menu/:id',
                        views: {
                            'content@': {
                                templateUrl: 'views/dishdetail.html',
                                controller: 'DishDetailController'
                            }
                        }
                    });
            $urlRouterProvider.otherwise('/');
        })
        ;