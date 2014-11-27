<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Guttersnipe </title>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/leaflet.css">
    <link rel="stylesheet" href="css/angular-wizard.css">

</head>
<body ng-app="guttersnipe">

<div id="wrapper">
    <div class="container" id="view" ui-view>

    </div>
</div>


<!--js-->
<script src="js/lib/jquery/jquery.js"></script>
<script src="js/lib/bootstrap/bootstrap.js"></script>
<script src="js/lib/lodash/lodash.js"></script>

<!--angular-->
<script src="js/lib/angular/angular.js"></script>

<!-- novo plugins -->
<script src="js/lib/novolib/debug.js"></script>
<script src="js/lib/novolib/bootstrap.js"></script>
<script src="js/lib/novolib/lodash-mixins.js"></script>



<!-- routing -->
<script src="js/lib/ui-router/angular-ui-router.js"></script>

<!-- map -->
<script src="js/lib/leaflet/leaflet.js"></script>
<script src="js/lib/leaflet/angular-leaflet-directive.js"></script>


<!-- calendar -->
<script src="js/lib/ui-calendar/moment-with-locales.js"></script>
<script src="js/lib/ui-calendar/fullcalendar.js"></script>
<script src="js/lib/ui-calendar/gcal.js"></script>
<script src="js/lib/ui-calendar/calendar.js"></script>

<!-- utilities -->
<script src="js/lib/wizard/angular-wizard.js"></script>


<!--  angular  -->

<!-- app -->
<script src="js/app.js"></script>

<!-- services -->
<script src="js/services/authService.js"></script>
<script src="js/services/ResourceTaxonomySvc.js"></script>



<!-- controllers -->
<script src="js/controllers/loginController.js"></script>
<script src="js/controllers/homeController.js"></script>
<script src="js/controllers/registerController.js"></script>
<script src="js/controllers/editProfileController.js"></script>
<script src="js/controllers/createReportController.js"></script>
<script src="js/controllers/logoutController.js"></script>
<script src="js/controllers/searchController.js"></script>
<script src="js/controllers/siteController.js"></script>
<script src="js/controllers/wizardController.js"></script>
<script src="js/controllers/wizardController2.js"></script>

<!-- admin controllers -->
<script src="js/controllers/admin/manageDataController.js"></script>
<script src="js/controllers/admin/manageUsersController.js"></script>

<!-- directives -->
<script src="js/directives/ResourceDirective.js"></script>

</body>
</html>