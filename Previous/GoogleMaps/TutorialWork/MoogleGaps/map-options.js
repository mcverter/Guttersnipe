(function(window, google,  mapster) {
    mapster.MAP_OPTIONS = {
        center: {
            lat: 37.791303,
            lng: -122.438444
        },
        zoom: 10,
        disableDefaultUI:true,
        scrollwheel: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        maxZoom: 11,
        minZoom: 9,
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.SMALL
        },
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
        },

        geocode: true,
        cluster: {
            options : {
                styles: [{
                   url: "",
                    height: 55,
                    width: 66,
                    textColor: '#foo',
                    textSize:18

                },
                    {
                        url: "",
                        height: 55,
                        width: 66,
                        textColor: '#foo',
                        textSize:18
                    },
                    {                        url: "",
                        height: 55,
                        width: 66,
                        textColor: '#foo',
                        textSize:18
                    },
                    {                        url: "",
                        height: 55,
                        width: 66,
                        textColor: '#foo',
                        textSize:18
                    }
                ]
            }

        }
    };
}(window, google, window.Mapster || (window.Mapster ={})))