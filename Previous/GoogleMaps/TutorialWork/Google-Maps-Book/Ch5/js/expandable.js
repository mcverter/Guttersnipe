(function() {
    var infowindow;

    window.onload = function() {
	var options = {
	    zoom : 3,
	    center : new google.maps.LatLng(37.09, -95.71),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var bounds = new google.maps.LatLngBounds();

	var places = [];
	places.push(new google.maps.LatLng(40.756, -73.986));
	places.push(new google.maps.LatLng(37.775, -122.419));
	places.push(new google.maps.LatLng(47.620, -122.347));
	places.push(new google.maps.LatLng(-22.933, -43.184));
	
//	var infowindow;
	
	for (var i=0; i<places.length; i++) {
	    var marker = new google.maps.Marker({
		position : places[i],
		map : map,
		title : 'Place number ' + i,
	    });
	    (function (i, marker) {
		google.maps.event.addListener(marker, 'click', function() {
		    if (!infowindow) {
			infowindow = new google.maps.InfoWindow();
		    }
		    infowindow.setContent ('Place number ' + i);
		    infowindow.open(map,marker);
		});
	    })(i, marker);
	    bounds.extend(places[i]);
	}
	map.fitBounds(bounds);
    };
})();

