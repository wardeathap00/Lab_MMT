'use-strict';

const passport = require('passport');
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;

// chuẩn ES6
// serializeUser cho phép lưu dữ liệu người trong sesstion này
// khi người dùng sign in thì id của user sẽ được lưu trong sesstion
passport.serializeUser((user, done) => {  //các thông tin người dùng đều nằm trong biến user
    done(null, user.id);
});
// nếu id của người dùng đã cs sesstion này, thì trả về data users, nếu ko thấy thì sẽ trả về err
passport.deserializeUser((id, done) => {
    User.findById(id, (err, users) => { //findById là hàm tìm dữ liệu trong mongoose
        //console.log(err);
        done(err, User);
    })
})

//đăng nhập local
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: 'true',
}, (req, email, password, done) => {

    User.findOne({'email': email}, (err, user) => {
        if(err) {
            //console.log(err);
            return done(err);
        };

        if(user){
            return done(null, false, req.flash('error', 'User with email already exist'));
        };

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            console.log(err);
            done(null, newUser);
        });

    });

}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
       if(err){
           return done(err);
       }

       const messages = [];
       if(!user || !user.validUserPassword(password)){
            messages.push('Email is not exits or Password is not correct');
            return done(null, false, req.flash('error', messages));
       }
       return done(null, user);     
        
    });
}));
