(function() {
    var map, geocoder, marker, infowindow;
    
    window.onload = function() {
	var options = {
	    zoom: 3,
	    center : new google.maps.LatLng(37.09, -95.71),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};


	map = new google.maps.Map(document.getElementById('map'), options);
	var form = document.getElementById('addressForm');

	form.onsubmit=function() {
	    var address = document.getElementById('address').value;

	    getCoordinates(address);
	    return false;
	};

    }
    function getCoordinates(address) {
	if (!geocoder){
	    geocoder=new google.maps.Geocoder();
	}
	var geocoderRequest = {
	    address: address
	}
	geocoder.geocode(geocoderRequest, function(results, status) {
	    if (status== google.maps.GeocoderStatus.OK) {
		map.setCenter(results[0].geometry.location);
		if (!marker) {
		    marker = new google.maps.Marker({
			map: map,
		    });
		}

/*		alert("status is " + status);
		alert ("results is " + results);
		alert ("first result is " + results[0])
*/
		marker.setPosition(results[0].geometry.location);
		if (!infowindow) {
		    infowindow = new google.maps.InfoWindow();
		}
		var content = '<strong>' + results[0].formatted_address+'</strong><br />';
		content += 'Lat: ' + results[0].geometry.location.lat() + '<br />';
		content += 'Lng: ' + results[0].geometry.location.lng();
		
		infowindow.setContent(content);
		infowindow.open(map, marker);
	    }
	});
    }
})();