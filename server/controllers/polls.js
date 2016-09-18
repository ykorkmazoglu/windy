var mongoose = require('mongoose');
var pollDB = mongoose.model('poll');
var userDB = mongoose.model('user');

module.exports = (function() {
    return{
    		create: function(req, res){

                    userDB.findOne({_id: req.params.id}, function(err, user){

                        if(err)
                        {
                            console.log('DEBUG: Error to find the user:\n', err);
                        }else if(!user){
                            console.log('DEBUG: User doesnt exist:\n', user);
                        }else{
                            var poll = new pollDB(req.body);
                            //  set the reference like this:
                            console.log('DEBUG: user_id', user._id);
                            poll._user = user._id;
                            // now save both to the DB
                            poll.save(function(err,resultPoll){
                                user._polls.push(poll);
                                user.save(function(err,result){
                                     if(err) {
                                          console.log('Error: ',err);
                                     } else {
                                          res.json(resultPoll);
                                     }
                                 });
                            });
                        }


                    });
                },  //end of create
            index: function(req, res){
                pollDB.find({})
                .populate('_user')
                .populate('_options')
                .exec(function(err, result){
                    if(err){
                        console.log('Debug: index failed in poll controller...\n',err);
                    } else {
                        res.json(result);
                    }
                })
            },  //end of index
            delete: function(req, res,callback){

                pollDB.findOne({_id: req.params.id}, function(err, pollRemoved){

                    pollRemoved.remove(function(err){
                        if(!err){
                            console.log("Deleted\n");
                            callback();
                        }else{
                            console.log('Debug: failed...\n',err);
                        }
                    })
                });


            }  //end of delete
        }   //end of return
})();
