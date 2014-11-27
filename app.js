// BASE SETUP
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    routes = require('./app/routes'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    errorHandler = require('errorhandler');


// =========================CONFIGURATION===========================//
// =================================================================//
app.set('port', process.env.PORT || 9001); // Set to 9001 to not interfere with Gulp 9000
app.use(serveStatic('app', {'index': false})); // Where the files and gets login.html first
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


// ROUTES FOR THE API - RUN IN THE ORDER LISTED

var router = express.Router();

// PUT ANY MIDDLEWARE HERE

router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});


// ------------- ROUTES ---------------- //
// home page

router.get('/', routes.index);
router.get('/oauth', routes.oauth);
router.get('/oauth_callback', routes.oauth_callback);
router.get('/clear', routes.clear);
router.get('/create', routes.create);
router.post('/receive', routes.receive);


// REGISTERING THE ROUTES
app.use('/', router);

// STARTING THE SERVER

console.log('Serving on port ' + app.get('port') + '. Serving more Nodes than Big Macs!');
app.listen(app.get('port')); // Not used if Gulp is activated - it is bypassed
exports = module.exports = app; // This is needed otherwise the index.js for routes will not work
