(function () {
    window.onload = function () {


	var options = {
	    zoom: 6,
	    center: new google.maps.LatLng(36.5, -79.8),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);


	var polyOuter = [
	    new google.maps.LatLng(37.303, -81.256),
	    new google.maps.LatLng(37.303, -78.333),
	    new google.maps.LatLng(35.392, -78.333),
	    new google.maps.LatLng(35.392, -81.256),
	];

	var polyInner = [
	    new google.maps.LatLng(36.705, -80.459),
	    new google.maps.LatLng(36.705, -79),
	    new google.maps.LatLng(35.9, -79),
 	    new google.maps.LatLng(35.9, -80.459),
	];
	var points = [polyOuter, polyInner];

	var polygon = new google.maps.Polygon ({
	    paths: points,
	    map: map,
	    strokeColor: '#0000ff',
	    strokeOpacity: 0.6,
	    strokeWeight: 3,
	    fillColor: '#0000ff',
	    fillOpacity: 0.35
	});
    };
})();
