var config  = require('./config.js');
var nurego = require('./../controllers/customers.js');
var auth = require('./../controllers/nurego-auth.js');
var registration = require('./../controllers/nurego-register.js');
var organization = require('./../controllers/nurego-org.js');
var jwt = require('jwt-simple');
 // var options = require('./../controllers/options.js');
module.exports = function(app){


    app.get('/dashboard', function(req,res){
        if(!req.session.success){
            res.redirect('/login');
        }else{
            console.log(req.session.token.access_token);
            var decoded=jwt.decode(req.session.token.access_token, config.uaa.client_secret,'RS256');
            console.log(decoded.user_id);
            res.render("dashboard");
        }
    })


}
