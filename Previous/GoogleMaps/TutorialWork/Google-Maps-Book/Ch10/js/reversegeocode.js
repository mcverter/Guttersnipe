(function() {
    var map, geocoder, marker, infoWindow;
    
    window.onload = function() {
	var options = {
	    zoom: 3,
	    center : new google.maps.LatLng(37.09, -95.71),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};


	map = new google.maps.Map(document.getElementById('map'), options);

	google.maps.event.addListener(map, 'click', function (e) {
	    getAddress(e.latLng);
	});				      			      
    }
    function getAddress(latLng) {
	alert("thanks for clicking!");
	alert ("lat lng is " + latLng);

	if (!geocoder){
	    geocoder=new google.maps.Geocoder();
	}
	var geocoderRequest = {
	    latLng : latLng
	}

	geocoder.geocode(geocoderRequest, function(results, status) {
	    if (!infoWindow) {
		infoWindow = new google.maps.InfoWindow();
	    }
	    infoWindow.setPosition(latLng);
	    
	    var content = '<h3> Position: ' + latLng.toUrlValue() + '</h3>';

	    if (status== google.maps.GeocoderStatus.OK) {
		for (var i = 0; i < results.length; i++) {
		    if (results[0].formatted_address) {
			content += i + '. ' + results[i].formatted_address + '<br />';
		    }
		}
	    }
	    else {
		content += '<p>No address could be found.  Status = ' + status + '</p>';
	    }
	
		
	    infoWindow.setContent(content);
	    infoWindow.open(map);

	});
    }
})();