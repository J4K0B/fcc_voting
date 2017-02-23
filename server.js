'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/polls';
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set("view engine", "pug");
app.set('views', './app/views');

routes(app);
mongoose.connect(url);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
