(function() {
    function Thing(description, taxonomy) {

    var self = this;
    if (!description || !description.summary) {
        console.error('Error:  No thing summary');
    }
    if (!taxonomy || !taxonomy.type) {
        console.error('Error:  No thing type');
    }
    self.description = description;
    self.taxonomy = taxonomy;
}
})()

