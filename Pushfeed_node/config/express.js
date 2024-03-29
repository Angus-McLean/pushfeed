'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path'),
	proxy = require('express-http-proxy');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;


	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	if (process.env.NODE_ENV !== 'development') {
		app.use(helmet.xframe());
		app.use(helmet.xssFilter());
		app.use(helmet.nosniff());
		app.use(helmet.ienoopen());
		app.disable('x-powered-by');
	}
	
	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(function(req, res, next) {
	    console.log('normal middleware : ',req.user);
	    next();
	})

	app.use(function(req, res, next) {
	    
	    var userId;
	    if(req.user){
	    	userId = req.user._id;
	    }
	    
	    console.log('outer middelware userid : ', userId);
	    
	    var proxyOp = proxy('localhost:5001', {
				filter : function(req, res) {
					return true;
				},
				forwardPath: function(req, res) {
					return req.url;
				},
				decorateRequest: function(req) {
					console.log('inside proxy, user : ', userId);
					if(userId){
						console.log(userId);
						req.headers['AuthorizedUser'] = userId;
					} else {
						delete req.headers['AuthorizedUser'];
					}
				   return req;
				}
			});
			
		proxyOp(req, res, next);
	});


	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).send('500')
	});

	// Return Express server instance
	return app;
};