var express  = require( 'express' ),
    path     = require( 'path' ),
    fs       = require('fs'),
    bp       = require('body-parser'),
    config   = require('./server/config/configuration.js'),
    session  = require('express-session'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

//Logger Setup
require('./server/config/log-config.js')(app,root);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.use(session({secret: config.app.sessionSecret, saveUninitialized: false, resave: false}));


//Routes
var public = express.Router();
require('./server/config/routes/public.js')(public);
app.use('/',public);

var secure = express.Router();
require('./server/config/routes/secure.js')(secure);
app.use('/home',secure);

var signup = express.Router();
require('./server/config/routes/signup.js')(signup);
app.use('/registration',signup);

//Proxy Routes
require('./server/controllers/nurego/nurego-proxy.js')(app);

app.listen( port, function() {
  console.log( 'Windy App running on port: ' + port);
});
