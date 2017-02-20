'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/polls';

var app = express();

routes(app);
mongoose.connect(url);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
