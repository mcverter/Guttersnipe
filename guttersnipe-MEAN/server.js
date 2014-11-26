// server.js

// modules =============
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var mongoose = require('mongoose');
//var process = require('process');


// configuration =====

// config files
var db = require ('./config/db');

// set our port
var port = process.env.PORT || 8000

// connect to db
mongoose.connect(db.url);

// get data from param
app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.ap_json'});


app.use(bodyParser.urlencoded({extended: true}));

app.user(methodOverride('X-HTTP-Method-Override')));

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

app.listen(port);
console.log('Magic on port' + port);

exports = module.exports = app;