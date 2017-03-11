"use strict";

var polls = require("../models/polls.js");


function PollsHandler (){
    this.getPolls = function(req, res) {
        polls.find().exec(function(err, results){
            if (err) {throw err;}
            res.send(results);
        });
    };    
    this.getUserPolls = function(req, res) {
        console.log(req.user._id);
        polls.find({"creator": req.user._id}).exec(function(err, results){
            if (err) {throw err;}
            res.send(results);
        });
    };
    this.postPolls = function(req,res){
        var contents = [];
        req.body.options.forEach(function(data){
           contents.push([data, 0]); 
        });
        console.log("options" + req.body.options);
        var poll = new polls({
            name : req.body.name,
            content: contents,
            options: req.body.options,
            creator: req.user._id
            });
             
            poll.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            //res.send(data._id);
            res.redirect("poll/"+data._id);
            });
        };
    this.findPolls = function(req,res){
        var result = {};
        polls.findById(req.params.id, 'name content options', function (err, poll) {
            if (err) throw(err);
            result = {"name": poll.name,
                        "content": poll.content,
                        "options": poll.options
            };
            console.log(poll.name, poll.content, poll.options);
            res.json(result);
            
        });
    };
    this.addOptions = function(req,res){
        var id = req.params.id;
        var name = req.body.name;
        polls.findById(req.params.id, function(err,poll){
           if(err) throw err;
           var content = poll.content;
           var options = poll.options;
           console.log(content, options);
           options.push(name);
           content.push([name, 1]);
           
           polls.update({_id: id}, {$set: {"content": content, "options":options}},function(){
               console.log("neue option");
           });
        });
    };
    this.vote = function(req,res) {
        
        if (!isNaN(req.body.index)){
            var neu;
            polls.findById(req.params.id, "content",function(err, poll){
                if (err) throw (err);
                var index = req.body.index;
                console.log("index: " + index);
                neu = poll.content;
                neu[index][1]= neu[index][1] + 1;
                poll.content = neu;
                
                console.log("poll value: "+ neu[index][1]);
                
                polls.update({ _id: req.params.id }, { $set: { "content": neu }}, function(){
                  console.log("geschafft"); 
                });
            });
        }
        
    };
}
    
    
    
    


module.exports = PollsHandler;