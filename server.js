const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');

const url = 'mongodb://localhost/labmmt';
const db = mongoose.connection;

container.resolve(function(users){

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
        server.listen(6969, function(){
            console.log("Listening on port 6969");
        });

        ConfigureExpress(app);

        //Setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    };

    //gọi những thư viện cần setup ở đây
    function ConfigureExpress(app) {

        require('./passport/passport-local');
        //set thư mực public có thể truy cập
        app.use(express.static('public'));
        //set cookie
        app.use(cookieParser());
        //set view engine
        app.set('view engine', 'ejs');
        //set body parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));

        //set middleware validator
        app.use(validator());
        //set session, secrect key, mongo connect ...
        app.use(session({
            secret: 'MMT_LAB',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        //set connecct flash
        app.use(flash());
       
        //set passport
        app.use(passport.initialize());
        app.use(passport.session());
        
    };
})