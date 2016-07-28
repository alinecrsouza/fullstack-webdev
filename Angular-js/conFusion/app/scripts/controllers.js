'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

                $scope.tab = 1;
                $scope.filtText = '';
                $scope.showDetails = false;

                $scope.dishes = menuFactory.getDishes();

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
                var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
                $scope.dish = dish;
            }])

        .controller('DishCommentController', ['$scope', function ($scope) {

                //Step 1: Create a JavaScript object to hold the comment from the form
                $scope.newComment = {rating: '5', comment: '', author: '', date: ''};

                $scope.submitComment = function () {

                    //Step 2: This is how you record the date
                    //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
                    $scope.newComment.date = new Date().toISOString();

                    // Step 3: Push your comment into the dish's comment array
                    $scope.dish.comments.push($scope.newComment);

                    //Step 4: reset your form to pristine
                    $scope.commentForm.$setPristine();

                    //Step 5: reset your JavaScript object that holds your comment
                    $scope.newComment = {rating: '5', comment: '', author: '', date: ''};
                }
            }])
        
        // implement the IndexController and AboutController here
        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
                var dish_id = $stateParams.dish_id; //getting dish_id 
                var leader_id = $stateParams.leader_id; //getting leader_id
                var promotion_id = $stateParams.promotion_id; //getting promotion_id
                
                var dish = menuFactory.getDish(dish_id);
                $scope.dish = dish;
                
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

