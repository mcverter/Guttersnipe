var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + 'app/views');

app.get('*', function respondToHTTPRequest(req, res) {
    res.render('index');
});

var port = 4444;
app.listen(port);
console.log('Listening to port ' + port + '...');
