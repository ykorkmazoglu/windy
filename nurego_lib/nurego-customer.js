var request = require('request'),
config  = require('../config/configuration.js'),
jwt = require('jwt-simple');

module.exports = (function() {
  return {
    // Retrieve Customer Details
    retrieveCustomer: function(custId){

      return new Promise(function(resolve,reject){
        var options = {
          url: config.nurego.base_url+'/v1/customers/'+custId,
          headers: {
            'Accept-Charset': 'CHARSET',
            'Accept': 'application/json',
            'X-NUREGO-AUTHORIZATION': 'Bearer '+config.nurego.private_api_key
          },
          method: 'GET'
        };
        function callback(error, response, body) {
          if(error){
            reject({success: false, description: "Failed to Call Retrieve a Customer", error: error});
          }else if (response.statusCode !== 200) {
            reject({success: false, code: response.statusCode, response: JSON.parse(response.body) });
          }else{
            resolve({success: true, code: response.statusCode, response: JSON.parse(response.body) });
          }
        }
        request(options, callback);
      });

    }


  };
})();
