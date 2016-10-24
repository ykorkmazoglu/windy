var config  = require('./../configuration.js'),
    Reg  = require('./../../controllers/nurego/nurego-registration.js'),
    Org  = require('./../../controllers/nurego/nurego-organization.js'),
    Acct  = require('./../../controllers/nurego/nurego-account.js'),
    Auth = require('./../../controllers/nurego/nurego-authentication.js'),
    Customer = require('./../../controllers/nurego/nurego-customer.js'),
    Entitlement = require('./../../controllers/nurego/nurego-entitlement.js'),
    jwt = require('jwt-simple');


module.exports = function(router){


    router.get('/', function(req,res){
        if(!req.session.success){
            res.redirect('/login');
        }

        req.session.userId=jwt.decode(req.session.token.access_token, config.uaa.client_secret,'RS256').user_id;

        Customer.retrieveCustomer(req.session.userId)
            .then((data) => {
                console.log("Printing the sub id:\n",data.response.subscriptions.data[0].id);
                return Entitlement.retrieveEntitlement(data.response.subscriptions.data[0].id)})
            .then((data) => {
                console.log("Printing the entitlement:\n",{response: JSON.stringify(data.response)});
                res.render("dashboard",{response: data.response});})
            .catch((data) => {
                req.session.success = false;
                req.session.errors = data;
                res.redirect('/login',{success: req.session.success, errors:req.session.errors});
            })
        });

        }
