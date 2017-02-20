"use strict";

var polls = require("../models/polls.js");

function PollsHandler (){
    this.getPolls = function(req, res) {
        console.log("lel");
        polls.findOne({name: "best program"})
        .exec(function (err, result){
            if(err) {throw err;}
            res.json(result);
        });
        
        //res.send("lel");
        
    };
    
    
    
}

module.exports = PollsHandler;