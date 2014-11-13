(function(window, Mapster){
    $.widget( "mapster.mapster", {
        // default options
        options: {},

        // the constructor
        _create: function() {
            console.log('create');
            var element = this.element[0];
            var options = this.options;
            console.log(this);
            this.map = Mapster.create(element, options);
        },

        // called when created, and later when changing options
        _refresh: function() {
        },

        addMarker: function(opts) {
            var self=this;
            if (opts.location) {
                this.geocode({
                    address: opts.location,
                    success: function(results) {
                        results.forEach(function(results){
                            opts.lat = results.geometry.location.lat();
                            opts.lng = results.geometry.location.lng();
                            self.map.addMarker(opts);

                        })
                    },
                    error: function (status) {
                        console.error(status);
                    }
                })
            }
            else {
                return this.map.addMarker(opts)
            }
        },
        findMarkers: function(callback) {
            return this.map.findBy(callback);

        },

        setPano: function(selector, opts) {
            var elements = $(selector);
            var self = this;
            $.each(elements, function(key, element) {
                self.map.setPano(element, opts);
            });
        },
        getCurrentPosition: function(callback) {
            this.map.getCurrentPosition(callback);
        },
        removeMarkers: function(callback) {
            this.map.removeMarkers(callback);
        },
        // events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function() {},

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            // prevent invalid color values
            if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
                return;
            }
            this._super( key, value );
        }
    });
}(window, Mapster))