var Reg  = require('./../controllers/nurego/nurego-registration.js'),
    Org  = require('./../controllers/nurego/nurego-organization.js'),
    Acct  = require('./../controllers/nurego/nurego-account.js'),
    Auth = require('./../controllers/nurego/nurego-authentication.js');


module.exports = function(app){

    //Registration Routes
    app.get('/registration', function(req,res){
        console.log('Debug: Hit the route GET /registration ...');
        console.log('printing req.query.registrationId:\n ',req.query.registrationId);
        req.session.reg = {};
        req.session.reg.id= req.query.registrationId;
	    res.render('registration_complete');
    })

    app.post('/registration/complete', function(req,res){
        //session properties setup
        req.session.reg.pwd = req.body.pwd1;
        req.session.org = {};
        req.session.org.name = req.body.orgName;
        req.session.acct = {};
        req.session.acct.name = req.body.acctName;

        console.log('printing reg form: \n',req.body);

        //Completing the Registration
        var params = {password: req.session.reg.pwd};
        Reg.completeRegistration(req.session.reg.id, params, function(result){
        if(!result.success){
            console.log("Printing the Error\n: ",result);
        }else{
            console.log('Result of Registration Complete\n',result);
            req.session.org.id=result.response.organization_id;

            //Updating Organization Name
            var params = {name: req.session.org.name};
            Org.updateOrganization(req.session.org.id, params, function(result){
                if(!result.success){
                    console.log("Printing the Error\n: ",result);
                }else{
                    //Retrieving Organization to get Account ID
                    Org.retrieveOrganization(req.session.org.id, function(result){
                        if(!result.success){
                            console.log("Printing the Error\n: ",result);
                        }else{
                            console.log('Result of Retrieve Organization\n',result);
                            req.session.acct.id = result.response.account_no;

                            //Updating Account Name
                            var params = {name: req.session.acct.name};
                            Acct.updateAccount(req.session.acct.id, params, function(result){
                                if(!result.success){
                                    console.log("Printing the Error\n: ",result);
                                }else{
                                    console.log('Result of Update Account\n',result);
                                    res.redirect('/dashboard');

                                }
                            });
                        }
                    });

                }
            });
        }
    })   //end of registration complete
    })
}
