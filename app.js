// BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./app/routes');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var morgan = require('morgan');
var serveStatic = require('serve-static');

var port = process.env.PORT || 9000; // PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(serveStatic('/app')); // Where the files are
app.use(methodOverride());
app.use(morgan('dev'));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'evernote now',
    resave: true,
    saveUninitialized: true
    }));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


// ROUTES FOR THE API - RAN IN THE ORDER LISTED
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log('Middleware Active ... what next?');
    next();
});

// ------------- ROUTE 1 ---------------- //
router.get('/', function(req, res) {
    res.json({message: 'I am a route and I am alive!'});
});


// REGISTERING THE ROUTES
app.use('/api', router);

// STARTING THE SERVER
app.listen(port);
console.log('Port: ' + port + ' is activated');
