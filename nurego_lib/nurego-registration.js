var request = require('request'),
    config  = require('../config/configuration.js');

module.exports = (function() {
	return {

        //Complete Registration
        completeRegistration: function(regId, params){

          return new Promise(function(resolve,reject){
            var options = {
                url: config.nurego.base_url+'/v1/registrations/'+regId+'/complete',
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'POST',
                form: params
            };
            function callback(error, response, body) {
                if(error){
                    reject({success: false, description: "Failed to Call Registration Complete", error: error});
                }else if (response.statusCode !== 201) {
                    reject({success: false, code: response.statusCode, response: JSON.parse(response.body) });
                }else{
                    resolve({success: true, code: response.statusCode, response: JSON.parse(response.body) });
                }
            }
            request(options, callback);
          })


		}
    }
})();
