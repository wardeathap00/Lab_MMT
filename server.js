const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');
const {Users} = require('./helpers/UsersClass'); 
const {Global} = require('./helpers/Global');

const url = 'mongodb://localhost/mmt';
const db = mongoose.connection;

const container = require('./container');



container.resolve(function(users, _, admin, home, group, privatechat, results){

	mongoose.Promise = global.Promise;
	mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      });
	
	mongoose.set('useCreateIndex', true);

	db.once('open', _ => {
        console.log('Database connected : ', url)
    });

    db.on('error', err => {
        console.error('Connection error : ', err)
    });

	const app = SetupExpress();

	function SetupExpress(){
		const app = express();
		const server = http.createServer(app);
		const io = socketIO(server);
		server.listen(3000, function(){
			console.log('Server Listening on port 3000');
		});

		ConfigureExpress(app);
		
		require('./socket/groupchat')(io, Users);
		require('./socket/friend')(io);
		require('./socket/globalroom')(io, Global, _);
		require('./socket/privatemessage')(io);

		//Setup Router
		const router = require('express-promise-router')();
		users.SetRouting(router);
		admin.SetRouting(router);
		home.SetRouting(router);
		group.SetRouting(router);
		privatechat.SetRouting(router);
		results.SetRouting(router);

		app.use(router);

	}



	function ConfigureExpress(app){

		require('./passport/passport-local');

		app.use(express.static('public'));
		app.use(cookieParser());
		app.set('view engine', 'ejs');
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));

		app.use(validator());

		app.use(session({
			secret: 'thisisasecretkey',
			resave: true,
			saveUninitialized: false,
			store: new MongoStore({mongooseConnection: mongoose.connection})
		}));

		app.use(flash());

		app.use(passport.initialize());
		app.use(passport.session());

		app.locals._ = _;

	}

});
