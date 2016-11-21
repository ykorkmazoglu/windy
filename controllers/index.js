// require('../lib/modules/main.js');
var config = require('../config/configuration.js');
var express = require('express');
var url = require('url');
var Reg  = require('../nurego_lib/nurego-registration.js'),
    Org  = require('../nurego_lib/nurego-organization.js'),
    Acct  = require('../nurego_lib/nurego-account.js'),
    Auth = require('../nurego_lib/nurego-authentication.js');
// var async = require("async");

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  router.get('/', function(req, res){
      res.render("index", { title: 'Windy.io' });
  })

  router.get('/pricing', function(req,res){
    res.render("pricing", { title: 'Windy.io - Offerings' });
  })

  //Registration Routes
  router.get('/registration', function(req,res){
      req.session.reg = {
        id:req.query.registrationId,
        errors:false
      };
    res.render('registration');
  })

  router.post('/registration/complete', function(req,res){
      req.session.reg.pwd = req.body.pwd1;
      req.session.org = {
        name: req.body.orgName
      };
      req.session.acct = {
        name: req.body.acctName
      };

      //Completing the Registration
      var params = {password: req.session.reg.pwd};
      Reg.completeRegistration(req.session.reg.id, params)
        .then((data) => {
            req.session.org.id=data.response.organization_id;
            //Updating Organization Name
            var params = {name: req.session.org.name};
            return Org.updateOrganization(req.session.org.id, params)})
        .then((data) => {
            return Org.retrieveOrganization(req.session.org.id);})
        .then((data) => {
            req.session.acct.id = data.response.account_no;
            return Acct.updateAccount(req.session.acct.id, params);})
        .then((data) => {
            res.redirect('/home');})
        .catch((error) => {
          console.log("Printing the Error\n: ",error);
        })

  })   //end of registration complete

  // router.get('/session', auth, function(req, res) {
  //   res.status(200).send(req.session);
  // });

  app.use('/', router);
  app.use('/', require('./auth.js')(app));
  // app.use('/home', auth, require('./users')(app, {}));


  return router;
};
