(function() {
    function MapEntry(title, coordinates, linkToListing) {
        this.title = title;
        this.coordinates = coordinates;
        this.linkToListing = linkToListing;

    }

    function populateMapLocations(resources) {
        _.forEach(resources, function (resource) {
                mapEntries.push(new MapEntry(
                    resource.place.coordinates,
                    resource.thing.description.headline,
                    linkToListing = resource._id));
            }
        )
    }
})();
