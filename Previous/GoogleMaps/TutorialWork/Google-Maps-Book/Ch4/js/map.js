(function() {
    window.onload = function() {
	var options = {
	    zoom: 3,
	    center : new google.maps.LatLng(37.09, -95.71),
	    mapTypeId:  google.maps.MapTypeId.ROADMAP,
	    disableDefaultUI: true,
	    mapTypeControl: true,
	    mapTypeControlOptions : {
		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		position: google.maps.ControlPosition.BOTTOM,
		mapTypeIds: [
		    google.maps.MapTypeId.ROADMAP,
		    google.maps.MapTypeId.SATELLITE
		],
		navigationControl: true,
		navigationControlOptions: {
		    position: google.maps.ControlPosition.TOP_RIGHT,
		    style: google.maps.NavigationControlStyle.ZOOM_PAN
		},
		scaleControl: true,
		keyboardShortcuts: false,
		disableDoubleClickZoom: true,
		draggable:  true,
		scrollwheel: true,
		streetViewControl: true,
		backgroundColor: '#ff0000',
		draggableCursor: 'move'

		    
	    }

	};
	var map = new google.maps.Map(document.getElementById('map'), options);
    };
})();
