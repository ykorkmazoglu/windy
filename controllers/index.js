var express = require('express'),
Reg  = require('../nurego_lib/nurego-registration.js'),
Org  = require('../nurego_lib/nurego-organization.js'),
Acct  = require('../nurego_lib/nurego-account.js'),
Auth = require('../nurego_lib/nurego-authentication.js');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  router.get('/', function(req, res){
    res.render("index", { title: 'Windy.io' });
  });

  router.get('/pricing', function(req,res){
    res.render("pricing", { title: 'Windy.io - Offerings' });
  });

  //Registration Routes
  router.get('/registration', function(req,res){
    req.session.reg = {
      id: req.query.registrationId
    };
    res.render('registration');
  });

  router.post('/registration/complete', function(req,res){
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
      return Org.retrieveOrganization(req.session.customer.organization_id);
    })
    .then((data) => {
      req.session.org = data.body;
      console.log("req.session.org\n",req.session.org);
      var params = {name: req.body.acctName};
      return Acct.updateAccount(req.session.org.account_no, params);
    })
    .then((data) => {
      req.session.acct = data.body;
      console.log("req.session.acct\n",req.session.acct);
      return Auth.authorize({email: req.session.reg.email,password:req.session.reg.pwd},req.session);
    })
    .then((data) => {
      console.log("req.session.auth\n",req.session.auth);
      res.redirect('/home');
    })
    .catch((error) => {
      res.redirect('/logout');
    });

  });   //end of registration complete

  app.use('/', router);
  app.use('/', require('./auth.js')(app));
  // app.use('/home', auth, require('./users')(app, {}));

  return router;
};
