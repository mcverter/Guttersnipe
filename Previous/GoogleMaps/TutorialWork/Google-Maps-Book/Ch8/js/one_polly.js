(function () {
    window.onload = function () {
	var options = {
	    zoom: 5,
	    center: new google.maps.LatLng(36.1834, -117.4960),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var route = [
	    new google.maps.LatLng(37.7671, -122.4206),
	    new google.maps.LatLng(34.0485, -118.2568)
	];


	var polyline = new google.maps.Polyline({
	    path : route,
	    strokeColor : "#ff0000",
	    strokeWeight: 5,
	    strokeOpacity: 0.6
	});

	var map = new google.maps.Map(document.getElementById('map', options));
	polyline.setMap(map);
    };
})();