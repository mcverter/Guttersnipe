function Component(opts, events){
    var self = this;
    self.setValues(opts);
    self.setListeners(events);
    self.setPosition({position:'',border:'', padding:'',
        display:'', zIndex:'', horizPos: '', vertPos: ''});
};


