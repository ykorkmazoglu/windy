var config  = require('../config/configuration.js');
var request = require('request');

module.exports = (function() {
  return {
    //Get token by grant_type=password
    getToken: function(params){
      console.log("i am here 4\n",params);
      console.log("typeof params",typeof params);
      return new Promise(function(resolve,reject){
        var auth={};
  console.log("i am here 4a",params);
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
          body = typeof body == 'string' ? JSON.parse(body) : body;
          if(error){
            reject({ error: error});
          }else if(response.statusCode != 200 ){
              console.log("i am here 5\n",{statusCode: response.statusCode, error: body });
              auth = {
                isLoggedIn: false,
                token: null,
                errors: body
              };
            reject({statusCode: response.statusCode, auth: auth });
          }else{
              console.log("i am here 6");
              auth = {
                isLoggedIn: true,
                token: body,
                errors: null
              };
            resolve({statusCode: response.statusCode, auth: auth });
          }
        }
      request(options, callback);
      });
    }
  }; //return
})();
