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
	    var content = document.createElement('div');
	    var p = document.createElement('p');
	    p.innerHTML = 'this marker is manhattan';

	    var p2 = document.createElement('p');

	    var a = document.createElement('a');
	    a.innerHTML = 'Zoom in';
	    a href='#';
	    
	    a.onclick= function() {
		map.setCenter(marker.getPosition());
		map.setZoom(15);
		return false;
	    };
	    p2.appendChild(a);
	    content.appendChild(p);
	    content.appendChild(p2);

	    if (!infoWindow) {
		infoWindow = new google.maps.InfoWindow();
	    }
	    infoWindow.setContent(content);
	    infoWindow.open(map, marker);
	});
    };
})();