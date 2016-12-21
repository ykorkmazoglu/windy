var express = require('express'),
Reg  = require('../../nurego_lib/nurego-registration.js'),
Org  = require('../../nurego_lib/nurego-organization.js'),
Acct  = require('../../nurego_lib/nurego-account.js'),
Auth = require('../../nurego_lib/nurego-authentication.js');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  router.get('/', function(req,res){
    req.session.userId=jwt.decode(req.session.token.access_token, config.uaa.client_secret,'RS256').user_id;
      //will work on this
  });

  app.use('/', router);
  // app.use('/home', auth, require('./users')(app, {}));

  return router;
};
