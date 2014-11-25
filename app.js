// BASE SETUP
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    errorHandler = require('errorhandler'),
    favicon = require('serve-favicon');


// =========================CONFIGURATION===========================//
// =================================================================//
app.set('port', process.env.PORT || 9000);
app.use(serveStatic('/app')); // Where the files are
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));
app.use(cookieParser('secret'));
app.use(session({secret: 'evernote now', resave: true, saveUninitialized: true}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}
// ==========================ROUTER=================================//
// =================================================================//

// ROUTES FOR THE API - RAN IN THE ORDER LISTED
var router = express.Router();

// Put any Middleware here

// ------------- ROUTES ---------------- //
router.get('/', routes.index);
router.get('/oauth', routes.oauth);
router.get('/oauth_callback', routes.oauth_callback);
router.get('/clear', routes.clear);

// REGISTERING THE ROUTES
app.use('/', router);

// STARTING THE SERVER
app.listen(app.get('port'));
console.log('Serving on port ' + app.get('port') + '. Serving more Nodes than Big Macs!');

exports = module.exports = app;
