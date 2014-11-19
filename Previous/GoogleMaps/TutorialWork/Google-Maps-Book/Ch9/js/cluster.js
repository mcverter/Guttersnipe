(function () {
    window.onload = function () {


	var options = {
	    zoom: 3,
	    center: new google.maps.LatLng(37.09, -95.71),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);

	google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
	    var bounds = map.getBounds();
	    var southWest = bounds.getSouthWest();
	    var northEast = bounds.getNorthEast();
	    var latSpan = northEast.lat() - southWest.lat();
	    var lngSpan = northEast.lng() - southWest.lng();	

	for (var i = 0; i<100; i++)
	{
	    var lat = southWest.lat() + latSpan * Math.random();
	    var lng = southWest.lng() + lngSpan * Math.random();
	    var latlng = new google.maps.LatLng(lat, lng);

	    new google.maps.Marker({
		position: latlng,
		map : map
	    });
	}

	});
	
    };
})();
