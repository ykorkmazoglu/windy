var Reg  = require('./../../controllers/nurego/nurego-registration.js'),
    Org  = require('./../../controllers/nurego/nurego-organization.js'),
    Acct  = require('./../../controllers/nurego/nurego-account.js'),
    Auth = require('./../../controllers/nurego/nurego-authentication.js');


module.exports = function(app){

    //Registration Routes
    app.get('/', function(req,res){
        console.log('Debug: Hit the route GET /registration ...');
        console.log('printing req.query.registrationId:\n ',req.query.registrationId);
        req.session.reg = {};
        req.session.reg.id= req.query.registrationId;
	    res.render('registration_complete',{success: req.session.success, errors: req.session.errors});
    })

    app.post('/complete', function(req,res){
        req.session.reg.pwd = req.body.pwd1;
        req.session.org = {};
        req.session.org.name = req.body.orgName;
        req.session.acct = {};
        req.session.acct.name = req.body.acctName;

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
              res.redirect('/dashboard');})
          .catch((error) => {
            console.log("Printing the Error\n: ",error);
          })

    })   //end of registration complete
}
