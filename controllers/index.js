var express = require('express'),
jwt = require('jwt-simple'),
config = require('../config/configuration.js');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  var auth = function(req, res, next) {
    if (req.session.auth && req.session.auth.isLoggedIn) {
      var expires_at = jwt.decode(req.session.auth.token.access_token, config.uaa.client_secret,'RS256').exp;
      var now = Date.now() / 1000 | 0;

      if (now < expires_at ){
        next();
      }
    } else {
      req.session.originalUrl = req.originalUrl;
      res.redirect('/login');
    }
  };

  router.get('/', function(req, res){
    res.render("index", { title: 'Windy.io' });
  });

  router.get('/pricing', function(req,res){
    res.render("pricing", { title: 'Windy.io - Offerings' });
  });

  app.use('/', router);
  app.use('/registration',require('./registration')(app));
  app.use('/', require('./auth.js')(app));
  app.use('/user', auth, require('./user')(app));

  return router;
};
