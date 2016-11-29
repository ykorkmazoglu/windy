var request = require('request'),
config  = require('../config/configuration.js');

module.exports = (function() {
  return {
    // Retrieve Customer Details
    retrieveCustomer: function(custId){

      return new Promise(function(resolve,reject){
        var options = {
          url: config.nurego.base_url+'/v1/customers/'+custId,
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
          }else if (response.statusCode !== 200) {
            reject({statusCode: response.statusCode, error: body });
          }else{
            resolve({statusCode: response.statusCode, body: body });
          }
        }
        request(options, callback);
      });
    }
  };
})();
