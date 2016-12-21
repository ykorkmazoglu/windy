var express = require('express');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  var auth = function(req, res, next) {
    if (req.session.auth && req.session.auth.isLoggedIn) {
      next();
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
  app.use('/user', auth, require('./user')(app));
  app.use('/', require('./auth.js')(app));
  // app.use('/home', auth, require('./users')(app, {}));

  return router;
};
