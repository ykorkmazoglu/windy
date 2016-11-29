var express = require('express'),
Reg  = require('../../nurego_lib/nurego-registration.js'),
Org  = require('../../nurego_lib/nurego-organization.js'),
Acct  = require('../../nurego_lib/nurego-account.js'),
Auth = require('../../nurego_lib/nurego-authentication.js');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  //Registration Routes
  router.get('/', function(req,res){
    req.session.reg = {
      id: req.query.registrationId
    };
    res.render('registration');
  });

  router.post('/complete', function(req,res){
    //Completing the Registration
    req.session.reg.pwd = req.body.pwd1;
    var params = {password: req.body.pwd1};
    Reg.completeRegistration(req.session.reg.id, params)
    .then((data) => {
      req.session.customer = data.body;
      req.session.reg.email = req.session.customer.email;
      //Updating Organization Name
      var params = {name: req.body.orgName};
      return Org.updateOrganization(req.session.customer.organization_id, params);
    })
    .then((data) => {
      return Org.retrieveOrganization(req.session.customer.organization_id);
    })
    .then((data) => {
      req.session.org = data.body;
      var params = {name: req.body.acctName};
      return Acct.updateAccount(req.session.org.account_no, params);
    })
    .then((data) => {
      req.session.account = data.body;
      var params = {username: req.session.reg.email,password:req.session.reg.pwd};
      return Auth.getToken(params);
    })
    .then((data) => {
      req.session.auth=data.auth;
      res.redirect('/user/dashboard' );
    })
    .catch((error) => {
      res.redirect('/logout');
    });

  });   //end of registration complete
  app.use('/', router);

  return router;
};
