var mongoose = require('mongoose');
var pollDB = mongoose.model('poll');
var userDB = mongoose.model('user');
var optionDB = mongoose.model('option');

module.exports = (function() {
    return{
    		create: function(req, res){

                    pollDB.findOne({_id: req.params.id}, function(err, poll){

                        if(err)
                        {
                            console.log('DEBUG: Error to find the poll:\n', err);
                        }else if(!poll){
                            console.log('DEBUG: poll doesnt exist:\n', poll);
                        }else{
                            var option = new optionDB(req.body);
                            //  set the reference like this:
                            console.log('DEBUG: poll_id', poll._id);
                            option._poll = poll._id;
                            // now save both to the DB
                            option.save(function(error,resultOption){
                                if(error){
                                    console.log('DEBUG: Error to save the option:\n', option);
                                    console.log('DEBUG: Error to save the option, Error:\n', error);
                                    res.json(error);
                                }else{
                                    poll._options.push(option);
                                    poll.save(function(err,result){
                                         if(err) {
                                              console.log('DEBUG: Error to save the poll:\n', poll);
                                              console.log('DEBUG: Error to save the poll, Error:\n', err);
                                              res.json(err);
                                         } else {
                                              res.json(resultOption);
                                         }
                                     });    //end of poll save
                                }

                            });             //end of option save
                        }


                    });
                },
                get: function(req, res){
                    optionDB.find({_poll: req.params.id})
                    .populate('_user')
                    .populate('_options')
                    .exec(function(err, result){
                        console.log('DEBUG: Printing req.params.id @options controller:\n', req.params.id);
                        if(err){
                            console.log('Debug: getting options failed in option controller...\n',err);
                        } else if(!result){
                            console.log('Debug: getting options: Result is empty in option controller...\n',result);
                            res.json(result);
                        }else{
                            res.json(result);
                            console.log('Debug: Result is...\n',result);
                        }
                    })
                },
                vote: function(req,res){
                    console.log('Debug: Yakup req.params.id...\n',req.params.id);
                    console.log('Debug: Yakup req.params.id...\n',req.body);
                    optionDB.findOne({_id: req.params.id}, function(err, option){
        				if(err){
        					console.log('coudlnt find option', err);
        				} else {
                            if(!option._users.indexOf(req.body.user))
                            {
                                option.vote +=1;
                                option.save(function(err, result){
            						if(err){
            							console.log('couldnt save update option', err);
            						} else {
            							console.log('saved option ', result);
            							res.json(result);
            						}
        					})
        				}
        			}
                })
                }
            }
})();
