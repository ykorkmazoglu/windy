var proxy    = require('express-http-proxy'),
    cors     = require('cors'),
    config   = require('../config/configuration.js');

module.exports = function(app){
    app.use('/nurego-api',cors(),proxy(config.nurego.base_url, {
        decorateRequest: function(reqOpt, req) {

                            reqOpt.headers['X-NUREGO-AUTHORIZATION'] = 'Bearer '+config.nurego.public_api_key;
                            reqOpt.headers['Content-Type'] = 'application/json';
                            reqOpt.headers['charset'] = 'utf-8';

                            return reqOpt;
                        },
        // modify the path prior to proxying the request
        forwardPath: function(req, res) {
                        return '/v1'+require('url').parse(req.url).path;
                    },
        // intercept the response before sending it back to the client
        intercept: function(rsp, data, req, res, callback) {
                        if(req.path.indexOf('offerings') != -1){
                            data=req.query.callback+'('+data.toString('utf8')+')';
                        }
                        callback(null, data,null,res);
                    }
        })
    );
}
