(function(window, mapster) {
    // map options
    var options = mapster.MAP_OPTIONS;
    var element = document.getElementById("map-canvas");
    // map
    var map = mapster.create(element, options);
    map._on('click', function(){
        alert('click');
        console.log(e);
    });
    map._on('dragend', function(){
        alert('I have finished dragging');
    });
    /*
     * mapicons.nicholasmollet.com
     */
    var marker = map.addMarker({
        lat: 888888.8888888,
        lng: 8888.888888,
        draggable: true,
        icon: 'http://www.google.com',
        content: 'I like food',
        events: [{
            name: 'click',
            callback: function(e, marker) {
                alert("clicky click");
            }
        },
            {
                name: 'dragend',
                callback: function() {
                    alert("dragged");
                }
            }]

    });
    var found = map.removeBy(function(marker){
        return marker.id === 2;
    })



}(window, window.Mapster || (window.Mapster={})));