var Auth = require('./../../controllers/nurego/nurego-authentication.js'),
    config  = require('./../configuration.js');

module.exports = function(router){

    router.get('/', function(req, res){
        res.render("index");
    })

    router.get('/pricing', function(req,res){
	    res.render("pricing");
    })

    //Login Routes
    router.get('/login', function(req,res){
        res.render("login",{success:true});
    })

    router.post('/login', function(req,res){
      Auth.getToken(req,res)
        .then((data) => {
          req.session.success = true;
          req.session.token = data.token;
          res.redirect('/home');
        }).catch((data) => {
          req.session.success = false;
          req.session.errors = data;
          res.redirect('/login',{success: req.session.success, errors:req.session.errors});
        })
    })
}
