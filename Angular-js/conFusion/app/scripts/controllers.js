'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;
                $scope.showMenu = false;
                $scope.message = "Loading ...";
                menuFactory.getDishes().query(
                        function (response) {
                            $scope.dishes = response;
                            $scope.showMenu = true;
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });

                $scope.select = function (setTab) {
                    $scope.tab = setTab;

                    if (setTab === 2) {
                        $scope.filtText = "appetizer";
                    }
                    else if (setTab === 3) {
                        $scope.filtText = "mains";
                    }
                    else if (setTab === 4) {
                        $scope.filtText = "dessert";
                    }
                    else {
                        $scope.filtText = "";
                    }
                };

                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.toggleDetails = function () {
                    $scope.showDetails = !$scope.showDetails;
                };
            }])

        .controller('ContactController', ['$scope', function ($scope) {

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

                var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

                $scope.channels = channels;
                $scope.invalidChannelSelection = false;

            }])

        .controller('FeedbackController', ['$scope', function ($scope) {

                $scope.sendFeedback = function () {

                    console.log($scope.feedback);

                    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                        $scope.invalidChannelSelection = true;
                        console.log('incorrect');
                    }
                    else {
                        $scope.invalidChannelSelection = false;
                        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                        $scope.feedback.mychannel = "";
                        $scope.feedbackForm.$setPristine();
                        console.log($scope.feedback);
                    }
                };
            }])

        /*.controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {
         
         $scope.dish= menuFactory.getDish(3);     
         
         
         }])*/

        //Reconfiguring to use Angular-Route
        /*.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function ($scope, $routeParams, menuFactory) {
         
         var dish = menuFactory.getDish(parseInt($routeParams.id, 10));
         $scope.dish = dish;
         }])*/

        //Reconfiguring to use Angular UI-Router
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
                $scope.dish = {};
                $scope.showDish = false;
                $scope.message = "Loading ...";
                $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                                function (response) {
                                    $scope.dish = response;
                                    $scope.showDish = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );
            }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                //Step 1: Create a JavaScript object to hold the comment from the form
                $scope.newComment = {rating: '5', comment: '', author: '', date: ''};

                $scope.submitComment = function () {
                    $scope.mycomment.date = new Date().toISOString();
                    console.log($scope.mycomment);
                    $scope.dish.comments.push($scope.mycomment);

                    menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
                    $scope.commentForm.$setPristine();
                    $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
                }
            }])

        // implement the IndexController and AboutController here
        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
                var dish_id = $stateParams.dish_id; //getting dish_id 
                var leader_id = $stateParams.leader_id; //getting leader_id
                var promotion_id = $stateParams.promotion_id; //getting promotion_id

                $scope.showDish = false;
                $scope.message = "Loading ...";
                $scope.dish = menuFactory.getDishes().get({id: dish_id})
                        .$promise.then(
                                function (response) {
                                    $scope.dish = response;
                                    $scope.showDish = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );

                var promotion = menuFactory.getPromotion(promotion_id);
                $scope.promotion = promotion;

                var leader = corporateFactory.getLeader(leader_id);
                $scope.leader = leader;
            }])

        .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {
                $scope.leaders = corporateFactory.getLeaders();
                var leader = corporateFactory.getLeader(parseInt($stateParams.id, 10));
                $scope.leader = leader;
            }])
        ;

