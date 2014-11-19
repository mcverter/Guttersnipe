<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Guttersnipe </title>
    <link rel="stylesheet" href="css/bootstrap.css"/>

</head>
<body ng-app="guttersnipeApp">
<div id="wrapper">
    <div class="container" id="view" ng-view>

    </div>
</div>


<!--js-->
<script src="js/lib/jquery/jquery.js"></script>
<script src="js/lib/bootstrap/bootstrap.js"></script>

<!--angular-->
<script src="js/lib/angular/angular.js"></script>
<script src="js/lib/angular/angular-route.js"></script>
<script src="js/lib/gmaps_angular/angular-google-maps.js"></script>
<script src="js/app.js"></script>
<script src="js/services/authService.js"></script>
<script src="js/controllers/loginController.js"></script>
</body>
</html>