(function () {
    window.onload = function () {


	var options = {
	    zoom: 5,
	    center: new google.maps.LatLng(36.1834, -117.4960),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);

	var route = new google.maps.MVCArray();
	alert ("Route is " + map);

	var polyline = new google.maps.Polyline({
	    path: route,
	    strokeColor : "#ff0000",
	    strokeOpacity : 0.5,
	    strokeWeight : 5
	});
	alert ("Polyline is " + polyline);

	polyline.setMap(map);


	google.maps.event.addListener(map, 'click', function(e) {
	    var path = polyline.getPath();
	    path.push(e.latLng);
	});
	alert("moo");

    };

})();