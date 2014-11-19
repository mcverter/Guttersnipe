(function() {
    var map, infoWindow;
    window.onload = function() {
	var options = {
	    zoom: 3,
	    center: new google.maps.LatLng(37.09, -95.71),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map'), options);
    

	var marker = new google.maps.Marker( {
	    position: new google.maps.LatLng(40.75604, -73.986951),
	    map: map,
	    title: 'Click me'
	});


	
	google.maps.event.addListener(marker, 'click', function() {
	    if (! infoWindow) {
		infoWindow = new google.maps.InfoWindow();
	    }
	    var detailDiv = document.createElement('div');
	    detailDiv.style.width = '200px';
	    detailDiv.style.height = '200px';

	    document.getElementById('map').appendChild(detailDiv);

	    var overviewOpts = {
		zoom: 14,
		center: marker.getPosition(),
		mapTypeId: map.getMapTypeId(),
		disableDefaultUI: true
	    };

	    var detailMarker = new google.maps.Marker ({
		position: marker.getPosition(),
		map: detailMap,
		clickable: false
	    });
	    
	    var detailMap = new google.maps.Map(detailDiv, overviewOpts);

	    infoWindow.setContent(detailDiv);
	    infoWindow.open(map, marker);
	    
	});
	google.maps.event.trigger(marker, 'click');
    };
})();