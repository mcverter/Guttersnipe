(function() {
    function Place(coordinates, address, name, notes) {

        var self = this;
        if (!coordinates || !coordinates.lat
            || coordinates.lng || !address ) {
            console.error('Error: Coordinates or address are undefined. Coords', coordinates, ' address ', address);
        }
        self.coordinates = coordinates;
        self.address = address;
        self.name = name;
        self.notes = notes;
    }
})();


