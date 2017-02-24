'use strict';

var path = process.cwd();
var BackController = require(path+"/app/controllers/backController.js");

module.exports = function (app) {
	
    var backController = new BackController();
    
    app.route("/getPolls").get(backController.getPolls);
    app.route("/controllers/controller.js").get(function(req,res){
        res.sendFile(path+"/app/controllers/controller.js");
    });
	app.route("/").get(function(req,res){
	    //res.sendFile(path+"/app/public/index.html");
	    res.render("index");
	});
	app.route("/new")
		.get(function (req,res){
	    res.render("new");
		})
		.post(backController.postPolls);
	app.route("/poll/:id")
		.get(backController.findPolls);
	app.route("/lel")
		.get(function(req,res){
			res.render("polls");
		});
};
