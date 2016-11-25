var express = require('express');

module.exports = function(app){
  var router = express.Router({mergeParams: true});

  router.get('/', function(req, res){
    res.render("index", { title: 'Windy.io' });
  });

  router.get('/pricing', function(req,res){
    res.render("pricing", { title: 'Windy.io - Offerings' });
  });




  app.use('/', router);
  app.use('/registration',require('./registration')(app));
  app.use('/', require('./auth.js')(app));
  // app.use('/home', auth, require('./users')(app, {}));

  return router;
};
