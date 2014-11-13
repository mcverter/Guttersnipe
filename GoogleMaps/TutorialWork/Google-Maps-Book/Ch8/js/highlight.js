(function () {
    window.onload = function () {


	var options = {
	    zoom: 4,
	    center: new google.maps.LatLng(25.5, -71.0),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);


	var bermudaTrianglePoints = [
	    new google.maps.LatLng(25.7516,-80.1670),
	    new google.maps.LatLng(32.2553, -64.8493),
	    new google.maps.LatLng(18.4049, -66.0578)
	];


	var bermudaTriangle = new google.maps.Polygon ({
	    paths: bermudaTrianglePoints,
	    map: map,
	    strokeColor: '#0000ff',
	    strokeOpacity: 0.6,
	    strokeWeight: 1,
	    fillColor: '#0000ff',
	    fillOpacity: 0.35
	});
	
	google.maps.event.addListener(bermudaTriangle, 'mouseout', function() {
	    bermudaTriangle.setOptions({
		fillColor : '#ff0000',
		strokeColor: '#ff000'
	    });
	});

	
	google.maps.event.addListener(bermudaTriangle, 'mouseover', function() {
	    bermudaTriangle.setOptions({
		fillColor : '#0000ff',
		strokeColor: '#0000ff'
	    });
	});


    };
})();
