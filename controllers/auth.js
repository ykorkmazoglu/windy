var config = require('../config/configuration.js'),
express = require('express'),
Auth = require('../nurego_lib/nurego-authentication.js');

//before rebase
module.exports = function(app){
  var router = express.Router({mergeParams: true});


  //Login Routes
  router.get('/login', function(req,res){
    if(!req.session.auth){
      req.session.auth={
        isLoggedIn: false,
        token: null,
        errors: null
      };
    }
    res.render("login",{error: req.session.auth.errors});
  });

  router.post('/login', function(req,res){
    var params = req.body;
    Auth.getToken(params)
    .then((data) => {
      req.session.auth=data.auth;
      var toUrl = req.session.originalUrl;
      delete req.session.originalUrl;
      res.redirect(toUrl || '/home' );
    }).catch((data) => {
      req.session.auth=data.auth;
      res.redirect('/login');
    });
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
  return router;
};
