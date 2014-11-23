<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Guttersnipe </title>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/leaflet.css">
</head>
<body ng-app="guttersnipe">

welcome to my world to myyyyyyyy worlllllld

<div id="wrapper">
    <div class="container" id="view" ng-view>

    </div>
</div>


<!--js-->
<script src="js/lib/jquery/jquery.js"></script>
<script src="js/lib/bootstrap/bootstrap.js"></script>
<script src="js/lib/lodash/lodash.js"></script>
<script src="js/lib/leaflet/leaflet.js"></script>



<!--angular-->
<script src="js/lib/angular/angular.js"></script>

<!-- routing -->
<script src="js/lib/angular/angular-route.js"></script>
<script src="js/lib/ui-router/angular-ui-router.js"></script>

<!-- utilities (map, wizard) -->
<script src="js/lib/leaflet/angular-leaflet-directive.js"></script>
<script src="js/lib/wizard/angular-wizard.js"></script>


/!--  angular services and controllers  -->
<script src="js/app.js"></script>
<script src="js/services/authService.js"></script>
<script src="js/controllers/loginController.js"></script>
<script src="js/controllers/homeController.js"></script>
<script src="js/controllers/registerController.js"></script>
<script src="js/controllers/editProfileController.js"></script>
<script src="js/controllers/createReportController.js"></script>
<script src="js/controllers/logoutController.js"></script>
<script src="js/controllers/searchController.js"></script>
<script src="js/controllers/siteController.js"></script>
<script src="js/controllers/wizardController.js"></script>
<script src="js/controllers/admin/manageDataController.js"></script>
<script src="js/controllers/admin/manageUsersController.js"></script>


</body>
</html>