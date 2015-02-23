var env = process.env.NODE_ENV = 'localhost', //process.env.NODE_ENV || 'development',
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  app = express()
  var db = {};

if (env === 'localhost') {
  mongoose.connect('mongodb://localhost/guttersnipe');
}
else {
  mongoose.connect('mongodb://mongo_guttersnipe:guttersnipe_mongo@ds061370.mongolab.com:61370/guttersnipe');
}
db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error ..."));
db.once('open', function callback(){
  console.log('guttersnipe db opened');
});


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.get('*', function respondToHTTPRequest(req, res) {
  console.log("responding to get request")
  res.sendFile( __dirname + '/server/views'+'/index.html');
});

var port = process.env.PORT || 4444;
app.listen(port);
console.log('Listening to port ' + port + '...');



/*
 app.post('/api/todos', function(req, res){
 Todo.create({
 text: req.body.text,
 done: false
 }, function(err, todo) {
 if (err){
 res.send(err);
 }
 res.json(todos);
 }
 );
 });

 app.delete('/api/todos/:todo_id', function(req, res){
 Todo.remove({
 _id: req.params.todo_id
 }, function(err, todo) {
 if (err){
 res.send(err);
 }
 Todo.find(function(err, todos){
 if (err){
 res.send(err);
 }
 res.json(todos);
 })
 }
 );
 });


//  Let's use public ...
 app.get('*', function (req, res){
 res.sendfile('./public/index.html');
 });
 */
