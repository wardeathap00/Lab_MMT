'use strict';

module.exports = function(){
	return {
		SignUpValidation: (req, res, next) => {
			req.checkBody('username','Nombre de usuario requerido').notEmpty();
			req.checkBody('username','Nombre de usuario debe contener al menos 5 caracteres').isLength({min: 5});
			req.checkBody('email','Email requerido').notEmpty();
			req.checkBody('email','Email no valido').isEmail();
			req.checkBody('password','Password requerida').notEmpty();
			req.checkBody('password','Password debe contener al menos 5 caracteres').isLength({min: 5});

			req.getValidationResult()
			   .then((result) => {
			   		const errors = result.array();
			   		const messages = [];
			   		errors.forEach((error) => {
			   			messages.push(error.msg);
			   		});

			   		req.flash('error', messages);
			   		res.redirect('/signup');

			   	})
			   	.catch((error) =>{
			   		return next();
			   	})


		},

		LoginValidation: (req, res, next) => {
			req.checkBody('email','Email requerido').notEmpty();
			req.checkBody('email','Email no valido').isEmail();
			req.checkBody('password','Password requerida').notEmpty();
			req.checkBody('password','Password debe contener al menos 5 caracteres').isLength({min: 5});

			req.getValidationResult()
			   .then((result) => {
			   		const errors = result.array();
			   		const messages = [];
			   		errors.forEach((error) => {
			   			messages.push(error.msg);
			   		});

			   		req.flash('error', messages);
			   		res.redirect('/');

			   	})
			   	.catch((error) =>{
			   		return next();
			   	})


		}

	}

}