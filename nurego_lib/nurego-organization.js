var request = require('request'),
    config  = require('../config/configuration.js');

module.exports = (function() {
	return {
        //Update an Organization
        updateOrganization: function(orgId, params){

          return new Promise(function(resolve,reject){

            var options = {
                url: config.nurego.base_url+'/v1/organizations/'+orgId,
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'POST',
                form: params
            };
            function callback(error, response, body) {
              body = typeof body == 'string' ? JSON.parse(body) : body;
              if(error){
                reject({ error: error});
              }else if(response.statusCode != 200 ){
                reject({statusCode: response.statusCode, error: body });
              }else{
                resolve({statusCode: response.statusCode, body: body });
              }
            }
            request(options, callback)
          })
        },

        // Retrieve an Organization
        retrieveOrganization: function(orgId){

          return new Promise(function(resolve,reject){
            var options = {
                url: config.nurego.base_url+'/v1/organizations/'+orgId,
                headers: {
                    'Accept': 'application/json',
                    'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
                },
                method: 'GET'
            };
            function callback(error, response, body) {
              body = typeof body == 'string' ? JSON.parse(body) : body;
              if(error){
                reject({ error: error});
              }else if(response.statusCode != 200 ){
                reject({statusCode: response.statusCode, error: body });
              }else{
                resolve({statusCode: response.statusCode, body: body  });
              }
            }
            request(options, callback)
          })
		}
    }
})();
