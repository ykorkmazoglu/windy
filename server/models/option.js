console.log('Debug: Product Model running...');
var mongoose = require('mongoose');
var user = require('./user');
var userDB = mongoose.model('user');



var Schema = mongoose.Schema;
var OptionSchema = new mongoose.Schema({
    name: {type: String, minlength: 4 },
    vote: { type: Number, default: 0 },
    _users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    _poll: {type: Schema.Types.ObjectId, ref: 'user'}

},{timestamps:true});

mongoose.model('option', OptionSchema);

// Validations
OptionSchema.path('name').required(true, 'Name cannot be blank');

OptionSchema.pre('remove', function(next) {
    console.log("I am here in pre remove OptionSchema\n",this._id);
    userDB.update(
       {_id: {$in: this._users}},
       {$pull: {_votes: this._id}},
       {multi: true},
        next
   );
    next();
});

// mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'Puppy'
// var Message = mongoose.model('Message') // We are retrieving this Schema from our Models, named 'Puppy'
