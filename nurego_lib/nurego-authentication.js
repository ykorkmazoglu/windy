var config  = require('../config/configuration.js');
var request = require('request');

module.exports = (function() {
	return {

    //Get token by grant_type=password
    getToken: function(params){

        return new Promise(function(resolve,reject){

            var basicAuth= new Buffer(config.uaa.client_id+':'+config.uaa.client_secret).toString('base64');
            params.grant_type = "password";
            var options = {
                url: config.uaa.url+'/oauth/token',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic '+basicAuth
                },
                method: 'POST',
                form: params
            };
            function callback(error, response, body) {
                if(error){
                  reject({ error: error});
                }else if(response.statusCode != 200 ){
                  reject({statusCode: response.statusCode, error: response.body});
                }else{
                  resolve({statusCode: response.statusCode, token: response.body });
                }
            }
            request(options, callback)
        })
		}
  }
})();
