//validation
'use strict';

module.exports = function(){
    return {

        //validaot khi tạo tài khoản
        SignUpValidator: (req, res, next) => {
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('username', 'Username must not be less than 3').isLength({min : 3});
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is invalid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password', 'Password must not be less than 5').isLength({min : 5});
        //lấy kết quả validattor trả về
            req.getValidationResult()
                .then((result) => {  
                    //gán lỗi vào mảng messages
                    const errors = result.array();
                    const messages = [];
                    errors.forEach(error => {
                        messages.push(error.msg);
                    });

                    console.log(errors);
                    //gửi lỗi lên client
                    req.flash('error', messages);
                    res.redirect('/signup');
            })
             
            .catch((error) =>{
                return next();
            })
        }
    }
}