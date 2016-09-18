var request = require('request'),
    config  = require('../../config/configuration.js');

module.exports = (function() {
	return {
        //Update an Organization
        updateOrganization: function(orgId, params, callback){
            var options = {
                url: config.nurego.base_url+'/v1/organizations/'+orgId,
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'POST',
                form: params
            };
            function callback1(error, response, body) {
                if(error){
                    callback({success: false, description: "Failed to Call Update an Organization", error: error});
                }else if (response.statusCode !== 200) {
                    callback({success: false, code: response.statusCode, response: JSON.parse(response.body) });
                }else{
                    callback({success: true, code: response.statusCode, response: JSON.parse(response.body) });
                }
                console.log("Printing: response.statusCode,body for updateOrganization \n   ",response.statusCode,body);
            }
            request(options, callback1)
		},

        // Retrieve an Organization
        retrieveOrganization: function(orgId, callback){
            var options = {
                url: config.nurego.base_url+'/v1/organizations/'+orgId,
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'GET'
            };
            function callback1(error, response, body) {
                if(error){
                    callback({success: false, description: "Failed to Call Update an Organization", error: error});
                }else if (response.statusCode !== 200) {
                    callback({success: false, code: response.statusCode, response: JSON.parse(response.body) });
                }else{
                    callback({success: true, code: response.statusCode, response: JSON.parse(response.body) });
                }
                console.log("Printing: response.statusCode,body for retrieveOrganization \n   ",response.statusCode,body);
            }
            request(options, callback1)
		}


    }
})();
