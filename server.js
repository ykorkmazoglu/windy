var express  = require( 'express' ),
    path     = require( 'path' ),
    fs       = require('fs'),
    bp       = require('body-parser'),
    config   = require('./config/configuration.js'),
    session  = require('express-session'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

//Logger Setup
require('./config/log-config.js')(app,root);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use( express.static( path.join( root, 'assets' )));

app.use(session({
  secret: config.app.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

require('./controllers')(app);
//Proxy Routes
require('./nurego_lib/nurego-proxy.js')(app);

app.listen( port, function() {
  console.log( 'Windy App running on port: ' + port);
});
