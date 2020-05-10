// thư viện
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//tạo schema colection để lưu vào trong mongoDB
const userSchema = mongoose.Schema({
    username: {type: String, default: ''},
    fullname: {type: String, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},  
    fbTokens: Array,
    gooogle: {type: String, default: ''},
    googleTokens: Array,
})

//mã hóa password
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); //tạo mã hash cho password
}
//giải mã password
userSchema.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password);  //giải mã và so sánh password
}

module.exports = mongoose.model('User', userSchema);