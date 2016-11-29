var express = require('express'),
    jwt = require('jwt-simple'),
    config = require('../../config/configuration.js'),
    Cus  = require('../../nurego_lib/nurego-customer.js');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  router.get('/', function(req,res){
    res.status(200).send(jwt.decode(req.session.auth.token.access_token, config.uaa.client_secret,'RS256'));
  });

  router.get('/dashboard', function(req,res){
    console.log("user id\n",jwt.decode(req.session.auth.token.access_token, config.uaa.client_secret,'RS256').user_id);

    var customerId = jwt.decode(req.session.auth.token.access_token, config.uaa.client_secret,'RS256').user_id;

    Cus.retrieveCustomer(customerId)
    .then((data) => {
      req.session.customer = data.body.data[0];
      req.session.entitlement = data.body.data[0].subscriptions.data[0].usage;

      console.log("req.session.entitlement\n",req.session.entitlement);
      console.log("req.session.customer\n",req.session.customer);
      res.render("dashboard");
    })
    .catch((error) => {
      console.log("Error:\n",error);
    });
  });

  app.use('/', router);
  return router;
};
