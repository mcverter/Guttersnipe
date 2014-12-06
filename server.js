var express = require('express'),
    mongoose = require('mongoose');
mongoose.connect('mongodbL//localhost/test');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//app.use(bodyParser());
//app.use(logger('dev'))
app.use(express.static(__dirname + '/public'));

app.get('*', function respondToHTTPRequest(req, res) {
    res.sendFile( __dirname + '/server/views'+'/index.html');
});

var port = process.env.PORT || 4444;
app.listen(port);
console.log('Listening to port ' + port + '...');
