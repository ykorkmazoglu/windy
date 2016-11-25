var config  = require('../config/configuration.js');
var request = require('request');

module.exports = (function() {
  return {
    //Get token by grant_type=password
    getToken: function(params){
      console.log("i am here 4\n",params);
      return new Promise(function(resolve,reject){
  console.log("i am here 4",params);
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
            reject({statusCode: response.statusCode, error: body });
          }else{
              console.log("i am here 6");
            resolve({statusCode: response.statusCode, token: body });
          }
        }
        request(options, callback);
      });
    },
    authorize: function(params){
      console.log("i am here 3\n",params);
      return new Promise(function(resolve,reject){
        //Authorize the cutomer automatically
        var auth={};
        var _this=this;
          console.log("i am here 3\n",params);
        _this.getToken(params)
        .then((data) => {
            console.log("i am here 7");
          auth = {
            isLoggedIn: true,
            token: data.token,
            errors: null
          };
          resolve({auth: auth});
        })
        .catch((data) => {
            console.log("i am here 8");
          auth = {
            isLoggedIn: false,
            token: null,
            errors: data.error
          };
          reject({auth: auth});
        });
      });
    }
  }; //return
})
();
