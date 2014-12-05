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
	    var video = document.createElement('video');
	    video.setAttribute('src', 
			       'http://upload.wikimedia.org/wikipedia/commons/3/3f/ACA_Allertor_125_video.ogv');
	    video.setAttribute('width', '300');
	    video.setAttribute('height', '200');
	    video.setAttribute('controls', 'controls');
	    video.setAttribute('autoplay', 'autoplay');

	
	    infoWindow.setContent(video);
	    infoWindow.open(map, marker);
	    
	});
	google.maps.event.trigger(marker, 'click');
    };
})();