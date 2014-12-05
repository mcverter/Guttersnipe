(function() {
    window.onload = function() {
	var options = {
	    zoom: 12,
	    center: new google.maps.LatLng(40.7257, -74.0047),
	    mapTypeId:  google.maps.MapTypeId.ROADMAP,
	    };
	var map = new google.maps.Map(document.getElementById('map'), options);
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(40.7257, -74.0047),
	    map: map,
	    title: 'Click me',
	    icon: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png',
	});
	var infowindow = new google.maps.InfoWindow({
	    content: '<div class="info">Hello world</div>',
	    });

	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	    });



	
	
	};
    })();

