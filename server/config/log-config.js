var FileStreamRotator = require('file-stream-rotator'),
    path     = require( 'path' ),
    fs       = require('fs'),
    morgan   = require('morgan'),
    uuid     = require('node-uuid');

module.exports = function(app,root){

  var logDirectory = path.join(root, 'log')
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
  //Add ID to the logs
  morgan.token('id', function getId (req) {
    return req.id
  })
  function assignId (req, res, next) {
    req.id = uuid.v4()
    next()
  }
  // setup the logger
  app.use(morgan('[:date[clf]] :id :remote-addr - :remote-user  ":method :url HTTP/:http-version" :status :res[content-length]', {stream: accessLogStream}))
  app.use(assignId);
}
