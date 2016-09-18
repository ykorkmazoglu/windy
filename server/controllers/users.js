var mongoose = require('mongoose');
var userDB = mongoose.model('user');

module.exports = (function() {
    return {
		return: function(req, res){
		          // this should probably be findOne isntead of find
		          userDB.findOne(req.body)
                  .populate('_polls')
                  .populate('_votes')
                  .exec(function(err, result){
		                if(err){
					        console.log("Debug: failed to look up the user in users controller ...\n", req.body);
				        }else if(!result){
                                newUser = new userDB(req.body);
                                newUser.save(function(err, result){
                                        if(err){
                                            console.log('Debug: failed to save the new user in users controller ...\n',err);
                                        }else{
                                            console.log("Debug: the new user has been created ...\n", result);
                                            res.json(result);
                                        }
                                })
                        }else
                            {
                                console.log("Debug: the user already exist ...\n", result);
                                res.json(result);
                        }
            })  //findOne
        } //return
	}   //return
})();
