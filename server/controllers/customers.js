var request = require('request');

module.exports = (function() {
	return {
		priceList: function(req, res,callback){

            var options = {
              url: 'https://am-staging.nurego.com/v1/'+req.url.substring(12),
              headers: {
                'X-NUREGO-AUTHORIZATION': 'Bearer '+'lpa6da95-1236-4b5c-a5b3-f5b220c54e7f'
              }
            };
            function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
              }
            }
            request(options, callback)

		},
		create: function(req, res){
			mongoose = new customerDB(req.body);
			mongoose.save(function(err, result){
				if(err){
                    console.log('Debug: create failed in customer controller...\n',err);
				} else {
					res.json(result);
				}
			})
		},
		show: function(req, res){
			// this should probably be findOne isntead of find
			customerDB.findOne({_id: req.params.id}, function(err, result){
				if(err){
					console.log("Debug: show failed in customer controller ...\n", err);
				} else {
					res.json(result);
				}
			})
		},
		update: function(req, res){
			customerDB.findOne({_id: req.params.id}, function(err, result){
				if(err){
					console.log('Cannot find customer', err);
				} else {
					result.name = req.body.name;
					result.save(function(err, result){
						if(err){
							console.log('Cannot save (update) customer', err);
						} else {
							console.log('Found the customer ', result);
							res.json(result);
						}
					})
				}
			})
		}
	}
})();
