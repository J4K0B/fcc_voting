"use strict";

var polls = require("../models/polls.js");

function PollsHandler (){
    this.getPolls = function(req, res) {
        console.log("lel");
        var ende = [];
        var arr = polls.find().exec(function(err, results){
            if (err) {throw err;}
            res.send(results);
        });
        
        
        //res.send("lel");
        
    };
    
    
    
}

module.exports = PollsHandler;