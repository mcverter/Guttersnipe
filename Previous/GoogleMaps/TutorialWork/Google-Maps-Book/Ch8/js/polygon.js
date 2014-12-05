(function () {
    window.onload = function () {


	var options = {
	    zoom: 5,
	    center: new google.maps.LatLng(36.1834, -117.4960),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);

	var points = [
	    new google.maps.LatLng(37.7671, -122.4206),
	    new google.maps.LatLng(36.1131, -115.1763),
	    new google.maps.LatLng(34.0485, -118.2568),
	];

	var polygon = new google.maps.Polygon ({
	    paths: points,
	    map: map,
	    strokeColor: '#0000ff',
	    strokeOpacity: 0.6,
	    strokeWeight: 1,
	    fillColor: '#0000ff',
	    fillOpacity: 0.35
	});
    };
})();
