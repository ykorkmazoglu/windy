console.log('Debug: db.js running...');

var mongoose = require('mongoose');

var fs = require('fs');

mongoose.connect('mongodb://localhost/Poll', function(err, db){
  if(err){
    console.log("Debug:\nERROR: Cannot connect to Mongo DB...");
    console.log(err);
  }
});

var models_path = __dirname + "/../models"

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0) {
		require(models_path + '/' + file);
	}
})
