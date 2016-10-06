var express = require('express'),
    http = require('http'),
    path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 5002);

  app.use(express.favicon());
  app.use(express.logger('dev'));
//  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.static(path.join(__dirname, 'dist')));

  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log("server listening on port " + app.get('port'));
});