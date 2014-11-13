(function(window, $) {
    var $mapster = $("#map-canvas").mapster(Mapster.MAP_OPTIONS);
    var geocoder = new google.maps.Geocoder();

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            $mapster.mapster('addMarker', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

        })
    }

    $mapster.mapster('getCurrentPosition', (function(position){
        console.log(position);
        $mapster.mapster('addMarker', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

    }));

    $mapster.mapster('addMarker', {lat: 888, lng:888})

    $mapster.mapster('addMarker', {
        location: 'Golden Gate Bridge, San Francisco, CA'
    })
    $mapster.mapster('setPano', '#pip-pano', {
        position: {
            lat: 55.5555,
            lng: 555.5555

        },
        pov: {
            heading: 0,
            pitch: 0
        },
        events: [{
            name: 'position_changed',
            callback: function() {
                alert('changed');
            }
        }, {
            name: 'link_changed',
            callback: function() {
                alert(getLinks());
            }
        }

        ]
    });


    function geocode(opts) {
        geocoder.geocode(
            {address: opts.address},
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    opts.success.call(this, results, status);
                    console.log(results);
                }
                else {
                    opts.error.call(this, status);
                    console.error(status);
                }
            });
    }
    geocode({
        address: 'Golden Gate Bridge, San Francisco, CA',
        success: function(results) {
            var result = results[0];
            $mapster.mapster('addMarker', {
                lat: results.geometry.location.lat(),
                lng: results.geometry.location.lng()

            })
        }
    })
}(window, jquery))