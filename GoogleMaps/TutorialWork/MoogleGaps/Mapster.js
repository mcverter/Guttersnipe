(function(window, google, List){
    var Mapster = (function() {
        function  Mapster(element, options){
            this.gMap = new google.maps.Map(element, options);
            this.markers = List.create();
            if (options.clusterer) {
                this.markerClusterer = new MarkerClusterer(this.gMap, [], options.clusterer);
            }
            if (options.geocoding) {
                this.geocoder = google.maps.Geocoder();

            }
            Mapster.prototyle = {
                zoom: function(level) {
                    if (level) {
                        this.gMap.setZoom(level);
                    }
                    else {
                        this.gMap.getZoom();
                    }
                },
                _on: function(options) {
                    var self = this;
                    google.maps.event.addListener(options.obj, options.event, function(e){
                        options.callback.call(self, e, options.obj);
                    });
                },
                geocode: function(options) {
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
                },
                getCurrentPosition: function(callback){
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position){
                            callback.call(this, position);
                        })
                    }
                },
                setPano: function (element, options) {
                    var panorama = new google.maps.StreetViewPanorama(element, options);
                    if(options.events){
                        this.attachEvents(panorama, options.events);
                    }
                    this.gMap.setStreetView(panorama);
                },
                addMarker: function (options) {
                    var marker;
                    self = this;
                    options.position = {
                        lat: options.lat,
                        lng: options.lng
                    }
                    marker = this._createMarker(options);
                    this.markers.add(marker);
                    if (this.markerClusterer) {
                        this.markerClusterer.add(marker);
                    }
                    if (options.events) {
                        this._attachEvents(marker, options.events);
                    }
                    if (options.content) {
                        this._on({
                            obj: marker,
                            event: 'click',
                            callback: function () {
                                var infoWindow = new google.maps.InfoWindow({
                                    content: '<div style="color:#f00"> I like food</div>'
                                });
                                infoWindow.open(map.gMap, marker);
                            }
                        })
                    }
                    return marker;
                },

                _attachEvents: function(obj, events) {
                    var self = this;
                    options.event.forEach(function (event) {
                        self._on({
                            obj: obj,
                            event: options.event.name,
                            callback: options.event.callback
                        });
                    });
                },
                _addMarker: function(marker){
                    if (this.markers) {
                        this.markers.add(marker);
                    }
                },
                findBy: function(callback){
                    return this.markers.find(callback);
                },
                removeBy: function(callback){
                    var self = this;
                    self.markers.find(callback, function(markers) {
                        markers.forEach(function(marker){
                            if (self.markerClusterer) {
                                self.markerClusterer.removeMarker(marker);
                            } else {
                                marker.setMap(null);
                            }
                        })
                    } )
                },
                findMarkerByLat: function(lat){
                    var i=0;
                    for (; i<this.markers.length; i++) {
                        var marker = this.markers[i];
                        if (marker.position.lat === lat) {
                            return marker;
                        }
                    }
                },

                _createMarker : function(options) {
                    options.map = this.gMap;
                    return new google.maps.Marker(options);
                }
            };
        };
        return Mapster;
    }());
    Mapster.create = function () {
        return new Mapster();
    };
    window.Mapster = Mapster;
}(window,google, List))