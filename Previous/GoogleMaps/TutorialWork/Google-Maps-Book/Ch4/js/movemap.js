(function() {
window.onload = function () {
    var options = {
	center: new google.maps.LatLng(37.09, -95.71),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    document.getElementById('getValues').onclick=function(){
	alert('Current Zoom level is ' + map.getZoom());
	alert('Current center is ' + map.getCenter());
	alert('Current map type is ' + map.getMapTypeId());
    };
    document.getElementById('changeValues').onclick = function() {
	map.setCenter(new google.maps.LatLng(40.6891, -74.0445));
	map.setZoom(17);
	map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
    
}

}) ();


(function (message) {
    alert(message);
})('Hello Google Maps Lovers');
