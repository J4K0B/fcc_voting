"use strict";

var polls = require("../models/polls.js");


function PollsHandler (){
    this.getPolls = function(req, res) {
        console.log("lel");
        var arr = polls.find().exec(function(err, results){
            if (err) {throw err;}
            res.send(results);
        });
    };    
    this.postPolls = function(req,res){
        var poll = new polls({
            name : req.body.name,
            content: req.body.options
            });
             
            poll.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            res.send(data._id);
            });
        };
    this.findPolls = function(req,res){
        res.send(req.params.id);
        polls.findById(req.params.id, 'name content', function (err, poll) {
  if (err) throw(err);
  console.log(poll.name, poll.content);
});
    };
    
    
    
    
}

module.exports = PollsHandler;