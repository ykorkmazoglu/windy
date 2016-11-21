var request = require('request'),
    config  = require('../config/configuration.js');

module.exports = (function() {
	return {
        //Update an Account
        updateAccount: function(acctId, params){

          return new Promise(function(resolve,reject){
            var options = {
                url: config.nurego.base_url+'/v1/accounts/'+acctId,
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'PUT',
                form: params
            };
            function callback(error, response, body) {
                if(error){
                    reject({success: false, description: "Failed to Call Update an Organization", error: error});
                }else if (response.statusCode !== 200) {
                    reject({success: false, code: response.statusCode, response: JSON.parse(response.body) });
                }else{
                    resolve({success: true, code: response.statusCode, response: JSON.parse(response.body) });
                }
                console.log("Printing: response.statusCode,body for updateAccount \n   ",response.statusCode,body);
            }
            request(options, callback)
          })

		}
    }
})();
