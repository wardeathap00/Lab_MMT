'use strict'; //kiểu bật mode nghiêm túc, node sẽ giới hạn cái code sai

//const passport = require('passport');

//export cái hàm bình thường có biến
module.exports = function(_, passport, User){

    return {  //do trong return nên phải trả về dạng chuối json
        SetRouting : function(router){
            router.get('/', this.indexPage);  //method get của express
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);
            router.post('/signup', User.SignUpValidator, this.postSignUp);  //validator trước khi load
        },

        indexPage : function(req, res){
            return res.render('index', {test: 'This is a test'});  //method render view template
        },

        getSignUp : function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'WAR', messages: errors, hasErrors: errors.length > 0}); 
        },

        homePage: function(req, res){
            return res.render('home');
        },
        //khi nhận được submit post thì passport sẽ xác nhận với data để thêm user
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true,
        }),
    }
}