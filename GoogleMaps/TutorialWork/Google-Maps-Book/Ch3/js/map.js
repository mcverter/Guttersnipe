(function() {
window.onload = function () {
    var mapDiv = document.getElementById('map');
    var latlng = new google.maps.LatLng(37.09, -95.71);
    var options = {
	center: latlng,
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapDiv, options);
}

}) ();


(function (message) {
    alert(message);
})('Hello Google Maps Lovers');
