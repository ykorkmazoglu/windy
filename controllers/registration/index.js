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
      console.log("req.session.customer\n",req.session.customer);
      req.session.reg.email = req.session.customer.email;
      //Updating Organization Name
      var params = {name: req.body.orgName};
      return Org.updateOrganization(req.session.customer.organization_id, params);
    })
    .then((data) => {
      console.log("typeof data 1\n",typeof data);
      return Org.retrieveOrganization(req.session.customer.organization_id);
    })
    .then((data) => {
      console.log("typeof data 1\n",typeof data);
      req.session.org = data.body;
      console.log("req.session.org.account_no\n",req.session.org.account_no);
      var params = {name: req.body.acctName};
      console.log("params in account\n",params);
      return Acct.updateAccount(req.session.org.account_no, params);
    })
    .then((data) => {
      console.log("typeof data 1\n",typeof data);
      req.session.account = data.body;
      console.log("email: req.session.reg.email\n",req.session.reg.email);
      console.log("email: req.session.reg.pwed\n",req.session.reg.pwd);
      var params = {username: req.session.reg.email,password:req.session.reg.pwd};
      console.log("req.session.acct\n",JSON.stringify(req.session.account));

    return Auth.getToken(params);
    })
    .then((data) => {
      req.session.auth=data.auth;
      console.log("Auth in index.js",req.session.auth);
      res.redirect('/home' );
    })
    .catch((error) => {
        console.log("i am here 2",error);
      res.redirect('/logout');
    });

  });   //end of registration complete

  app.use('/', router);
  // app.use('/home', auth, require('./users')(app, {}));

  return router;
};
