var config  = require('../../config/configuration.js');
var request = require('request');

module.exports = (function() {
	return {

    //Get token by grant_type=password
    getToken: function(req, res){

        return new Promise(function(resolve,reject){

            var basicAuth= new Buffer(config.uaa.client_id+':'+config.uaa.client_secret).toString('base64');
            req.body.grant_type = "password";
            var options = {
                url: config.uaa.url+'/oauth/token',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic '+basicAuth
                },
                method: 'POST',
                form: req.body
            };
            function callback(error, response, body) {
                if(error){
                    reject({loggedIn: false, description: "Failed to Call UAA", Error: error});
                }else if (response.statusCode !== 200) {
                    reject({loggedIn: false, code: response.statusCode, body: JSON.parse(response.body) });
                }else{
                    resolve({loggedIn: true, code: response.statusCode, token: JSON.parse(response.body) });
                }

            }
            request(options, callback)
        })
		}
  }
})();
