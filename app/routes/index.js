'use strict';

var path = process.cwd();
var BackController = require(path+"/app/controllers/backController.js");

module.exports = function (app, passport) {
	
    var backController = new BackController();
    
    app.route("/getPolls").get(backController.getPolls);
    app.route("/getUserPolls").get(backController.getUserPolls);
    app.route("/controllers/controller.js").get(function(req,res){
        res.sendFile(path+"/app/controllers/controller.js");
    });
    app.route("/controllers/showPoll.js").get(function(req,res){
        res.sendFile(path+"/app/controllers/showPoll.js");
    });
     app.route("/common/charts.css").get(function(req,res){
        res.sendFile(path+"/app/common/charts.css");
    });
	app.route("/").get(function(req,res){
	    //res.sendFile(path+"/app/public/index.html");
	    res.render("index", {
	    	profile: "test"
	    });
	});
	app.route("/isLoggedIn").get(function(req,res){
		if(req.isAuthenticated()){
			res.send({login: true});
		}
		else{
			res.send({login: false});
		}
	});
	app.route("/new")
		.get(isLoggedIn, function (req,res){
	    res.render("new");
	    console.log(req.user._id);
		})
		.post(isLoggedIn, backController.postPolls);
	app.route("/getPollData/:id")
		.get(backController.findPolls);
	app.route("/poll/:id")
		.get(function(req,res){
			res.render("polls");
		})
		.post(backController.vote);
	app.route("/profile").get(isLoggedIn,function(req,res){
		res.render("profile");
	});
	app.route("/login")
		.get(function(req,res){
			res.render("login");
		});
	app.route("/signup")
		.get(function(req,res){
			if(req.isAuthenticated()){
				res.render("profile");
			}
			else {
				res.render("signup");
			}
		});
	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true
	}));	
	
	
	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {
	
	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();
	
	    // if they aren't redirect them to the home page
	    res.redirect('/login');
	}
};
