console.log('Debug: User Model running...');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	name: String,
    _polls: [{type: Schema.Types.ObjectId, ref: 'poll'}],
    _votes: [{type: Schema.Types.ObjectId, ref: 'option'}]
},{timestamps:true});

mongoose.model('user', UserSchema);

// Validations
UserSchema.path('name').required(true, 'Name cannot be blank');
