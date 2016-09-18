console.log('Debug: Poll Model running...');
var mongoose = require('mongoose');
var optionDB = mongoose.model('option');
var user = require('./user');
var userDB = mongoose.model('user');


var Schema = mongoose.Schema;
var PollSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'user'},
	_options: [{type: Schema.Types.ObjectId, ref: 'option'}],
	question: String
},{timestamps:true});


// Validations
PollSchema.path('question').required(true, 'Question cannot be blank');

PollSchema.pre('remove', function(next) {
    console.log("I am here in pre remove\n",this._id);
    // optionDB.find({_poll: this._id }, function(err, optionDelete) {
    //     console.log("Printing options\n",optionDelete);
    //
    //     optionDelete.remove(function(err){
    //     if(err){
    //         console.log("Deleting options failed...\n",err);
    //     }
    // });
    // });
    optionDB.remove({_poll: this._id },function(err, result){
        if(err)
        {
            console.log("Error to remove options\n",err);
        }else {
            console.log("Options been removed\n",result);
        }
    })
    //update the user _poll
    userDB.update(
       {_id: this._user},
       {$pull: {_polls: this._id}},
       {multi: true},
        next
   );
    next();
});

mongoose.model('poll', PollSchema);
