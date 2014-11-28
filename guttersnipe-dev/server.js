var express = require('express');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function respondToHTTPRequest(req, res) {
   // res.set('Content-Type', mime.lookup(x));
   // res.setHeader('content-type', 'text/javascript');
    res.render('index');
});

var port = 4444;
app.listen(port);
console.log('Listening to port ' + port + '...');
