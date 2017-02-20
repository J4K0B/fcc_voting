'use strict';

var path = process.cwd();
var BackController = require(path+"/app/controllers/backController.js");

module.exports = function (app) {
    var backController = new BackController();
    
    app.route("/").get(backController.getPolls);
    app.route("/controllers/controller.js").get(function(req,res){
        res.sendFile(path+"/app/controllers/controller.js");
    });
	
};
