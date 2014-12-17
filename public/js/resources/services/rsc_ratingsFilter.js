var app=angular.module('app',[]);
app.factory("ratingsFilter", function(){
  return function(input){
    var rating = parseInt(input);
    var result = "";
    for (var i=0;i<rating;i++){
      result += "*";
    }
    return result;
  }
});

app.controller('classCtrl', function($scope, ratingsFilter){
  $scope.classes = [
    {name:"chemistry", rating:2},
    {name:"math", rating:3},
    {name:"bio", rating:2},


  ];
  $scope.myRating=ratingsFilter(3);
});

/**
 *
 *<!DOCTYPE html>
 <html>
 <head lang="en">
 <meta charset="UTF-8">
 <title></title>
 </head>
 <body>
 <div ng-controller="classCtrl">
 <h1> classes</h1>
 <div ng-repeat="class in classes">
 <button ng-click="schedule.addClass(class)">Register</button>{{class.name}} rating:{{class.rating | ratings}}
 </div>
 </div>
 </body>
 </html>
 */