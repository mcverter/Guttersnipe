(function() { 
    window.onload = function() {
	var options = {
	    zoom: 3,
	    center : new google.maps.LatLng(37.09, -95.71),
	    mapTypeId:  google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var shape = {
	    type: 'poly',
	    coord: [4,4, 29,4, 29,29, 22,29, 17,35, 16,35, 10,29, 4,29, 4,4]
	}

	var recycle = new google.maps.MarkerImage('img/recycle.png');
	var shadow = new google.maps.MarkerImage(
	    'img/shadow.png',
	    null,
	    null,
	    new google.maps.Point(16,35)
	);

	var image = new google.maps.MarkerImage (
	    'img/markers.png',
	    new google.maps.Size(32,37),
	    new google.maps.Point(65,0),
	    new google.maps.Point(16,35)
	);

	var wifi = new google.maps.MarkerImage (
	    'img/markers.png',
	    new google.maps.Size(32,37),
	    new google.maps.Point(0,0),
	    new google.maps.Point(16,35)
	);

	var wifiHover = new google.maps.MarkerImage (
	    'img/markers.png',
	    new google.maps.Size(32,37),
	    new google.maps.Point(33,0),
	    new google.maps.Point(16,35)
	);

	var wifiClick = new google.maps.MarkerImage (
	    'img/markers.png',
	    new google.maps.Size(32,37),
	    new google.maps.Point(66,0),
	    new google.maps.Point(16,35)
	);


	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(40.75604, -73.986951),
	    map: map,
	    icon: wifi,
	    shadow: shadow,
	    shape: shape
	});
	google.maps.event.addListener(marker, 'mouseover', function() {
	    this.setIcon(wifiHover);
	});
	google.maps.event.addListener(marker, 'mouseout', function() {
	    this.setIcon(wifi);
	});
	google.maps.event.addListener(marker, 'mousedown', function() {
	    this.setIcon(wifiClick);
	});
	google.maps.event.addListener(marker, 'mouseup', function() {
	    this.setIcon(wifiHover);
	});
	
    }
})();