var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    config   = require('./server/config/configuration.js'),
    session  = require('express-session'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/views'));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.use(session({secret: config.app.sessionSecret, saveUninitialized: false, resave: false}));

require('./server/controllers/nurego/nurego-proxy.js')(app);
require('./server/config/routes-public.js')(app);
require('./server/config/routes-registration.js')(app);
// require('./server/config/routes-user.js')(app);


app.listen( port, function() {
  console.log( 'Windy App running on port: ' + port);
});
