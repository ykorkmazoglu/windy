var Auth = require('./../controllers/nurego/nurego-authentication.js');

module.exports = function(app){

    app.get('/', function(req, res){
        console.log('Debug: Hit the route GET / ...');
        res.render("index");
    })

    app.get('/pricing', function(req,res){
        console.log('Debug: Hit the route GET /pricing ...');
	    res.render("pricing");
    })

    //Login Routes
    app.get('/login', function(req,res){
        console.log('Debug: Hit the route GET /pricing ...');
        res.render("loginNew",{success:true});
    })

    app.post('/confirm_login', function(req,res){
        console.log('I am hereprinting req query to complete 1: ',req.headers);
        Auth.getToken(req,res,function(result){
            if(!result.loggedIn){
                req.session.success = false;
                req.session.errors = result;
                res.render('loginNew',{success: req.session.success, errors:req.session.errors});
            }
            else{
                req.session.success = true;
                req.session.token = result.token;
                res.redirect('/dashboard');
            }
        });
    })
}
