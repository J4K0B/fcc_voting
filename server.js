'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/polls';
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash    = require('connect-flash');
var passport = require('passport');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set("view engine", "pug");
app.set('views', './app/views');

require('./app/config/passport')(passport); // pass passport for configuration

app.use(session({ secret: 'jakobistdergeilstelelelel' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

routes(app, passport);
mongoose.connect(url);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
