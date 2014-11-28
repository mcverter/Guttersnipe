<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Blog Administration </title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>

</head>
<body ng-app="blogApp">
<div id="wrapper">
    <div class="container" id="view" ng-view>

    </div>
</div>


<!--js-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!--angular-->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.js"></script>
<script src="js/app.js"></script>
<script src="js/services/authService.js"></script>
<script src="js/controllers/loginController.js"></script>
</body>
</html>